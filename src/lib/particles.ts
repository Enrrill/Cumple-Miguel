import { FESTIVE_PALETTE, FLOATING_EMOJIS, PARTICLE_COLORS } from "@/lib/constants";

type CanvasCtx = CanvasRenderingContext2D;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const randomItem = <T,>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

/** Chispa de fuego artificial con gravedad y fricción. */
class Particle {
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private readonly radius: number;
  private readonly color: string;
  private readonly decay: number;
  private alpha = 1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.color = randomItem(PARTICLE_COLORS);
    this.radius = randomBetween(2, 6);
    const angle = randomBetween(0, Math.PI * 2);
    const speed = randomBetween(2, 11);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.decay = randomBetween(0.015, 0.035);
  }

  get dead() {
    return this.alpha <= 0;
  }

  update() {
    this.vx *= 0.96;
    this.vy = this.vy * 0.96 + 0.14;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx: CanvasCtx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/** Fondo de confeti que cae de forma continua y suave. */
class ConfettiBit {
  private x: number;
  private y: number;
  private readonly w: number;
  private readonly h: number;
  private readonly color: string;
  private readonly speed: number;
  private readonly sway: number;
  private swayPhase: number;
  private readonly rotation: number;
  private angle = 0;

  constructor(startAnywhere: boolean) {
    this.x = randomBetween(0, window.innerWidth);
    this.y = startAnywhere ? randomBetween(0, window.innerHeight) : -20;
    this.w = randomBetween(5, 9);
    this.h = randomBetween(8, 14);
    this.color = randomItem(FESTIVE_PALETTE);
    this.speed = randomBetween(0.6, 1.7);
    this.sway = randomBetween(0.4, 1.3);
    this.swayPhase = randomBetween(0, Math.PI * 2);
    this.rotation = randomBetween(-0.03, 0.03);
  }

  get finished() {
    return this.y > window.innerHeight + 20;
  }

  update() {
    this.y += this.speed;
    this.swayPhase += 0.02;
    this.x += Math.sin(this.swayPhase) * this.sway;
    this.angle += this.rotation;
  }

  draw(ctx: CanvasCtx) {
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}

/** Emoji que flota hacia arriba girando y desvaneciéndose. */
class FloatingEmoji {
  private x: number;
  private y: number;
  private readonly text: string;
  private readonly size: number;
  private readonly vx: number;
  private readonly vy: number;
  private readonly rotation: number;
  private angle = 0;
  private readonly decay: number;
  private alpha = 1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.text = randomItem(FLOATING_EMOJIS);
    this.size = randomBetween(24, 42);
    this.vx = randomBetween(-2, 2);
    this.vy = randomBetween(-8, -3);
    this.rotation = randomBetween(-0.15, 0.15);
    this.decay = randomBetween(0.01, 0.025);
  }

  get dead() {
    return this.alpha <= 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.rotation;
    this.alpha -= this.decay;
  }

  draw(ctx: CanvasCtx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.font = `${this.size}px sans-serif`;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillText(this.text, -this.size / 2, this.size / 2);
    ctx.restore();
  }
}

/**
 * Motor de partículas autocontenido: se crea sobre un canvas existente,
 * corre a 60 FPS y se limpia con `destroy()` al desmontar el componente.
 */
export function createParticleEngine(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return {
      celebrate: () => {},
      setAmbient: () => {},
      setReducedMotion: () => {},
      destroy: () => {},
    };
  }

  const particles: Particle[] = [];
  const emojis: FloatingEmoji[] = [];
  const confetti: ConfettiBit[] = [];
  let ambientOn = false;
  let reducedMotion = false;
  let frameId = 0;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Confeti ambiente: repone las piezas que salen por abajo
    if (ambientOn && !reducedMotion) {
      const target = Math.min(70, Math.floor(window.innerWidth / 22));
      while (confetti.length < target) confetti.push(new ConfettiBit(true));
    }
    for (const c of confetti) {
      c.update();
      c.draw(ctx);
    }
    for (let i = confetti.length - 1; i >= 0; i--) {
      if (confetti[i].finished) {
        // Reaparece por arriba para una lluvia continua
        confetti[i] = new ConfettiBit(false);
      }
    }

    for (const p of particles) {
      if (!p.dead) {
        p.update();
        p.draw(ctx);
      }
    }
    for (const e of emojis) {
      if (!e.dead) {
        e.update();
        e.draw(ctx);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].dead) particles.splice(i, 1);
    }
    for (let i = emojis.length - 1; i >= 0; i--) {
      if (emojis[i].dead) emojis.splice(i, 1);
    }

    frameId = requestAnimationFrame(animate);
  };

  window.addEventListener("resize", resize);
  resize();
  frameId = requestAnimationFrame(animate);

  return {
    /** Lanza una explosión de fuegos artificiales + emojis flotantes en (x, y). */
    celebrate(x: number, y: number) {
      for (let i = 0; i < 45; i++) particles.push(new Particle(x, y));
      for (let i = 0; i < 6; i++) {
        emojis.push(new FloatingEmoji(x + randomBetween(-15, 15), y));
      }
    },
    /** Activa o desactiva la lluvia continua de confeti de fondo. */
    setAmbient(on: boolean) {
      ambientOn = on;
      if (!on) confetti.length = 0;
    },
    /** Respeta la preferencia del usuario de reducir movimiento. */
    setReducedMotion(reduced: boolean) {
      reducedMotion = reduced;
      if (reduced) confetti.length = 0;
    },
    destroy() {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      particles.length = 0;
      emojis.length = 0;
      confetti.length = 0;
    },
  };
}
