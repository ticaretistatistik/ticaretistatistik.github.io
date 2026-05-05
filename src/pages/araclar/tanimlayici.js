import {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {FiArrowLeft} from 'react-icons/fi';

import {
  parseNumbers,
  mean,
  median,
  mode,
  stdDev,
  variance,
  quantile,
  skewness,
  fmt,
} from '@site/src/lib/stats';
import styles from './styles.module.css';

const SAMPLE = '4, 8, 15, 16, 23, 42, 4, 8, 19, 23, 31, 12, 27, 18';

export default function TanimlayiciPage() {
  const [text, setText] = useState(SAMPLE);
  const xs = useMemo(() => parseNumbers(text), [text]);

  const stats = useMemo(() => {
    if (xs.length === 0) return null;
    const sorted = [...xs].sort((a, b) => a - b);
    const m = mean(xs);
    const sd = stdDev(xs);
    const modeVals = mode(xs);
    return {
      n: xs.length,
      sum: xs.reduce((a, b) => a + b, 0),
      mean: m,
      median: median(xs),
      mode: modeVals,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      range: sorted[sorted.length - 1] - sorted[0],
      variance: variance(xs),
      stdDev: sd,
      q1: quantile(xs, 0.25),
      q3: quantile(xs, 0.75),
      iqr: quantile(xs, 0.75) - quantile(xs, 0.25),
      cv: m !== 0 ? sd / Math.abs(m) : NaN,
      skew: skewness(xs),
    };
  }, [xs]);

  return (
    <Layout
      title="Tanımlayıcı İstatistik"
      description="Sayı listenizi yapıştırın; ortalama, medyan, standart sapma ve daha fazlasını anında görün.">
      <main className={styles.page}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Araçlar · Tanımlayıcı</span>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Tanımlayıcı İstatistik</span>
          </h1>
          <p className={styles.lead}>
            Sayılarınızı virgül, boşluk veya satır sonuyla ayırarak yapıştırın.
            Hesaplamalar tamamen tarayıcıda yapılır; veri sunucuya gönderilmez.
          </p>
          <Link to="/araclar" className={styles.backLink}>
            <FiArrowLeft size={16} aria-hidden="true" />
            <span>Tüm araçlar</span>
          </Link>
        </header>

        <div className={styles.toolGrid}>
          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Veri</h2>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="data">
                Sayılar
              </label>
              <textarea
                id="data"
                className={styles.textarea}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Örn. 4, 8, 15, 16, 23, 42"
              />
              <span className={styles.hint}>
                Geçerli sayı sayısı: {xs.length}
                {text.trim() && xs.length === 0 && ' — geçerli sayı bulunamadı'}
              </span>
            </div>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Sonuçlar</h2>
            {stats ? (
              <div className={styles.results}>
                <Stat label="n" value={stats.n} />
                <Stat label="Toplam" value={fmt(stats.sum)} />
                <Stat label="Ortalama" value={fmt(stats.mean)} />
                <Stat label="Medyan" value={fmt(stats.median)} />
                <Stat
                  label="Mod"
                  value={
                    stats.mode.length === 0
                      ? '—'
                      : stats.mode.map((v) => fmt(v)).join(', ')
                  }
                />
                <Stat label="Min" value={fmt(stats.min)} />
                <Stat label="Maks" value={fmt(stats.max)} />
                <Stat label="Aralık" value={fmt(stats.range)} />
                <Stat label="Varyans (s²)" value={fmt(stats.variance)} />
                <Stat label="Std. Sapma (s)" value={fmt(stats.stdDev)} />
                <Stat label="Q1" value={fmt(stats.q1)} />
                <Stat label="Q3" value={fmt(stats.q3)} />
                <Stat label="IQR" value={fmt(stats.iqr)} />
                <Stat label="VK (s/|x̄|)" value={fmt(stats.cv)} />
                <Stat label="Çarpıklık" value={fmt(stats.skew)} />
              </div>
            ) : (
              <p className={styles.hint}>Sonuçları görmek için sayı girin.</p>
            )}
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
