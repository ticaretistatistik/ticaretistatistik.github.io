import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {FiBarChart2, FiActivity, FiCheckSquare, FiArrowRight} from 'react-icons/fi';

import styles from './styles.module.css';

const tools = [
  {
    to: '/araclar/tanimlayici',
    title: 'Tanımlayıcı İstatistik',
    desc: 'Sayı listenizi yapıştırın; ortalama, medyan, standart sapma, çeyreklikler ve çarpıklığı anında görün.',
    Icon: FiBarChart2,
  },
  {
    to: '/araclar/normal-dagilim',
    title: 'Normal Dağılım',
    desc: 'μ ve σ değerleriyle çan eğrisini gözden geçirin; P(X<x), P(X>x) ve P(a<X<b) olasılıklarını hesaplayın.',
    Icon: FiActivity,
  },
  {
    to: '/araclar/z-test',
    title: 'Z-Testi (Tek Örneklem)',
    desc: 'Örneklem ortalamasını bilinen bir popülasyon ortalamasıyla karşılaştırın; z istatistiği, p-değeri ve karar.',
    Icon: FiCheckSquare,
  },
];

export default function AraclarIndex() {
  return (
    <Layout
      title="Araçlar"
      description="Tarayıcıda çalışan interaktif istatistik araçları: tanımlayıcı istatistik, normal dağılım, z-testi.">
      <main className={styles.page}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Yaparak öğren</span>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Araçlar</span>
          </h1>
          <p className={styles.lead}>
            Tarayıcıda anında çalışan küçük istatistik hesaplayıcıları. Veri
            yapıştırın, parametreleri değiştirin, sonucu canlı görün — kurulum
            ya da hesap gerekmez.
          </p>
        </header>

        <ul className={styles.toolList}>
          {tools.map(({to, title, desc, Icon}) => (
            <li key={to}>
              <Link to={to} className={styles.toolCard}>
                <span className={styles.toolCardIcon} aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h2 className={styles.toolCardTitle}>{title}</h2>
                <p className={styles.toolCardDesc}>{desc}</p>
                <span className={styles.toolCardArrow}>
                  Aracı aç <FiArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
