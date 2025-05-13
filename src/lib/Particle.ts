import { randomNumBetween } from "./utils";

class Particle {
  private rFriction: number;
  private rAlpha: number;
  private r: number;

  private angleFriction: number;
  private angleAlpha: number;
  private angle: number;

  public opacity: number;
  private x: number = 0;
  private y: number = 0;

  private centerX: number;
  private centerY: number;

  constructor(centerX: number, centerY: number) {
    this.centerX = centerX;
    this.centerY = centerY;

    this.rFriction = randomNumBetween(0.95, 1.01);
    this.rAlpha = randomNumBetween(0, 5);
    this.r =160;

    this.angleFriction = randomNumBetween(0.97, 0.99);
    this.angleAlpha = randomNumBetween(1, 2);
    this.angle = randomNumBetween(0, 360);

    this.opacity = randomNumBetween(0.2, 1);
  }

  update(): void {
    this.rAlpha *= this.rFriction;
    this.r += this.rAlpha;

    this.angleAlpha *= this.angleFriction;
    this.angle += this.angleAlpha;

    this.x = this.centerX + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y = this.centerY + this.r * Math.sin((Math.PI / 180) * this.angle);

    this.opacity -= 0.002;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(98, 116, 142, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}

export default Particle;
