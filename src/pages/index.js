import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import IstatistikNedir from '../components/HomepageFeatures/IstatistikNedir';
import DersIcerikleri from '../components/HomepageFeatures/DersIcerikleri';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ReactPlayer from 'react-player';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './index.module.css';

export default function IndexPage() {
  const { siteConfig } = useDocusaurusContext();

  const videos = [
    {
      "title": "Prof. Dr. Özlem Deniz Başar İstatistik Bölümünü Anlatıyor",
      "url": "https://www.youtube.com/watch?v=njJBBiyFLxQ"
    },
    {
      "title": "İstatistik Bölüm Tanıtım Programı",
      "url": "https://www.youtube.com/watch?v=zLkbLQyRO_E"
    },
    {
      "title": "İstatistik Bölümü Neden Tercih Edilmeli?",
      "url": "https://www.youtube.com/watch?v=-FyO2wMOK8s"
    },
    {
      "title": "İstatistik Bölümünden Mezun Olunca İş İmkanları Nelerdir?",
      "url": "https://www.youtube.com/watch?v=7Kucx4fkwKs"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState(false);
  const swiperRef = useRef(null);

  return (
    <Layout
      title={`Ana Sayfa`}
      description="İstanbul Ticaret Üniversitesi İstatistik bölümü öğrencileri için hazırlanan yardımcı döküman sitesi.">
      <header className={styles.heroBanner}>
        <div className={styles.container}>
          <h1 className={styles.title}>{siteConfig.title}</h1>
          <p className={styles.subtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <a
              className="button button--secondary button--lg"
              href="#">
              Topluluğumuzu Keşfedin
            </a>
          </div>
        </div>
        <Swiper
          navigation={true}
          pagination={true}
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          className={styles.swiper}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.activeIndex);
            setVideoStatus(false);
            return;
          }}
          ref={swiperRef}>
          {videos.map((video, i) => {
            return (
              <SwiperSlide className={styles.swiper_slide} key={i}>
                <ReactPlayer
                  url={video.url}
                  pip={true}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={(currentIndex == i) && videoStatus}
                  onPlay={() => setVideoStatus(true)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </header>
      <main>
        <IstatistikNedir />
        <DersIcerikleri />
      </main>
    </Layout>
  );
}