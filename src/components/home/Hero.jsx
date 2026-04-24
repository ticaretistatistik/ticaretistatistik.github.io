import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './Hero.module.css';

export default function Hero() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          İstanbul Ticaret Üniversitesi · İstatistik Bölümü
        </p>
        <h1 className={styles.title}>
          Verinin dili ile geleceği
          <br />
          <span className={styles.accent}>birlikte okuyoruz.</span>
        </h1>
        <p className={styles.subtitle}>
          {siteConfig.tagline} Açık kaynak ders notlarımız, topluluk etkinliklerimiz ve
          podcast serimizle istatistiği günlük hayata bağlıyoruz.
        </p>
        <div className={styles.actions}>
          <Link to="/blog" className="button button--primary button--lg">
            Topluluğumuzu keşfedin
          </Link>
          <Link
            to="/docs/"
            className={`button button--ghost button--lg ${styles.ghost}`}>
            Ders notlarına göz at
            <span aria-hidden="true" className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
