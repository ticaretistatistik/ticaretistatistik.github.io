import {useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import {FiPlayCircle} from 'react-icons/fi';

import styles from './VideoSection.module.css';

const videos = [
  {
    title: 'Prof. Dr. Özlem Deniz Başar İstatistik Bölümünü Anlatıyor',
    label: 'Bölüm Tanıtımı',
    url: 'https://www.youtube.com/watch?v=njJBBiyFLxQ',
  },
  {
    title: 'İstatistik Bölüm Tanıtım Programı',
    label: 'Tanıtım',
    url: 'https://www.youtube.com/watch?v=zLkbLQyRO_E',
  },
  {
    title: 'İstatistik Bölümü Neden Tercih Edilmeli?',
    label: 'Söyleşi',
    url: 'https://www.youtube.com/watch?v=-FyO2wMOK8s',
  },
  {
    title: 'İstatistik Bölümünden Mezun Olunca İş İmkanları Nelerdir?',
    label: 'Kariyer',
    url: 'https://www.youtube.com/watch?v=7Kucx4fkwKs',
  },
];

function youtubeId(url) {
  const m = url.match(/[?&]v=([^&]+)/);
  return m ? m[1] : '';
}

function thumbFor(url) {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
}

export default function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const current = videos[currentIndex];

  const handleSelect = (i) => {
    if (i === currentIndex) return;
    setCurrentIndex(i);
    setMounted(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Bölümü tanıyın</p>
          <h2 className={styles.title}>Akademisyenlerimizden ve öğrencilerimizden</h2>
          <p className={styles.lead}>
            Bölüm başkanımızın tanıtımından mezunlarımızın kariyer hikâyelerine —
            istatistiği neden ve nasıl çalıştığımızı anlatan kısa videolar.
          </p>
        </header>

        <div ref={heroRef} className={styles.heroCard}>
          <div className={styles.heroPlayer}>
            {mounted ? (
              <ReactPlayer
                key={current.url}
                url={current.url}
                width="100%"
                height="100%"
                controls
                playing
                config={{
                  youtube: {playerVars: {modestbranding: 1, rel: 0}},
                }}
              />
            ) : (
              <ReactPlayer
                key={`light-${current.url}`}
                url={current.url}
                light={thumbFor(current.url)}
                width="100%"
                height="100%"
                controls
                playIcon={
                  <span className={styles.playIcon} aria-hidden="true">
                    <FiPlayCircle size={72} />
                  </span>
                }
                onClickPreview={() => setMounted(true)}
                config={{
                  youtube: {playerVars: {modestbranding: 1, rel: 0}},
                }}
              />
            )}
          </div>
          <div className={styles.heroCaption}>
            <span className={styles.heroLabel}>{current.label}</span>
            <h3 className={styles.heroTitle}>{current.title}</h3>
          </div>
        </div>

        <ul className={styles.thumbStrip} role="list">
          {videos.map((video, i) => {
            const active = i === currentIndex;
            return (
              <li key={video.url}>
                <button
                  type="button"
                  className={`${styles.thumb} ${active ? styles.thumbActive : ''}`}
                  onClick={() => handleSelect(i)}
                  aria-pressed={active}>
                  <span className={styles.thumbMedia}>
                    <img
                      src={thumbFor(video.url)}
                      alt={video.title}
                      className={styles.thumbImg}
                      loading="lazy"
                    />
                    <span className={styles.thumbOverlay} aria-hidden="true">
                      <FiPlayCircle size={28} />
                    </span>
                    {active && <span className={styles.nowBadge}>Şimdi</span>}
                  </span>
                  <span className={styles.thumbBody}>
                    <span className={styles.thumbLabel}>{video.label}</span>
                    <span className={styles.thumbTitle}>{video.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
