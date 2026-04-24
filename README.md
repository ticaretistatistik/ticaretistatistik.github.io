# Ticaret İstatistik

İstanbul Ticaret Üniversitesi İstatistik Bölümü öğrencileri için hazırlanan açık kaynak yardımcı doküman sitesi. Ders notları, topluluk etkinlikleri, podcast bölümleri ve blog yazıları tek bir yerden ulaşılabilecek şekilde derlenmiştir.

**Üretim adresi:** [ticaretistatistik.com](https://ticaretistatistik.com)

## İçindekiler

1. [Proje hakkında](#proje-hakkında)
2. [Teknoloji yığını](#teknoloji-yığını)
3. [Gereksinimler](#gereksinimler)
4. [Kurulum](#kurulum)
5. [Geliştirme](#geliştirme)
6. [Proje yapısı](#proje-yapısı)
7. [İçerik ekleme](#i̇çerik-ekleme)
8. [Tasarım sistemi](#tasarım-sistemi)
9. [Katkıda bulunanlar](#katkıda-bulunanlar)
10. [Katkıda bulunma rehberi](#katkıda-bulunma-rehberi)
11. [Lisans](#lisans)

## Proje hakkında

Site; ders dokümantasyonu, blog yazıları, podcast arşivi, topluluk etkinlikleri ve **Not Hesaplayıcı** ([hesapla.ticaretistatistik.com](https://hesapla.ticaretistatistik.com/)) gibi yardımcı araçlara tek bir editoryal çatı altından erişim sağlar. Tüm içerikler Markdown / MDX ile yazılmıştır ve topluluk üyelerinin katkısına açıktır.

## Teknoloji yığını

- **Docusaurus 3.10** (`classic` preset) — içerik yönetimi, docs + blog rotaları
- **React 18** — sayfa bileşenleri
- **Inter + Fraunces + JetBrains Mono** — editoryal tipografi (Google Fonts üzerinden)
- **KaTeX (remark-math + rehype-katex)** — matematiksel gösterim
- **Swiper + react-player** — video carouselleri
- **react-icons** — feature kartları ve CTA ikonları

## Gereksinimler

- [Git](https://git-scm.com/downloads)
- [Node.js ≥ 20](https://nodejs.org/en/download/) (`node -v` ile kontrol edebilirsin)

## Kurulum

```bash
git clone git@github.com:ticaretistatistik/ticaretistatistik.com.git
cd ticaretistatistik.com
npm install
```

## Geliştirme

```bash
npm start        # development sunucu: http://localhost:3000
npm run build    # production çıktısı üretir (build/ klasörü)
npm run serve    # build çıktısını yerelde sunar
npm run clear    # Docusaurus önbelleğini temizler
```

## Proje yapısı

```
.
├── blog/                   # Blog yazıları (tarih-prefix klasörleri)
│   └── authors.yml         # Yazar meta bilgileri
├── docs/                   # Ders dokümanları (sidebar.js ile yapılandırılır)
├── src/
│   ├── components/
│   │   ├── home/           # Anasayfa bölümleri (Hero, Stats, vb.)
│   │   └── HomepageFeatures/
│   ├── css/
│   │   └── custom.css      # Design token sistemi
│   ├── pages/              # Özel sayfalar (index, 404, topluluk/*)
│   ├── theme/              # Docusaurus swizzle'ları
│   └── utils/
│       └── generatePreview.js   # Blog paylaşım görseli üretici
├── static/                 # Public asset'ler (img/, docs/)
├── docusaurus.config.js    # Ana yapılandırma
└── sidebars.js             # Docs navigation
```

## İçerik ekleme

### Yeni blog yazısı

```
blog/YYYY-MM-DD-slug/
├── index.md                # Frontmatter + içerik
└── ...                     # İlgili görseller
```

Frontmatter şablonu:

```yaml
---
slug: yazi-slug
title: Yazı Başlığı
authors: [kullanici-id]    # blog/authors.yml içinden
tags: [etiket1, etiket2]
---
```

Uzun yazılarda anasayfa özetini `<!-- truncate -->` ile sınırlandır.

### Yeni yazar ekleme

`blog/authors.yml` içine ekle:

```yaml
kullaniciid:
  name: Ad Soyad
  title: Ünvan
  url: https://github.com/kullanici
  image_url: https://github.com/kullanici.png
```

### Yeni doküman ekleme

`docs/<konu>/...` altına Markdown dosyası oluştur ve gerekirse `sidebars.js` içinde grupla.

## Tasarım sistemi

Tüm renk, tipografi, aralık ve gölge tokenları `src/css/custom.css` dosyasındaki `:root` ve `[data-theme='dark']` bloklarında tanımlıdır. Özet:

- **Birincil renk**: `--brand-yellow` (#f5cf06) — vurgu olarak kullanılır, ana yüzey rengi değil
- **Ink**: `--brand-ink` — başlıklar ve ana metin
- **Yüzeyler**: warm cream (`--brand-surface`) + raised (`--brand-surface-raised`)
- **Tipografi**: Inter (gövde) + Fraunces (başlık, italic display) + JetBrains Mono (kod)
- **Spacing**: 4px tabanlı `--space-1` ... `--space-24`
- **Radii**: `--radius-sm/md/lg/pill`
- **Motion**: `--ease-out` + `--dur-fast/base/slow`

Yeni bileşen yazarken bu tokenları kullan — sabit değer (hardcoded hex, px) yazma.

## Katkıda bulunanlar

<a href="https://github.com/ticaretistatistik/ticaretistatistik.com/graphs/contributors">
  <img alt="Katkıda bulunanların profil fotoğrafları" src="https://contrib.rocks/image?repo=ticaretistatistik/ticaretistatistik.com" />
</a>

## Katkıda bulunma rehberi

Yazı yazmak veya kod katkısında bulunmak için [CONTRIBUTING.md](./CONTRIBUTING.md) dosyasını inceleyebilirsin. PR'lar, issue'lar ve tartışmalar her zaman açıktır.

## Lisans

Bu proje `GPL-3.0` lisansı ile lisanslanmıştır. Detaylar için [LICENSE](./LICENSE) dosyasına bakınız.

This project is licensed under the `GPL-3.0` License. See the [LICENSE](./LICENSE) file for details.
