import Layout from '@theme/Layout';
import {
  FiEdit3,
  FiCode,
  FiFileText,
  FiExternalLink,
  FiHelpCircle,
  FiArrowRight,
} from 'react-icons/fi';

import styles from './katkida-bulunma.module.css';

const sections = [
  {
    id: 'blog-yazarligi',
    label: 'Blog Yazarlığı',
    desc: 'Teknik bilgi gerekmez — yazınızı gönderin, biz yayına hazırlayalım.',
    Icon: FiEdit3,
  },
  {
    id: 'kod-katkisi',
    label: 'Kod Katkısı',
    desc: 'Standart GitHub iş akışıyla siteyi geliştirmeye katkı sağlayın.',
    Icon: FiCode,
  },
];

export default function ContributingPage() {
  return (
    <Layout
      title="Katkıda Bulunma"
      description="Ticaret İstatistik web sitesine blog yazısı veya kod ile nasıl katkıda bulunabileceğinizin rehberi.">
      <main className={styles.page}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Topluluğa katıl</span>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Katkıda Bulunma</span>
          </h1>
          <p className={styles.lead}>
            Ticaret İstatistik açık bir topluluk projesidir. İster bir blog
            yazısı kaleme alın, ister kod katkısı sağlayın — bu rehber size
            adım adım eşlik eder.
          </p>
        </header>

        <ul className={styles.tocGrid}>
          {sections.map(({id, label, desc, Icon}) => (
            <li key={id}>
              <a href={`#${id}`} className={styles.tocCard}>
                <span className={styles.tocIcon} aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h2 className={styles.tocTitle}>{label}</h2>
                <p className={styles.tocDesc}>{desc}</p>
                <span className={styles.tocArrow}>
                  Bölüme git <FiArrowRight size={14} aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* --- Blog Yazarlığı --- */}
        <section id="blog-yazarligi" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Bölüm 01</span>
            <h2 className={styles.sectionTitle}>Blog Yazarlığı</h2>
            <p className={styles.sectionLead}>
              Programlama veya teknik bilgi gerektirmez. Yazınızı iki farklı
              yöntemle hazırlayabilirsiniz — alıştığınız bir editörle ya da
              doğrudan markdown formatında.
            </p>
          </div>

          <div className={styles.subsection}>
            <span className={styles.subKicker}>Yöntem 1</span>
            <h3 className={styles.subTitle}>
              Google Docs veya Microsoft Word ile Hazırlama
            </h3>
            <p className={styles.body}>
              Markdown ile çalışma konusunda tecrübeniz yoksa, yazınızı
              alışık olduğunuz bir editörde hazırlayabilirsiniz.
            </p>

            <ol className={styles.steps}>
              <li>
                <strong>Yazınızı yazın.</strong>
                <ul className={styles.bullets}>
                  <li>Başlık, alt başlıklar ve paragraflar açık olmalı.</li>
                  <li>Yazım kurallarına dikkat edin.</li>
                  <li>Mümkün olduğunca kısa ve öz tutun.</li>
                  <li>Sonunda kaynaklarınızı belirtin (varsa).</li>
                </ul>
              </li>
              <li>
                <strong>Form için bilgilerinizi hazırlayın.</strong>
                <div className={styles.infoGrid}>
                  <div className={styles.infoCard}>
                    <span className={styles.infoLabel}>
                      <FiFileText size={13} aria-hidden="true" /> Yazı Bilgileri
                    </span>
                    <ul className={styles.bullets}>
                      <li>Yazı başlığı</li>
                      <li>İçerik etiketleri</li>
                      <li>Yazı dosyası (Docs veya Word)</li>
                    </ul>
                  </div>
                  <div className={styles.infoCard}>
                    <span className={styles.infoLabel}>
                      <FiEdit3 size={13} aria-hidden="true" /> Yazar Bilgileri
                    </span>
                    <ul className={styles.bullets}>
                      <li>Ad ve soyad</li>
                      <li>Unvan veya rol</li>
                      <li>Kullanıcı adı (küçük harfle)</li>
                      <li>Kare profil fotoğrafı (1:1)</li>
                      <li>Web/GitHub/LinkedIn URL'si</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <strong>Başvuru formunu doldurun.</strong>
                <p className={styles.body}>
                  Yazınızı ve bilgilerinizi aşağıdaki form üzerinden gönderin.
                </p>
                <a
                  className={styles.primaryBtn}
                  href="https://forms.gle/nQXvgBrkjBLUQjrA7"
                  target="_blank"
                  rel="noopener noreferrer">
                  Blog Yazısı Başvuru Formu
                  <FiExternalLink size={14} aria-hidden="true" />
                </a>
              </li>
            </ol>

            <div className={styles.callout}>
              Yazınız markdown formatına çevrilip blog bölümüne eklenir. Bu
              süreç birkaç gün alabilir — sabrınız için teşekkürler.
            </div>
          </div>

          <div className={styles.subsection}>
            <span className={styles.subKicker}>Yöntem 2</span>
            <h3 className={styles.subTitle}>
              Markdown Formatında Hazırlama
            </h3>
            <p className={styles.body}>
              Markdown ile çalışmayı tercih ediyorsanız, yazınızı doğrudan
              repoya ekleyebilirsiniz.
            </p>

            <ol className={styles.steps}>
              <li>
                <strong>Yazınızı markdown formatında hazırlayın.</strong>{' '}
                Markdown hakkında bilgi için{' '}
                <a
                  href="https://www.markdownguide.org/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Markdown Guide
                </a>{' '}
                sayfasını ziyaret edebilirsiniz.
              </li>
              <li>
                <code className={styles.inlineCode}>blog</code> klasörü altında
                yeni bir klasör oluşturun (format:{' '}
                <code className={styles.inlineCode}>
                  YYYY-MM-DD-yazinizin-basligi
                </code>
                ).
              </li>
              <li>
                Klasörün içine{' '}
                <code className={styles.inlineCode}>index.md</code> dosyasını
                ekleyin.
              </li>
              <li>
                Yazınızın başına aşağıdaki metadatayı yerleştirin:
                <pre className={styles.codeBlock}>
                  <code>{`---
slug: yazinizin-url-adresi
title: Yazınızın Başlığı
authors: [kullanici-adiniz]
tags: [etiket1, etiket2]
---`}</code>
                </pre>
              </li>
              <li>
                <code className={styles.inlineCode}>blog/authors.yml</code>{' '}
                dosyasına yazar bilgilerinizi ekleyin:
                <pre className={styles.codeBlock}>
                  <code>{`kullanici-adiniz:
  name: İsim Soyisim
  title: Unvan / Rol
  url: https://github.com/github-kullanici-adiniz
  image_url: /img/authors/kullanici-adiniz.jpg`}</code>
                </pre>
              </li>
            </ol>
          </div>
        </section>

        {/* --- Kod Katkısı --- */}
        <section id="kod-katkisi" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Bölüm 02</span>
            <h2 className={styles.sectionTitle}>Kod Katkısı</h2>
            <p className={styles.sectionLead}>
              Web sitesinin koduna katkıda bulunmak için standart GitHub iş
              akışını kullanıyoruz. Aşağıdaki adımlar tipik bir katkı sürecini
              özetler.
            </p>
          </div>

          <div className={styles.subsection}>
            <span className={styles.subKicker}>Süreç</span>
            <h3 className={styles.subTitle}>Katkı Akışı</h3>
            <ol className={styles.steps}>
              <li>
                Önce{' '}
                <a
                  href="https://github.com/ticaretistatistik/ticaretistatistik.com/issues"
                  target="_blank"
                  rel="noopener noreferrer">
                  issues
                </a>{' '}
                sayfasını kontrol edin.
              </li>
              <li>
                Yapmak istediğiniz değişiklik için yeni bir issue açın.
                <ul className={styles.bullets}>
                  <li>Değişikliğin amacını açıklayın.</li>
                  <li>Nasıl uygulayacağınızı kısaca anlatın.</li>
                </ul>
              </li>
              <li>Issue üzerinde geri bildirim alın.</li>
              <li>Repository'yi forklayın.</li>
              <li>Değişikliklerinizi yapın.</li>
              <li>
                Pull Request açın.
                <ul className={styles.bullets}>
                  <li>
                    İlgili issue'yu referans gösterin (
                    <code className={styles.inlineCode}>#issue-number</code>).
                  </li>
                  <li>Değişikliklerinizi detaylıca açıklayın.</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.subsection}>
            <span className={styles.subKicker}>Kurulum</span>
            <h3 className={styles.subTitle}>Geliştirme Ortamı</h3>
            <p className={styles.body}>
              Lokal geliştirme ortamını kurmak için aşağıdaki adımları takip
              edin.
            </p>

            <ol className={styles.steps}>
              <li>
                Repository'yi klonlayın:
                <pre className={styles.codeBlock}>
                  <code>{`git clone git@github.com:ticaretistatistik/ticaretistatistik.com.git`}</code>
                </pre>
              </li>
              <li>
                Bağımlılıkları yükleyin:
                <pre className={styles.codeBlock}>
                  <code>{`cd ticaretistatistik.com
npm install`}</code>
                </pre>
              </li>
              <li>
                Geliştirme sunucusunu başlatın:
                <pre className={styles.codeBlock}>
                  <code>npm start</code>
                </pre>
              </li>
            </ol>
          </div>
        </section>

        {/* --- Yardım --- */}
        <section className={styles.helpBlock}>
          <span className={styles.helpIcon} aria-hidden="true">
            <FiHelpCircle size={22} />
          </span>
          <div>
            <h2 className={styles.helpTitle}>Yardım ve İletişim</h2>
            <p className={styles.helpText}>
              Aklınızda bir soru mu var? Ya da takıldığınız bir nokta mı
              oldu?{' '}
              <a
                href="https://github.com/ticaretistatistik/ticaretistatistik.com/issues"
                target="_blank"
                rel="noopener noreferrer">
                GitHub issues
              </a>{' '}
              sayfasında yeni bir konu açabilir, topluluğa
              ulaşabilirsiniz.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
