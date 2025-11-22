import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { InteractiveVideoComponent } from '../interactive-video/interactive-video.component';
@Component({
  selector: 'app-test',
  imports: [InteractiveVideoComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit, AfterViewInit {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private geometricShapes: GeometricShape[] = [];
  private animationId!: number;
  
  // Configuration
  private readonly particleCount = 180;
  private readonly connectionDistance = 150;
  private readonly colors = [
    'rgba(105, 86, 235, 0.8)',
    'rgba(163, 127, 255, 0.7)',
    'rgba(90, 219, 255, 0.7)',
    'rgba(30, 144, 255, 0.6)',
    'rgba(176, 223, 229, 0.6)'
  ];
  
  constructor(private el: ElementRef) {}
  
  ngOnInit(): void {
    this.createGeometricShapes();
  }
  
  ngAfterViewInit(): void {
    this.initCanvas();
    this.initParticles();
    this.animate();
  }
  
  @HostListener('window:resize')
  onResize(): void {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }
  
  private initCanvas(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  private initParticles(): void {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        this.colors[Math.floor(Math.random() * this.colors.length)]
      ));
    }
  }
  
  private createGeometricShapes(): void {
    // Create  geometry shapes
    for (let i = 0; i < 15; i++) {
      const shapeType = Math.floor(Math.random() * 5); // 0-4 for different shapes
      const size = Math.random() * 200 + 50;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      const shape = new GeometricShape(shapeType, size, x, y);
      this.geometricShapes.push(shape);
      
      // Create DOM element for the shape
      const geometry = document.createElement('div');
      geometry.className = 'sacred-geometry';
      
      // Size and position
      geometry.style.width = `${size}px`;
      geometry.style.height = `${size}px`;
      geometry.style.left = `${x}%`;
      geometry.style.top = `${y}%`;
      
      // Random rotation and animation
      const rotation = Math.random() * 360;
      const duration = Math.random() * 60 + 40;
      geometry.style.transform = `rotate(${rotation}deg)`;
      
      // Shape specific styles
      switch(shapeType) {
        case 0: // Circle
          geometry.style.borderRadius = '50%';
          break;
        case 1: // Square
          geometry.style.borderRadius = '0';
          break;
        case 2: // Triangle
          geometry.style.width = '0';
          geometry.style.height = '0';
          geometry.style.border = 'none';
          geometry.style.borderLeft = `${size/2}px solid transparent`;
          geometry.style.borderRight = `${size/2}px solid transparent`;
          geometry.style.borderBottom = `${size}px solid rgba(255, 255, 255, 0.08)`;
          break;
        case 3: // Pentagon
          geometry.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
          break;
        case 4: // Hexagon
          geometry.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
          break;
      }
      
      // Animation
      geometry.style.animation = `floatRotate ${duration}s infinite ease-in-out ${Math.random() * 10}s`;
      
      // Color
      const hue = Math.random() * 60 + 180; // Blue to cyan range
      geometry.style.borderColor = `hsla(${hue}, 70%, 60%, 0.15)`;
      
      // Add to DOM
      this.el.nativeElement.appendChild(geometry);
    }
    
    // Create golden ratio spirals
    for (let i = 0; i < 3; i++) {
      const spiral = document.createElement('div');
      spiral.className = 'sacred-geometry';
      
      // Random positioning
      spiral.style.left = `${Math.random() * 80 + 10}%`;
      spiral.style.top = `${Math.random() * 80 + 10}%`;
      spiral.style.borderRadius = '50%';
      
      // Golden ratio animation
      const duration = Math.random() * 60 + 80;
      spiral.style.animation = `rotate ${duration}s linear infinite`;
      
      // Size
      const size = Math.random() * 300 + 200;
      spiral.style.width = `${size}px`;
      spiral.style.height = `${size}px`;
      
      // Color
      const hue = 190 + Math.random() * 60;
      spiral.style.borderColor = `hsla(${hue}, 70%, 50%, 0.15)`;
      
      this.el.nativeElement.appendChild(spiral);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes floatRotate {
        0% { transform: translate(0, 0) rotate(0deg); }
        20% { transform: translate(20px, -20px) rotate(72deg); }
        40% { transform: translate(40px, 0px) rotate(144deg); }
        60% { transform: translate(20px, 20px) rotate(216deg); }
        80% { transform: translate(-20px, 20px) rotate(288deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
      }
      
      @keyframes rotate {
        0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.8); }
        50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.2); }
        100% { transform: translate(-50%, -50%) rotate(360deg) scale(0.8); }
      }
      
      @keyframes pulse {
        0% { opacity: 0.3; transform: scale(0.8); }
        50% { opacity: 0.6; transform: scale(1.2); }
        100% { opacity: 0.3; transform: scale(0.8); }
      }
    `;
    document.head.appendChild(style);
  }
  
  private connectParticles(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.connectionDistance) {
          // Create gradient connection
          const opacity = 0.8 * (1 - distance / this.connectionDistance);
          this.ctx.strokeStyle = `rgba(220, 220, 255, ${opacity * 0.5})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  private animate(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this.canvas.width, this.canvas.height);
      this.particles[i].draw(this.ctx);
    }
    
    // Draw connections
    this.connectParticles();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Models
class Particle {
  private size: number;
  private speedX: number;
  private speedY: number;
  private pulseSpeed: number;
  private pulseDirection: number;
  private pulseSize: number;
  private maxPulseSize: number;
  private minPulseSize: number;
  
  constructor(
    public x: number,
    public y: number,
    public color: string
  ) {
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.pulseSpeed = Math.random() * 0.04 + 0.01;
    this.pulseDirection = 1;
    this.pulseSize = this.size;
    this.maxPulseSize = this.size * (Math.random() * 1.5 + 1.2);
    this.minPulseSize = this.size * 0.7;
  }
  
  update(canvasWidth: number, canvasHeight: number): void {
    // Move particles
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Bounce off edges
    if (this.x > canvasWidth || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > canvasHeight || this.y < 0) {
      this.speedY = -this.speedY;
    }
    
    // Pulse animation
    this.pulseSize += this.pulseSpeed * this.pulseDirection;
    if (this.pulseSize > this.maxPulseSize || this.pulseSize < this.minPulseSize) {
      this.pulseDirection *= -1;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class GeometricShape {
  constructor(
    public shapeType: number,
    public size: number,
    public x: number,
    public y: number
  ) {}
}