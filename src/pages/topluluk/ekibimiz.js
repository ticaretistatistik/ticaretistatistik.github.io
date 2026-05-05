import {useMemo} from 'react';
import Layout from '@theme/Layout';
import {FiMail, FiExternalLink, FiGithub} from 'react-icons/fi';

import team from '@site/src/data/team.json';
import styles from './ekibimiz.module.css';

// Birim kıdem sırası — Yönetim Kurulu'nda birim başkanlarının ve
// Birimlerimiz bölümündeki birim sırasının tek kaynağı.
const UNIT_ORDER = [
  'Veri ve Gelişim Birimi',
  'İletişim Birimi',
  'Sosyal Medya ve Tasarım Birimi',
  'Akademik Birim',
  'Etkinlik ve Organizasyon Birimi',
  'Sponsorluk Birimi',
];

function unitRank(name) {
  const i = UNIT_ORDER.indexOf(name);
  return i === -1 ? UNIT_ORDER.length : i;
}

function sortMembers(a, b) {
  const ra = a.role_rank ?? 99;
  const rb = b.role_rank ?? 99;
  if (ra !== rb) return ra - rb;
  return a.name.localeCompare(b.name, 'tr');
}

// Yönetim Kurulu kıdem sırası:
// 1) Saf board üyeleri (Başkan, Başkan Yrd.) — role_rank'e göre
// 2) Birim başkanları — birimin UNIT_ORDER sırasına göre
function sortBoard(a, b) {
  const aPure = a.group === 'board';
  const bPure = b.group === 'board';
  if (aPure !== bPure) return aPure ? -1 : 1;
  if (aPure) return (a.role_rank ?? 99) - (b.role_rank ?? 99);
  return unitRank(a.unit) - unitRank(b.unit);
}

function isGithubUrl(url) {
  return /^https?:\/\/(www\.)?github\.com\//i.test(url);
}

function MemberCard({m}) {
  return (
    <li className={styles.card}>
      {m.image_url && (
        <img
          className={styles.avatar}
          src={m.image_url}
          alt={m.name}
          loading="lazy"
        />
      )}
      <div>
        <h3 className={styles.name}>{m.name}</h3>
        {m.title && <p className={styles.role}>{m.title}</p>}
      </div>
      {m.bio && <p className={styles.bio}>{m.bio}</p>}
      {(m.email || m.url) && (
        <div className={styles.links}>
          {m.email && (
            <a className={styles.linkBtn} href={`mailto:${m.email}`}>
              <FiMail size={14} aria-hidden="true" />
              E-posta
            </a>
          )}
          {m.url && (
            <a
              className={styles.linkBtn}
              href={m.url}
              target="_blank"
              rel="noreferrer noopener">
              {isGithubUrl(m.url) ? (
                <FiGithub size={14} aria-hidden="true" />
              ) : (
                <FiExternalLink size={14} aria-hidden="true" />
              )}
              {isGithubUrl(m.url) ? 'GitHub' : 'Profil'}
            </a>
          )}
        </div>
      )}
    </li>
  );
}

function Section({title, children}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function EkibimizPage() {
  const {board, units, danisman} = useMemo(() => {
    const board = team
      .filter((m) => m.group === 'board' || m.is_board === true)
      .sort(sortBoard);
    const danisman = team
      .filter((m) => m.group === 'danisman')
      .sort(sortMembers);

    // Şu an sadece web siteyle ilgilenen birim listeleniyor.
    // Diğer birimler eklenecekse bu listeyi genişlet veya filtreyi kaldır.
    const VISIBLE_UNITS = new Set(['Veri ve Gelişim Birimi']);
    const unitMap = new Map();
    for (const m of team) {
      if (m.group !== 'birim') continue;
      const name = m.unit || 'Diğer';
      if (!VISIBLE_UNITS.has(name)) continue;
      if (!unitMap.has(name)) unitMap.set(name, []);
      unitMap.get(name).push(m);
    }
    const units = [...unitMap.entries()]
      .map(([name, members]) => ({name, members: members.sort(sortMembers)}))
      .sort((a, b) => {
        const ra = unitRank(a.name);
        const rb = unitRank(b.name);
        if (ra !== rb) return ra - rb;
        return a.name.localeCompare(b.name, 'tr');
      });

    return {board, units, danisman};
  }, []);

  return (
    <Layout
      title="Ekibimiz"
      description="Ticaret İstatistik Topluluğu yönetim kurulu, birim üyeleri ve akademik danışmanları.">
      <main className={styles.page}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Topluluk</span>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Ekibimiz</span>
          </h1>
          <p className={styles.lead}>
            Topluluğumuzun yönetim kurulu, birimleri ve akademik danışmanlarıyla
            tanışın. Bizimle çalışmak veya iletişime geçmek için kartlardaki
            bağlantıları kullanabilirsiniz.
          </p>
        </header>

        {board.length > 0 && (
          <Section title="Yönetim Kurulu">
            <ul className={styles.grid}>
              {board.map((m) => (
                <MemberCard key={m.key} m={m} />
              ))}
            </ul>
          </Section>
        )}

        {units.length > 0 && (
          <Section title="Birimlerimiz">
            {units.map((u) => (
              <div key={u.name} className={styles.unitGroup}>
                <h3 className={styles.unitTitle}>{u.name}</h3>
                <ul className={styles.grid}>
                  {u.members.map((m) => (
                    <MemberCard key={m.key} m={m} />
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {danisman.length > 0 && (
          <Section title="Akademik Danışmanlar">
            <ul className={styles.grid}>
              {danisman.map((m) => (
                <MemberCard key={m.key} m={m} />
              ))}
            </ul>
          </Section>
        )}

        {board.length === 0 && units.length === 0 && danisman.length === 0 && (
          <div className={styles.empty}>Henüz üye eklenmemiş.</div>
        )}
      </main>
    </Layout>
  );
}
