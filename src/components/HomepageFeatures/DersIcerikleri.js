import {
  FiTrendingUp,
  FiCpu,
  FiCode,
  FiBarChart2,
} from 'react-icons/fi';
import styles from './DersIcerikleri.module.css';

const topics = [
  {
    Icon: FiTrendingUp,
    title: 'Regresyon Analizi',
    description:
      'Doğrusal ve doğrusal olmayan modellerle ilişkileri nicelleştirme, tahmin etme, yorumlama.',
  },
  {
    Icon: FiCode,
    title: 'Python ile Veri Bilimi',
    description:
      'NumPy, Pandas ve scikit-learn ile veri işleme, görselleştirme ve modelleme.',
  },
  {
    Icon: FiCpu,
    title: 'Makine Öğrenmesi',
    description:
      'Denetimli/denetimsiz öğrenme, model seçimi, doğrulama ve üretim pratiği.',
  },
  {
    Icon: FiBarChart2,
    title: 'SPSS ve R Uygulamaları',
    description:
      'Akademik araştırmalarda sık kullanılan yazılımlarla uygulamalı analiz.',
  },
];

export default function DersIcerikleri() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Müfredattan</p>
          <h2 className={styles.title}>Neler öğreneceksiniz?</h2>
          <p className={styles.lead}>
            Klasik istatistik temellerinden modern veri bilimine — programın öne çıkan
            konu başlıklarından dört örnek.
          </p>
        </header>

        <div className={styles.grid}>
          {topics.map(({Icon, title, description}, i) => (
            <article key={i} className={styles.card}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon size={22} />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
