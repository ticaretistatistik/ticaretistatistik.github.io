// Saf istatistik yardımcıları — /araclar sayfaları kullanır.
// Bağımlılık yok; tarayıcıda hesaplanır.

export function parseNumbers(text) {
  if (!text) return [];
  return text
    .split(/[\s,;]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => Number(t.replace(',', '.')))
    .filter((n) => Number.isFinite(n));
}

export function mean(xs) {
  if (xs.length === 0) return NaN;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

export function median(xs) {
  if (xs.length === 0) return NaN;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export function mode(xs) {
  if (xs.length === 0) return [];
  const counts = new Map();
  for (const x of xs) counts.set(x, (counts.get(x) || 0) + 1);
  let max = 0;
  for (const c of counts.values()) if (c > max) max = c;
  if (max === 1) return [];
  return [...counts.entries()].filter(([, c]) => c === max).map(([v]) => v);
}

export function variance(xs, sample = true) {
  if (xs.length < (sample ? 2 : 1)) return NaN;
  const m = mean(xs);
  const ss = xs.reduce((acc, x) => acc + (x - m) ** 2, 0);
  return ss / (sample ? xs.length - 1 : xs.length);
}

export function stdDev(xs, sample = true) {
  return Math.sqrt(variance(xs, sample));
}

export function quantile(xs, q) {
  if (xs.length === 0) return NaN;
  const s = [...xs].sort((a, b) => a - b);
  const pos = (s.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  if (lo === hi) return s[lo];
  return s[lo] + (pos - lo) * (s[hi] - s[lo]);
}

export function skewness(xs) {
  if (xs.length < 3) return NaN;
  const n = xs.length;
  const m = mean(xs);
  const sd = stdDev(xs);
  if (sd === 0) return NaN;
  const sum = xs.reduce((acc, x) => acc + ((x - m) / sd) ** 3, 0);
  return (n / ((n - 1) * (n - 2))) * sum;
}

// Abramowitz & Stegun 7.1.26 — erf yaklaşımı (max hata ~1.5e-7).
export function erf(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function normalPdf(x, mu = 0, sigma = 1) {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

export function normalCdf(x, mu = 0, sigma = 1) {
  return 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2)));
}

export function fmt(n, digits = 4) {
  if (!Number.isFinite(n)) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 1e6 || abs < 1e-3) return n.toExponential(digits - 1);
  return Number(n.toFixed(digits)).toString();
}
