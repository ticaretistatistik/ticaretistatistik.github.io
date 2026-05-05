import {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {FiArrowLeft} from 'react-icons/fi';

import {normalPdf, normalCdf, fmt} from '@site/src/lib/stats';
import styles from './styles.module.css';

const W = 560;
const H = 280;
const PAD = {top: 16, right: 16, bottom: 32, left: 40};

export default function NormalDagilimPage() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [a, setA] = useState(-1);
  const [b, setB] = useState(1);

  const xMin = mu - 4 * sigma;
  const xMax = mu + 4 * sigma;

  const points = useMemo(() => {
    const N = 200;
    const arr = [];
    for (let i = 0; i <= N; i++) {
      const x = xMin + ((xMax - xMin) * i) / N;
      arr.push({x, y: normalPdf(x, mu, sigma)});
    }
    return arr;
  }, [mu, sigma, xMin, xMax]);

  const yMax = points[Math.floor(points.length / 2)].y;

  const xToPx = (x) =>
    PAD.left + ((x - xMin) / (xMax - xMin)) * (W - PAD.left - PAD.right);
  const yToPx = (y) =>
    H - PAD.bottom - (y / yMax) * (H - PAD.top - PAD.bottom);

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${xToPx(p.x)},${yToPx(p.y)}`)
    .join(' ');

  const shadePoints = points.filter((p) => p.x >= a && p.x <= b);
  const shadePath =
    shadePoints.length > 1
      ? `M${xToPx(shadePoints[0].x)},${yToPx(0)} ` +
        shadePoints.map((p) => `L${xToPx(p.x)},${yToPx(p.y)}`).join(' ') +
        ` L${xToPx(shadePoints[shadePoints.length - 1].x)},${yToPx(0)} Z`
      : '';

  const probLt = normalCdf(a, mu, sigma);
  const probGt = 1 - normalCdf(b, mu, sigma);
  const probBetween = normalCdf(b, mu, sigma) - normalCdf(a, mu, sigma);

  const ticks = useMemo(() => {
    const arr = [];
    for (let k = -4; k <= 4; k++) arr.push(mu + k * sigma);
    return arr;
  }, [mu, sigma]);

  return (
    <Layout
      title="Normal Dağılım"
      description="Normal dağılımın çan eğrisini gözden geçirin; belirli aralıklar için olasılık hesaplayın.">
      <main className={styles.page}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Araçlar · Normal Dağılım</span>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Normal Dağılım</span>
          </h1>
          <p className={styles.lead}>
            Ortalama (μ) ve standart sapma (σ) ile çan eğrisinin nasıl
            kaydığını ve genişlediğini görün. Aralıkları değiştirerek olasılığı
            hesaplayın.
          </p>
          <Link to="/araclar" className={styles.backLink}>
            <FiArrowLeft size={16} aria-hidden="true" />
            <span>Tüm araçlar</span>
          </Link>
        </header>

        <div className={styles.toolGrid}>
          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Parametreler</h2>

            <div className={styles.field}>
              <label className={styles.label}>Ortalama (μ): {fmt(mu)}</label>
              <div className={styles.sliderRow}>
                <input
                  type="range"
                  className={styles.slider}
                  min={-10}
                  max={10}
                  step={0.1}
                  value={mu}
                  onChange={(e) => setMu(Number(e.target.value))}
                />
                <input
                  type="number"
                  className={styles.input}
                  step={0.1}
                  value={mu}
                  onChange={(e) => setMu(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Standart Sapma (σ): {fmt(sigma)}
              </label>
              <div className={styles.sliderRow}>
                <input
                  type="range"
                  className={styles.slider}
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={sigma}
                  onChange={(e) => setSigma(Number(e.target.value))}
                />
                <input
                  type="number"
                  className={styles.input}
                  step={0.1}
                  min={0.01}
                  value={sigma}
                  onChange={(e) => setSigma(Math.max(0.01, Number(e.target.value) || 0.01))}
                />
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>Alt sınır (a)</label>
                <input
                  type="number"
                  className={styles.input}
                  step={0.1}
                  value={a}
                  onChange={(e) => setA(Number(e.target.value) || 0)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Üst sınır (b)</label>
                <input
                  type="number"
                  className={styles.input}
                  step={0.1}
                  value={b}
                  onChange={(e) => setB(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className={styles.results}>
              <Stat label="P(X < a)" value={fmt(probLt)} />
              <Stat label="P(X > b)" value={fmt(probGt)} />
              <Stat label="P(a < X < b)" value={fmt(probBetween)} />
            </div>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Çan eğrisi</h2>
            <svg
              className={styles.svgChart}
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label="Normal dağılım eğrisi">
              {/* Axis */}
              <line
                x1={PAD.left}
                y1={H - PAD.bottom}
                x2={W - PAD.right}
                y2={H - PAD.bottom}
                stroke="var(--brand-border)"
                strokeWidth="1"
              />
              {ticks.map((t, i) => {
                if (t < xMin || t > xMax) return null;
                const x = xToPx(t);
                return (
                  <g key={i}>
                    <line
                      x1={x}
                      y1={H - PAD.bottom}
                      x2={x}
                      y2={H - PAD.bottom + 4}
                      stroke="var(--brand-border)"
                    />
                    <text
                      x={x}
                      y={H - PAD.bottom + 18}
                      textAnchor="middle"
                      fontSize="11"
                      fill="var(--brand-ink-subtle)">
                      {fmt(t, 2)}
                    </text>
                  </g>
                );
              })}
              {/* Shaded area */}
              {shadePath && (
                <path
                  d={shadePath}
                  fill="var(--brand-yellow, #f5cf06)"
                  fillOpacity="0.45"
                />
              )}
              {/* Curve */}
              <path
                d={linePath}
                fill="none"
                stroke="var(--brand-ink)"
                strokeWidth="2"
              />
              {/* Mean line */}
              <line
                x1={xToPx(mu)}
                y1={PAD.top}
                x2={xToPx(mu)}
                y2={H - PAD.bottom}
                stroke="var(--brand-ink)"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.4"
              />
            </svg>
            <div className={styles.legend}>
              <span>
                <span
                  className={styles.swatch}
                  style={{background: 'var(--brand-yellow, #f5cf06)'}}
                />
                P(a &lt; X &lt; b) = {fmt(probBetween)}
              </span>
              <span>
                <span
                  className={styles.swatch}
                  style={{background: 'var(--brand-ink)'}}
                />
                Yoğunluk f(x)
              </span>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

function Stat({label, value}) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}
