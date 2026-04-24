import {useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ReactPlayer from 'react-player';
import {FiPlayCircle, FiCalendar} from 'react-icons/fi';

import styles from './kayitlar.module.css';

const recordings = [
  {
    title: 'Dijital Çağda İstatistiğin Gücü',
    meta: 'Panel · Konferans',
    url: 'https://www.youtube.com/watch?v=rLR2a843wK0',
    thumbnail: 'https://img.youtube.com/vi/rLR2a843wK0/maxresdefault.jpg',
  },
  {
    title: 'İstatistik Bölüm Tanıtım Programı',
    meta: 'Tanıtım',
    url: 'https://www.youtube.com/watch?v=zLkbLQyRO_E',
    thumbnail: 'https://img.youtube.com/vi/zLkbLQyRO_E/maxresdefault.jpg',
  },
  {
    title: '1 Bölüm 3 Bakış | İstatistik Bölümü',
    meta: 'Röportaj',
    url: 'https://www.youtube.com/watch?v=5_6__0P0m50',
    thumbnail: 'https://i.ytimg.com/vi/5_6__0P0m50/sddefault.jpg',
  },
  {
    title: 'İstatistik Topluluğu · İstatistik ve Bankacılık',
    meta: 'Söyleşi · Kariyer',
    url: 'https://www.youtube.com/watch?v=o35yIj932zk',
    thumbnail: 'https://img.youtube.com/vi/o35yIj932zk/maxresdefault.jpg',
  },
  {
    title: 'SHELL Türkiye CEO’su Emre Turanlı ile Soru-Cevap',
    meta: 'Söyleşi · Kariyer',
    url: 'https://www.youtube.com/watch?v=TxGxjlVH4xQ',
    thumbnail: 'https://img.youtube.com/vi/TxGxjlVH4xQ/maxresdefault.jpg',
  },
  {
    title: 'İstatistiklerle, Nereden Nereye? Korona Sürecine Farklı Bir Bakış',
    meta: 'Panel',
    url: 'https://www.youtube.com/watch?v=a5lk8IUUzGk',
    thumbnail: 'https://img.youtube.com/vi/a5lk8IUUzGk/maxresdefault.jpg',
  },
];

function RecordingCard({item}) {
  const [mounted, setMounted] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.player}>
        {mounted ? (
          <ReactPlayer
            url={item.url}
            controls
            width="100%"
            height="100%"
            config={{
              youtube: {playerVars: {modestbranding: 1, rel: 0}},
            }}
          />
        ) : (
          <ReactPlayer
            url={item.url}
            light={item.thumbnail}
            playIcon={
              <span className={styles.playIcon} aria-hidden="true">
                <FiPlayCircle size={56} />
              </span>
            }
            controls
            width="100%"
            height="100%"
            onClickPreview={() => setMounted(true)}
          />
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.meta}>{item.meta}</span>
        <h3 className={styles.cardTitle}>{item.title}</h3>
      </div>
    </article>
  );
}

export default function KayitlarPage() {
  const [featured, ...rest] = recordings;

  return (
    <Layout
      title="Kayıtlar"
      description="İstatistik Topluluğu etkinliklerinin video kayıtları — paneller, söyleşiler, tanıtımlar.">
      <div className={styles.page}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Topluluk · Arşiv</p>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Kayıtlar</span>
          </h1>
          <p className={styles.lead}>
            Topluluğumuzun geçmiş panellerinden, söyleşilerinden ve kariyer
            buluşmalarından video kayıtlar. Thumbnail'e tıkla, sayfada oynat.
          </p>

          <Link to="/topluluk/etkinliklerimiz" className={styles.backLink}>
            <FiCalendar size={16} aria-hidden="true" />
            <span>Takvim etkinliklerine dön</span>
          </Link>
        </header>

        <section className={styles.featuredSection}>
          <p className={styles.sectionLabel}>Öne çıkan</p>
          <div className={styles.featuredCard}>
            <div className={styles.featuredPlayer}>
              <ReactPlayer
                url={featured.url}
                light={featured.thumbnail}
                playIcon={
                  <span className={`${styles.playIcon} ${styles.playIconLg}`} aria-hidden="true">
                    <FiPlayCircle size={72} />
                  </span>
                }
                controls
                width="100%"
                height="100%"
                config={{
                  youtube: {playerVars: {modestbranding: 1, rel: 0}},
                }}
              />
            </div>
            <div className={styles.featuredBody}>
              <span className={styles.meta}>{featured.meta}</span>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <Link
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}>
                YouTube'da aç
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.gridSection}>
          <p className={styles.sectionLabel}>Arşiv</p>
          <div className={styles.grid}>
            {rest.map((item, i) => (
              <RecordingCard key={i} item={item} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
