import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

const actions = [
  {
    label: 'Ana sayfaya dön',
    description: 'Bölüm tanıtımı, ders içerikleri ve son yazılar.',
    to: '/',
    primary: true,
  },
  {
    label: 'Blog',
    description: 'Yazı arşivi ve son gönderiler.',
    to: '/blog',
  },
  {
    label: 'Hesaplayıcı',
    description: 'Final notu ve dönem AGNO hesaplayıcısı.',
    to: 'https://hesapla.ticaretistatistik.com/',
    external: true,
  },
];

export default function NotFound() {
  return (
    <Layout title="404 — Kayıp gözlem" description="Aradığın sayfa bulunamadı.">
      <main className={styles.wrap}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Hata · 404</p>
          <h1 className={styles.title}>
            Aradığın sayfa,
            <br />
            <span className={styles.accent}>bir kayıp gözlem oldu.</span>
          </h1>
          <p className={styles.lead}>
            Belki linkte ufak bir yazım hatası var, belki sayfa taşındı ya da hiç var olmadı.
            Regresyon modeli bile bazen her şeyi açıklayamaz — istersen buradan devam edebilirsin.
          </p>

          <ul className={styles.actions}>
            {actions.map((a, i) => {
              const linkProps = a.external
                ? {href: a.to, target: '_blank', rel: 'noopener noreferrer'}
                : {to: a.to};
              return (
                <li key={i}>
                  <Link
                    {...linkProps}
                    className={`${styles.action} ${a.primary ? styles.primary : ''}`}>
                    <div className={styles.actionContent}>
                      <span className={styles.actionLabel}>{a.label}</span>
                      <span className={styles.actionDesc}>{a.description}</span>
                    </div>
                    <span className={styles.arrow} aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <figure className={styles.figure} aria-hidden="true">
            <div className={styles.plot}>
              <div className={styles.axisX} />
              <div className={styles.axisY} />
              <span className={styles.dot} style={{'--x': '18%', '--y': '72%'}} />
              <span className={styles.dot} style={{'--x': '30%', '--y': '58%'}} />
              <span className={styles.dot} style={{'--x': '42%', '--y': '62%'}} />
              <span className={styles.dot} style={{'--x': '52%', '--y': '48%'}} />
              <span className={styles.dot} style={{'--x': '64%', '--y': '42%'}} />
              <span className={styles.dot} style={{'--x': '74%', '--y': '30%'}} />
              <span className={`${styles.dot} ${styles.dotLost}`} style={{'--x': '86%', '--y': '14%'}} />
              <svg className={styles.fit} viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="10" y1="80" x2="82" y2="20" />
              </svg>
            </div>
            <figcaption className={styles.caption}>
              x: linkler &nbsp;·&nbsp; y: bulunan sayfa &nbsp;·&nbsp; sarı nokta: senin aradığın
            </figcaption>
          </figure>
        </div>
      </main>
    </Layout>
  );
}
