import Link from '@docusaurus/Link';
import {FiPlayCircle, FiArrowUpRight} from 'react-icons/fi';
import styles from './Events.module.css';

const events = [
  {
    title: 'Dijital Çağda İstatistiğin Gücü',
    meta: 'Panel · Konferans',
    url: 'https://www.youtube.com/watch?v=rLR2a843wK0',
    thumbnail: 'https://img.youtube.com/vi/rLR2a843wK0/maxresdefault.jpg',
  },
  {
    title: 'İstatistik Topluluğu · İstatistik ve Bankacılık',
    meta: 'Söyleşi',
    url: 'https://www.youtube.com/watch?v=o35yIj932zk',
    thumbnail: 'https://img.youtube.com/vi/o35yIj932zk/maxresdefault.jpg',
  },
  {
    title: 'SHELL Türkiye CEO’su Emre Turanlı ile Soru-Cevap',
    meta: 'Kariyer · Söyleşi',
    url: 'https://www.youtube.com/watch?v=TxGxjlVH4xQ',
    thumbnail: 'https://img.youtube.com/vi/TxGxjlVH4xQ/maxresdefault.jpg',
  },
];

export default function Events() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Topluluk</p>
            <h2 className={styles.title}>Etkinliklerden</h2>
          </div>
          <Link to="/topluluk/etkinliklerimiz" className={styles.viewAll}>
            Tüm etkinlikleri gör
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className={styles.grid}>
          {events.map((ev, i) => (
            <Link
              key={i}
              href={ev.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}>
              <div className={styles.thumb}>
                <img src={ev.thumbnail} alt="" loading="lazy" />
                <span className={styles.play} aria-hidden="true">
                  <FiPlayCircle size={42} />
                </span>
              </div>
              <div className={styles.body}>
                <span className={styles.meta}>{ev.meta}</span>
                <h3 className={styles.cardTitle}>{ev.title}</h3>
                <span className={styles.watch}>
                  YouTube'da izle
                  <FiArrowUpRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
