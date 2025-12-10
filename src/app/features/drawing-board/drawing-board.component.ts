import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawing-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css']
})
export class DrawingBoardComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;

  colors = [
    { name: 'Red', value: '#ef4444' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Yellow', value: '#fbbf24' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Black', value: '#000000' }
  ];

  brushSizes = [
    { name: 'Small', value: 5 },
    { name: 'Medium', value: 10 },
    { name: 'Large', value: 20 },
    { name: 'XL', value: 30 }
  ];

  selectedColor = '#ef4444';
  selectedSize = 10;
  mode: 'draw' | 'erase' = 'draw';

  templates = [
      { name: 'Circle', emoji: '◯' },
  { name: 'Triangle', emoji: '△' },
  { name: 'Diamond', emoji: '◇' },
  { name: 'Rectangle', emoji: '▭' },
  { name: 'Star', emoji: '☆' },
  { name: 'Heart', emoji: '♡' },
  { name: 'Pentagon', emoji: '⬠' },
  { name: 'Hexagon', emoji: '⬡' },
   { name: 'Thin Ring', emoji: '◯' },
  { name: 'Dashed Ring', emoji: '◌' },
  { name: 'Double Ring', emoji: '◎' },
  ];

  showTemplates = false;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.setupDrawing();
  }

  private resizeCanvas(): void {
    const canvas = this.canvas.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private setupDrawing(): void {
    const canvas = this.canvas.nativeElement;

    canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    canvas.addEventListener('mousemove', (e) => this.draw(e));
    canvas.addEventListener('mouseup', () => this.stopDrawing());
    canvas.addEventListener('mouseout', () => this.stopDrawing());

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      canvas.dispatchEvent(new MouseEvent('mouseup', {}));
    });
  }

  private startDrawing(e: MouseEvent): void {
    this.isDrawing = true;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
  }

  private draw(e: MouseEvent): void {
    if (!this.isDrawing) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(x, y);
    
    if (this.mode === 'erase') {
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = this.selectedSize * 2;
    } else {
      this.ctx.strokeStyle = this.selectedColor;
      this.ctx.lineWidth = this.selectedSize;
    }
    
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();

    this.lastX = x;
    this.lastY = y;
  }

  private stopDrawing(): void {
    this.isDrawing = false;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.mode = 'draw';
  }

  selectSize(size: number): void {
    this.selectedSize = size;
  }

  toggleMode(): void {
    this.mode = this.mode === 'draw' ? 'erase' : 'draw';
  }

  clearCanvas(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  saveDrawing(): void {
    const canvas = this.canvas.nativeElement;
    const dataUrl = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = `drawing-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }

  loadTemplate(template: any): void {
    this.clearCanvas();
    this.showTemplates = false;
    
    const canvas = this.canvas.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    this.ctx.font = '400px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(template.emoji, centerX, centerY);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
