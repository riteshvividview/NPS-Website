// Generates a distorted, hand-cut-looking closed SVG path in a 0..1 unit
// square (for use with clip-path + clipPathUnits="objectBoundingBox").
// Each corner gets its own randomized radius, and the perimeter carries a
// layered wobble (slow large-amplitude wave + fast small wave + per-point
// jitter), so no two generated shapes look alike.

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pointOnRoundedRect(
  t: number,
  radii: { tl: number; tr: number; br: number; bl: number }
): [number, number] {
  const segs = [
    { type: "line" as const, from: [radii.tl, 0], to: [1 - radii.tr, 0] },
    { type: "arc" as const, center: [1 - radii.tr, radii.tr], r: radii.tr, a0: -Math.PI / 2, a1: 0 },
    { type: "line" as const, from: [1, radii.tr], to: [1, 1 - radii.br] },
    { type: "arc" as const, center: [1 - radii.br, 1 - radii.br], r: radii.br, a0: 0, a1: Math.PI / 2 },
    { type: "line" as const, from: [1 - radii.br, 1], to: [radii.bl, 1] },
    { type: "arc" as const, center: [radii.bl, 1 - radii.bl], r: radii.bl, a0: Math.PI / 2, a1: Math.PI },
    { type: "line" as const, from: [0, 1 - radii.bl], to: [0, radii.tl] },
    { type: "arc" as const, center: [radii.tl, radii.tl], r: radii.tl, a0: Math.PI, a1: 1.5 * Math.PI },
  ];
  const lens = segs.map((s) =>
    s.type === "line"
      ? Math.hypot(s.to[0] - s.from[0], s.to[1] - s.from[1])
      : s.r * (s.a1 - s.a0)
  );
  const total = lens.reduce((a, b) => a + b, 0);
  let d = t * total;
  for (let i = 0; i < segs.length; i++) {
    if (d <= lens[i] || i === segs.length - 1) {
      const s = segs[i];
      const tt = lens[i] === 0 ? 0 : d / lens[i];
      if (s.type === "line") {
        return [s.from[0] + (s.to[0] - s.from[0]) * tt, s.from[1] + (s.to[1] - s.from[1]) * tt];
      }
      const a = s.a0 + (s.a1 - s.a0) * tt;
      return [s.center[0] + s.r * Math.cos(a), s.center[1] + s.r * Math.sin(a)];
    }
    d -= lens[i];
  }
  return segs[0].from as [number, number];
}

function normalAt(
  t: number,
  radii: { tl: number; tr: number; br: number; bl: number },
  eps: number
): [number, number] {
  const p0 = pointOnRoundedRect((t - eps + 1) % 1, radii);
  const p1 = pointOnRoundedRect((t + eps) % 1, radii);
  const dx = p1[0] - p0[0];
  const dy = p1[1] - p0[1];
  const len = Math.hypot(dx, dy) || 1;
  return [dy / len, -dx / len];
}

function smoothPath(points: [number, number][]): string {
  let d = `M ${points[0].map((n) => n.toFixed(4)).join(",")}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1.map((n) => n.toFixed(4)).join(",")} ${c2.map((n) => n.toFixed(4)).join(",")} ${p2
      .map((n) => n.toFixed(4))
      .join(",")}`;
  }
  return `${d} Z`;
}

export function generateOrganicPath(seed: number): string {
  const rand = seededRandom(Math.floor(seed) || 1);
  const radii = {
    tl: 0.06 + rand() * 0.16,
    tr: 0.03 + rand() * 0.14,
    br: 0.03 + rand() * 0.16,
    bl: 0.04 + rand() * 0.12,
  };
  const phase = rand() * Math.PI * 2;
  const N = 60;
  const points: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const [x, y] = pointOnRoundedRect(t, radii);
    const [nx, ny] = normalAt(t, radii, 0.004);
    const wobble =
      0.03 * Math.sin(t * Math.PI * 2 * (2 + rand() * 2) + phase) +
      0.014 * Math.sin(t * Math.PI * 2 * (6 + rand() * 3) + phase * 1.7) +
      (rand() - 0.5) * 0.016;
    points.push([x + nx * wobble, y + ny * wobble]);
  }
  points.push(points[0]);
  return smoothPath(points);
}
