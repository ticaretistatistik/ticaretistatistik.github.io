import Link from '@docusaurus/Link';
import {FiInstagram, FiLinkedin, FiGithub, FiMail} from 'react-icons/fi';
import styles from './CommunityCTA.module.css';

const channels = [
  {
    label: 'Instagram',
    handle: '@ticaretistatistik',
    href: 'https://instagram.com/ticaretistatistik',
    Icon: FiInstagram,
  },
  {
    label: 'LinkedIn',
    handle: 'İstatistik Topluluğu',
    href: 'https://www.linkedin.com/company/i%CC%87statistik-toplulu%C4%9Futic',
    Icon: FiLinkedin,
  },
  {
    label: 'GitHub',
    handle: 'ticaretistatistik',
    href: 'https://github.com/ticaretistatistik',
    Icon: FiGithub,
  },
  {
    label: 'E-posta',
    handle: 'istatistik@ticaret.edu.tr',
    href: 'mailto:istatistik@ticaret.edu.tr',
    Icon: FiMail,
  },
];

export default function CommunityCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Topluluğa katıl</p>
          <h2 className={styles.title}>
            Veri ile ilgilenen herkesi
            <br />
            aramıza davet ediyoruz.
          </h2>
          <p className={styles.lead}>
            Etkinliklerimiz, podcast bölümlerimiz ve açık kaynak içeriklerimizden haberdar
            olmak için bizi takip edin.
          </p>
        </div>
        <ul className={styles.channels}>
          {channels.map(({label, handle, href, Icon}, i) => (
            <li key={i}>
              <Link
                href={href}
                className={styles.channel}
                target="_blank"
                rel="noopener noreferrer">
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon size={18} />
                </span>
                <span className={styles.channelText}>
                  <span className={styles.channelLabel}>{label}</span>
                  <span className={styles.channelHandle}>{handle}</span>
                </span>
                <span className={styles.channelArrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
