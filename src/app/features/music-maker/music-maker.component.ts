import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Note {
  name: string;
  frequency: number;
  emoji: string;
  color: string;
}

interface Instrument {
  name: string;
  type: OscillatorType;
  emoji: string;
}

@Component({
  selector: 'app-music-maker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-maker.component.html',
  styleUrls: ['./music-maker.component.css']
})
export class MusicMakerComponent implements OnInit, OnDestroy {
  notes: Note[] = [
    { name: 'C', frequency: 261.63, emoji: '🔴', color: '#ef4444' },
    { name: 'D', frequency: 293.66, emoji: '🟠', color: '#f97316' },
    { name: 'E', frequency: 329.63, emoji: '🟡', color: '#fbbf24' },
    { name: 'F', frequency: 349.23, emoji: '🟢', color: '#10b981' },
    { name: 'G', frequency: 392.00, emoji: '🔵', color: '#3b82f6' },
    { name: 'A', frequency: 440.00, emoji: '🟣', color: '#a855f7' },
    { name: 'B', frequency: 493.88, emoji: '🟤', color: '#92400e' },
    { name: 'C2', frequency: 523.25, emoji: '⚪', color: '#f3f4f6' }
  ];

  instruments: Instrument[] = [
    { name: 'Piano', type: 'sine', emoji: '🎹' },
    { name: 'Trumpet', type: 'sawtooth', emoji: '🎺' },
    { name: 'Flute', type: 'triangle', emoji: '🪈' },
    { name: 'Guitar', type: 'square', emoji: '🎸' }
  ];

  recordedNotes: Array<{ note: Note; time: number }> = [];
  isRecording = false;
  isPlaying = false;
  recordStartTime = 0;
  selectedInstrument: Instrument;
  activeNote: Note | null = null;
  
  audioContext!: AudioContext;

  constructor(private router: Router) {
    this.selectedInstrument = this.instruments[0];
  }

  ngOnInit(): void {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  ngOnDestroy(): void {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  playNote(note: Note, duration: number = 0.3): void {
    this.activeNote = note;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = this.selectedInstrument.type;
    oscillator.frequency.value = note.frequency;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);

    // Record note if recording
    if (this.isRecording) {
      const elapsedTime = Date.now() - this.recordStartTime;
      this.recordedNotes.push({ note, time: elapsedTime });
    }

    setTimeout(() => {
      this.activeNote = null;
    }, duration * 1000);
  }

  selectInstrument(instrument: Instrument): void {
    this.selectedInstrument = instrument;
  }

  startRecording(): void {
    this.isRecording = true;
    this.recordedNotes = [];
    this.recordStartTime = Date.now();
  }

  stopRecording(): void {
    this.isRecording = false;
  }

  async playRecording(): Promise<void> {
    if (this.recordedNotes.length === 0 || this.isPlaying) return;
    
    this.isPlaying = true;
    
    for (let i = 0; i < this.recordedNotes.length; i++) {
      const current = this.recordedNotes[i];
      const delay = i === 0 ? 0 : current.time - this.recordedNotes[i - 1].time;
      
      await this.sleep(delay);
      this.playNote(current.note);
    }
    
    this.isPlaying = false;
  }

  clearRecording(): void {
    this.recordedNotes = [];
    this.isRecording = false;
    this.isPlaying = false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async playSong(songName: string): Promise<void> {
    if (this.isPlaying) return;

    const songs: { [key: string]: Note[] } = {
      'twinkle': [
        this.notes[0], this.notes[0], this.notes[4], this.notes[4],
        this.notes[5], this.notes[5], this.notes[4]
      ],
      'happy': [
        this.notes[0], this.notes[0], this.notes[1], this.notes[0],
        this.notes[3], this.notes[2]
      ],
      'mary': [
        this.notes[2], this.notes[1], this.notes[0], this.notes[1],
        this.notes[2], this.notes[2], this.notes[2]
      ]
    };

    const melody = songs[songName];
    if (!melody) return;

    this.isPlaying = true;

    for (const note of melody) {
      this.playNote(note);
      await this.sleep(500);
    }

    this.isPlaying = false;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}