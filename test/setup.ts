/**
 * Stub de contexto 2D de canvas para jsdom.
 *
 * jsdom não implementa HTMLCanvasElement#getContext sem o pacote `canvas`,
 * e o Chart.js precisa do contexto para montar. Este stub aceita a API
 * usada pelo Chart.js sem desenhar nada — suficiente para montar o gráfico
 * no ambiente de teste.
 */

const noop = () => undefined;
const measureText = (text: string) => ({ width: Math.max(8, String(text).length * 7) } as unknown as TextMetrics);

const ctx: Record<string, unknown> = {
  measureText,
  save: noop,
  restore: noop,
  translate: noop,
  rotate: noop,
  scale: noop,
  beginPath: noop,
  moveTo: noop,
  lineTo: noop,
  arc: noop,
  rect: noop,
  closePath: noop,
  stroke: noop,
  fill: noop,
  clearRect: noop,
  fillRect: noop,
  strokeRect: noop,
  clip: noop,
  fillText: noop,
  strokeText: noop,
  drawImage: noop,
  setTransform: noop,
  transform: noop,
  resetTransform: noop,
  setLineDash: noop,
  createLinearGradient: noop,
  createRadialGradient: noop,
  createPattern: noop,
  getImageData: noop,
  putImageData: noop,
  isPointInPath: () => false,
  isPointInStroke: () => false,
};

const styled: string[] = [
  "font",
  "fillStyle",
  "strokeStyle",
  "lineCap",
  "lineWidth",
  "lineJoin",
  "miterLimit",
  "textAlign",
  "textBaseline",
  "direction",
  "imageSmoothingEnabled",
  "globalAlpha",
  "globalCompositeOperation",
  "shadowBlur",
  "shadowColor",
  "filter",
];
styled.forEach((key) => {
  let value: unknown = "";
  Object.defineProperty(ctx, key, {
    get: () => value,
    set: (v) => { value = v; },
    configurable: true,
  });
});

// ResizeObserver não existe no jsdom; o Chart.js o usa para redimensionar responsivo.
if (typeof (window as any).ResizeObserver === "undefined") {
  (window as any).ResizeObserver = class ResizeObserver {
    observe = () => undefined;
    unobserve = () => undefined;
    disconnect = () => undefined;
  };
}

const proto = HTMLCanvasElement.prototype;
const original = proto.getContext;
(proto as any).getContext = function (type: string) {
  if (type === "2d") {
    // Cada canvas precisa de um contexto cujo .canvas aponte de volta para ele
    // (exigido por Chart.js: context.canvas === canvas).
    const c = Object.assign(Object.create(ctx), { canvas: this }) as unknown as CanvasRenderingContext2D;
    return c;
  }
  return original?.call(this, type);
};
