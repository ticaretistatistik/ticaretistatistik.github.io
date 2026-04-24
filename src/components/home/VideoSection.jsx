import {useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import ReactPlayer from 'react-player';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './VideoSection.module.css';

const videos = [
  {
    title: 'Prof. Dr. Özlem Deniz Başar İstatistik Bölümünü Anlatıyor',
    url: 'https://www.youtube.com/watch?v=njJBBiyFLxQ',
  },
  {
    title: 'İstatistik Bölüm Tanıtım Programı',
    url: 'https://www.youtube.com/watch?v=zLkbLQyRO_E',
  },
  {
    title: 'İstatistik Bölümü Neden Tercih Edilmeli?',
    url: 'https://www.youtube.com/watch?v=-FyO2wMOK8s',
  },
  {
    title: 'İstatistik Bölümünden Mezun Olunca İş İmkanları Nelerdir?',
    url: 'https://www.youtube.com/watch?v=7Kucx4fkwKs',
  },
];

export default function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const swiperRef = useRef(null);

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

        <div className={styles.frame}>
          <Swiper
            navigation
            pagination={{clickable: true}}
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            ref={swiperRef}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.activeIndex);
              setPlaying(false);
            }}
            className={styles.swiper}>
            {videos.map((video, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                <ReactPlayer
                  url={video.url}
                  width="100%"
                  height="100%"
                  controls
                  pip
                  playing={currentIndex === i && playing}
                  onPlay={() => setPlaying(true)}
                />
                <p className={styles.caption}>{video.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
