import {useState, useRef} from 'react';
import ReactPlayer from 'react-player';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {FiPlayCircle, FiCalendar, FiExternalLink} from 'react-icons/fi';

import styles from './hikayeler.module.css';

const videos = [
  {
    title: 'Başak Gizem Çalışkan',
    year: '2012',
    role: 'Pazarlama Yöneticisi, Sony Electronics Türkiye',
    url: 'https://www.youtube.com/watch?v=AzWx6l8Ia28',
    thumbnail: 'https://img.youtube.com/vi/AzWx6l8Ia28/maxresdefault.jpg',
  },
  {
    title: 'Begüm Öner',
    year: '',
    role: 'Tiyatro ve Sinema Oyuncusu',
    url: 'https://www.youtube.com/watch?v=fV0slQWpyJg',
    thumbnail: 'https://img.youtube.com/vi/fV0slQWpyJg/maxresdefault.jpg',
  },
  {
    title: 'Onuralp Öztürk',
    year: '2008',
    role: 'İş Geliştirme ve Satış Direktörü, Etiya',
    url: 'https://www.youtube.com/watch?v=lYHA8wgn-zE',
    thumbnail: 'https://img.youtube.com/vi/lYHA8wgn-zE/maxresdefault.jpg',
  },
  {
    title: 'Serdar Türedi',
    year: '2006',
    role: 'PURDUE UNIVERSITY NORTHWEST, İş Analitiği Doçent Doktoru',
    url: 'https://www.youtube.com/watch?v=mMhiVwohuOM',
    thumbnail: 'https://img.youtube.com/vi/mMhiVwohuOM/maxresdefault.jpg',
  },
];

function buildMeta(v) {
  const parts = [];
  if (v.year) parts.push(`${v.year} mezunu`);
  if (v.role) parts.push(v.role);
  return parts.join(' · ');
}

function ThumbCard({video, active, onClick}) {
  const meta = buildMeta(video);
  return (
    <button
      type="button"
      className={`${styles.thumbCard} ${active ? styles.thumbCardActive : ''}`}
      onClick={onClick}
      aria-pressed={active}>
      <div className={styles.thumbMedia}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className={styles.thumbImg}
          loading="lazy"
        />
        <span className={styles.thumbPlay} aria-hidden="true">
          <FiPlayCircle size={40} />
        </span>
        {active && <span className={styles.nowBadge}>Şimdi</span>}
      </div>
      <div className={styles.thumbBody}>
        <h3 className={styles.thumbTitle}>{video.title}</h3>
        {meta && <span className={styles.thumbMeta}>{meta}</span>}
      </div>
    </button>
  );
}

export default function HikayelerPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef(null);
  const current = videos[currentIndex];
  const meta = buildMeta(current);

  const handleSelect = (i) => {
    setCurrentIndex(i);
    if (heroRef.current) {
      heroRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <Layout
      title="Hikayeler"
      description="İstanbul Ticaret Üniversitesi İstatistik bölümü mezunlarının kariyer hikayeleri ve tavsiyeleri.">
      <main className={styles.page}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Topluluk · Mezunlarımız</span>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Hikayeler</span>
          </h1>
          <p className={styles.lead}>
            İstatistik bölümü mezunlarımızın kariyer yolculukları, deneyimleri
            ve geleceğin öğrencilerine tavsiyeleri.
          </p>

          <Link to="/topluluk/etkinliklerimiz" className={styles.backLink}>
            <FiCalendar size={16} aria-hidden="true" />
            <span>Etkinliklere dön</span>
          </Link>
        </header>

        <section ref={heroRef} className={styles.heroSection}>
          <p className={styles.sectionLabel}>Şu an izleniyor</p>
          <div className={styles.heroCard}>
            <div className={styles.heroPlayer}>
              <ReactPlayer
                key={current.url}
                url={current.url}
                controls
                width="100%"
                height="100%"
                config={{
                  youtube: {playerVars: {modestbranding: 1, rel: 0}},
                }}
              />
            </div>
            <div className={styles.heroBody}>
              {meta && <span className={styles.metaBadge}>{meta}</span>}
              <h2 className={styles.heroTitle}>{current.title}</h2>
              <Link
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}>
                YouTube'da aç
                <FiExternalLink size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.gridSection}>
          <p className={styles.sectionLabel}>Tüm hikayeler</p>
          <div className={styles.grid}>
            {videos.map((video, i) => (
              <ThumbCard
                key={video.url}
                video={video}
                active={i === currentIndex}
                onClick={() => handleSelect(i)}
              />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
