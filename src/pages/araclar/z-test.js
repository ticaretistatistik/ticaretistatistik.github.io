import {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {FiArrowLeft} from 'react-icons/fi';

import {normalCdf, fmt} from '@site/src/lib/stats';
import styles from './styles.module.css';

export default function ZTestPage() {
  const [xbar, setXbar] = useState(102);
  const [mu0, setMu0] = useState(100);
  const [sigma, setSigma] = useState(15);
  const [n, setN] = useState(36);
  const [alpha, setAlpha] = useState(0.05);
  const [tail, setTail] = useState('two');

  const result = useMemo(() => {
    if (sigma <= 0 || n <= 0) return null;
    const se = sigma / Math.sqrt(n);
    const z = (xbar - mu0) / se;
    let p;
    if (tail === 'two') p = 2 * (1 - normalCdf(Math.abs(z)));
    else if (tail === 'left') p = normalCdf(z);
    else p = 1 - normalCdf(z);
    const reject = p < alpha;
    return {se, z, p, reject};
  }, [xbar, mu0, sigma, n, alpha, tail]);

  return (
    <Layout
      title="Z-Testi"
      description="Tek örneklem z-testi: örneklem ortalamasını bilinen bir popülasyon ortalamasıyla karşılaştırın.">
      <main className={styles.page}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Araçlar · Hipotez Testi</span>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Z-Testi</span>
          </h1>
          <p className={styles.lead}>
            Tek örneklem z-testi. Popülasyon standart sapması (σ) bilindiğinde,
            örneklem ortalamasının (x̄) bir referans değerinden anlamlı şekilde
            farklı olup olmadığını test eder.
          </p>
          <Link to="/araclar" className={styles.backLink}>
            <FiArrowLeft size={16} aria-hidden="true" />
            <span>Tüm araçlar</span>
          </Link>
        </header>

        <div className={styles.toolGrid}>
          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Girdiler</h2>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="xbar">
                  Örneklem ortalaması (x̄)
                </label>
                <input
                  id="xbar"
                  type="number"
                  className={styles.input}
                  step="any"
                  value={xbar}
                  onChange={(e) => setXbar(Number(e.target.value) || 0)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="mu0">
                  H₀ ortalaması (μ₀)
                </label>
                <input
                  id="mu0"
                  type="number"
                  className={styles.input}
                  step="any"
                  value={mu0}
                  onChange={(e) => setMu0(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="sigma">
                  Popülasyon σ
                </label>
                <input
                  id="sigma"
                  type="number"
                  className={styles.input}
                  step="any"
                  min="0.0001"
                  value={sigma}
                  onChange={(e) => setSigma(Math.max(0.0001, Number(e.target.value) || 0.0001))}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="n">
                  Örneklem büyüklüğü (n)
                </label>
                <input
                  id="n"
                  type="number"
                  className={styles.input}
                  step="1"
                  min="1"
                  value={n}
                  onChange={(e) => setN(Math.max(1, parseInt(e.target.value, 10) || 1))}
                />
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="alpha">
                  α (anlamlılık)
                </label>
                <select
                  id="alpha"
                  className={styles.select}
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}>
                  <option value={0.10}>0.10</option>
                  <option value={0.05}>0.05</option>
                  <option value={0.01}>0.01</option>
                  <option value={0.001}>0.001</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="tail">
                  Hipotez yönü
                </label>
                <select
                  id="tail"
                  className={styles.select}
                  value={tail}
                  onChange={(e) => setTail(e.target.value)}>
                  <option value="two">İki yönlü (μ ≠ μ₀)</option>
                  <option value="left">Sol kuyruk (μ &lt; μ₀)</option>
                  <option value="right">Sağ kuyruk (μ &gt; μ₀)</option>
                </select>
              </div>
            </div>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Sonuçlar</h2>
            {result ? (
              <>
                <div className={styles.results} style={{marginBottom: '1rem'}}>
                  <Stat label="Std. hata (SE)" value={fmt(result.se)} />
                  <Stat label="z istatistiği" value={fmt(result.z)} />
                  <Stat label="p-değeri" value={fmt(result.p, 5)} />
                  <Stat label="α" value={fmt(alpha)} />
                </div>

                <div className={styles.callout}>
                  <span className={styles.calloutDecision}>
                    {result.reject ? 'H₀ reddedilir' : 'H₀ reddedilemez'}
                  </span>
                  {result.reject
                    ? `p = ${fmt(result.p, 5)} < α = ${fmt(alpha)} olduğundan, ${
                        tail === 'two'
                          ? 'örneklem ortalamasının μ₀ değerinden anlamlı şekilde farklı'
                          : tail === 'left'
                          ? 'örneklem ortalamasının μ₀ değerinden anlamlı şekilde küçük'
                          : 'örneklem ortalamasının μ₀ değerinden anlamlı şekilde büyük'
                      } olduğuna dair yeterli kanıt vardır.`
                    : `p = ${fmt(result.p, 5)} ≥ α = ${fmt(
                        alpha
                      )} olduğundan, H₀'ı reddetmek için yeterli kanıt yoktur.`}
                </div>
              </>
            ) : (
              <p className={styles.hint}>
                Geçerli σ ve n değerleri girin.
              </p>
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
