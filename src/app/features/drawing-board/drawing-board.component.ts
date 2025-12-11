// drawing-board.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-drawing-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css']

})
export class DrawingBoardComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private startPos: Point | null = null;
  private tempCanvas: HTMLCanvasElement | null = null;
  
  tool = 'pen';
  color = '#000000';
  fillColor = '#ff0000';
  lineWidth = 2;
  isFullscreen = false;
  history: string[] = [];
  historyStep = -1;
  
  colors = ['#000000', '#ff0000', '#0000ff', '#ffff00', '#00ff00'];

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const savedData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (this.history.length === 0) {
      this.saveToHistory();
    } else if (savedData.width > 0) {
      this.ctx.putImageData(savedData, 0, 0);
    }
  }

  setTool(newTool: string) {
    this.tool = newTool;
  }

  private getMousePos(e: MouseEvent | TouchEvent): Point {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    
    if (e instanceof MouseEvent) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    } else {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
  }

  startDrawing(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    const pos = this.getMousePos(e);
    
    if (this.tool === 'fill') {
      this.floodFill(pos.x, pos.y, this.fillColor);
      return;
    }
    
    this.isDrawing = true;
    this.startPos = pos;
    
    if (this.tool === 'pen' || this.tool === 'eraser') {
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
    } else {
      const canvas = this.canvasRef.nativeElement;
      this.tempCanvas = document.createElement('canvas');
      this.tempCanvas.width = canvas.width;
      this.tempCanvas.height = canvas.height;
      this.tempCanvas.getContext('2d')!.drawImage(canvas, 0, 0);
    }
  }

  draw(e: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    e.preventDefault();
    
    const pos = this.getMousePos(e);
    
    this.ctx.strokeStyle = this.tool === 'eraser' ? 'white' : this.color;
    this.ctx.fillStyle = this.fillColor;
    this.ctx.lineWidth = this.tool === 'eraser' ? this.lineWidth * 3 : this.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    
    if (this.tool === 'pen' || this.tool === 'eraser') {
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
    } else if (this.tempCanvas && this.startPos) {
      const canvas = this.canvasRef.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(this.tempCanvas, 0, 0);
      
      this.ctx.beginPath();
      
      if (this.tool === 'line') {
        this.ctx.moveTo(this.startPos.x, this.startPos.y);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
      } else if (this.tool === 'rectangle') {
        const width = pos.x - this.startPos.x;
        const height = pos.y - this.startPos.y;
        this.ctx.fillRect(this.startPos.x, this.startPos.y, width, height);
        this.ctx.strokeRect(this.startPos.x, this.startPos.y, width, height);
      } else if (this.tool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(pos.x - this.startPos.x, 2) + 
          Math.pow(pos.y - this.startPos.y, 2)
        );
        this.ctx.arc(this.startPos.x, this.startPos.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
      } else if (this.tool === 'triangle') {
        const height = pos.y - this.startPos.y;
        const width = pos.x - this.startPos.x;
        this.ctx.moveTo(this.startPos.x + width / 2, this.startPos.y);
        this.ctx.lineTo(this.startPos.x, pos.y);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
      } else if (this.tool === 'star') {
        this.drawStar(this.startPos.x, this.startPos.y, pos.x, pos.y);
      } else if (this.tool === 'arrow') {
        this.drawArrow(this.startPos.x, this.startPos.y, pos.x, pos.y);
      } else if (this.tool === 'pentagon') {
        this.drawPentagon(this.startPos.x, this.startPos.y, pos.x, pos.y);
      }
    }
  }

  private drawStar(x1: number, y1: number, x2: number, y2: number) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = radius / 2;
    
    let rot = Math.PI / 2 * 3;
    let x = x1;
    let y = y1;
    const step = Math.PI / spikes;
    
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1 - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      x = x1 + Math.cos(rot) * outerRadius;
      y = y1 + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
      
      x = x1 + Math.cos(rot) * innerRadius;
      y = y1 + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    
    this.ctx.lineTo(x1, y1 - outerRadius);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawArrow(x1: number, y1: number, x2: number, y2: number) {
    const headlen = 20;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
    this.ctx.moveTo(x2, y2);
    this.ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
    this.ctx.stroke();
  }

  private drawPentagon(x1: number, y1: number, x2: number, y2: number) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const sides = 5;
    const angle = (Math.PI * 2) / sides;
    
    this.ctx.beginPath();
    for (let i = 0; i <= sides; i++) {
      const x = x1 + radius * Math.cos(angle * i - Math.PI / 2);
      const y = y1 + radius * Math.sin(angle * i - Math.PI / 2);
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  stopDrawing() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.saveToHistory();
    }
    this.tempCanvas = null;
  }

  private floodFill(x: number, y: number, fillColor: string) {
    const canvas = this.canvasRef.nativeElement;
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    const startPos = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
    const startR = pixels[startPos];
    const startG = pixels[startPos + 1];
    const startB = pixels[startPos + 2];
    
    const fillRGB = {
      r: parseInt(fillColor.slice(1, 3), 16),
      g: parseInt(fillColor.slice(3, 5), 16),
      b: parseInt(fillColor.slice(5, 7), 16)
    };
    
    if (startR === fillRGB.r && startG === fillRGB.g && startB === fillRGB.b) return;
    
    const stack: number[][] = [[Math.floor(x), Math.floor(y)]];
    const visited = new Set<string>();
    
    while (stack.length > 0) {
      const point = stack.pop()!;
      const [cx, cy] = point;
      const key = `${cx},${cy}`;
      
      if (visited.has(key)) continue;
      if (cx < 0 || cx >= canvas.width || cy < 0 || cy >= canvas.height) continue;
      
      const pos = (cy * canvas.width + cx) * 4;
      
      if (pixels[pos] === startR && pixels[pos + 1] === startG && pixels[pos + 2] === startB) {
        pixels[pos] = fillRGB.r;
        pixels[pos + 1] = fillRGB.g;
        pixels[pos + 2] = fillRGB.b;
        pixels[pos + 3] = 255;
        
        visited.add(key);
        stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
      }
    }
    
    this.ctx.putImageData(imageData, 0, 0);
    this.saveToHistory();
  }

  private saveToHistory() {
    const canvas = this.canvasRef.nativeElement;
    const dataUrl = canvas.toDataURL();
    const newHistory = this.history.slice(0, this.historyStep + 1);
    newHistory.push(dataUrl);
    this.history = newHistory;
    this.historyStep = newHistory.length - 1;
  }

  undo() {
    if (this.historyStep > 0) {
      this.historyStep--;
      this.loadFromHistory(this.historyStep);
    }
  }

  redo() {
    if (this.historyStep < this.history.length - 1) {
      this.historyStep++;
      this.loadFromHistory(this.historyStep);
    }
  }

  private loadFromHistory(step: number) {
    const canvas = this.canvasRef.nativeElement;
    const img = new Image();
    img.src = this.history[step];
    img.onload = () => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(img, 0, 0);
    };
  }

  clearCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.saveToHistory();
  }

  downloadCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    setTimeout(() => this.resizeCanvas(), 100);
  }
}