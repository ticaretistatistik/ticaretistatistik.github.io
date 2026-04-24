---
title: Kurulum
description: Tableau Desktop'ın öğrenci lisansıyla veya Tableau Public'in ücretsiz sürümüyle kurulumu; lisans başvurusu, indirme ve aktivasyon adımları.
sidebar_position: 2
---

# Kurulum

Tableau iki farklı yol üzerinden ücretsiz olarak edinilebilir: **Tableau for Students** programı aracılığıyla alınan bir yıllık akademik Desktop lisansı veya sınırsız süreli ama çalışmaları herkese açık kaydeden **Tableau Public** sürümü. Bu bölümde her iki yolun kurulum adımları, sistem gereksinimleri ve lisans aktivasyon süreci anlatılmıştır.

## Hangi Sürümü Seçmeli?

| Özellik | Tableau Desktop (Akademik) | Tableau Public |
| --- | --- | --- |
| Ücret | Öğrenci/eğitmen için ücretsiz (1 yıl, yenilenebilir) | Tamamen ücretsiz, süre sınırsız |
| Veri kaynakları | Excel, CSV, SQL, API, bulut servisleri — geniş bağlayıcı seti | Excel, CSV, Google Sheets ile sınırlı |
| Kaydetme | Yerel dosya (`.twb`, `.twbx`) | Yalnızca Tableau Public buluta (herkese açık) |
| Hassas veri | Uygundur | Uygun değildir (tüm çalışmalar kamuya açık) |
| Başvuru | E-posta ve öğrenci belgesi doğrulaması gerekir | Doğrudan indirilir |

Ödev, tez ve kişisel kullanım için **Desktop + akademik lisans** yolu önerilir. Portfolyo oluşturmak veya kamu veri setleri üzerinde pratik yapmak için **Tableau Public** tek başına yeterlidir. İki sürüm bir arada kurulabilir; arayüzleri neredeyse aynıdır.

## Sistem Gereksinimleri

Her iki sürüm için minimum gereksinimler benzerdir:

- **İşletim sistemi:** Windows 10 (22H2) ve sonrası ya da macOS 12 (Monterey) ve sonrası. Apple Silicon işlemcilerde yerel olarak çalışır.
- **İşlemci:** 64-bit Intel veya ARM64 mimarisi, en az iki çekirdek.
- **Bellek:** En az 8 GB RAM önerilir. Büyük veri setlerinde 16 GB daha uygundur.
- **Disk alanı:** Yaklaşık 1,5 GB kurulum için; çalışma dosyaları ayrıca yer kaplar.
- **Ekran çözünürlüğü:** 1366×768 ve üzeri.

![Tableau indirme sayfası](/img/docs/tableau/download-page.png)

## Yol 1: Tableau Desktop (Akademik Lisans)

### Lisans Başvurusu

1. Tarayıcınızdan [tableau.com/academic/students](https://www.tableau.com/academic/students) adresine gidin.
2. **Get Tableau Desktop free for one year** butonuna tıklayın.
3. Açılan formu doldurun: ad, soyad, üniversite e-posta adresi (`@ticaret.edu.tr` veya öğrenci e-posta uzantınız), okul adı, mezuniyet yılı.
4. Öğrenci statüsünün doğrulanması için kayıt belgesi (öğrenci kimliği fotoğrafı ya da son dönem kayıt yazısı) yüklemeniz istenir.
5. Başvurunuz genellikle 1–2 iş günü içinde onaylanır. Onay gelen e-posta ile birlikte **ürün anahtarı** (product key) ve indirme bağlantısı paylaşılır.

![Akademik lisans başvuru formu](/img/docs/tableau/academic-form.png)

### Windows Kurulumu

1. Onay e-postasındaki bağlantıdan veya [tableau.com/products/desktop/download](https://www.tableau.com/products/desktop/download) adresinden Windows için `.exe` kurulum dosyasını indirin.
2. İndirilen dosyayı çift tıklayarak çalıştırın; gerekirse yönetici izni verin.
3. Kurulum sihirbazında lisans sözleşmesini kabul edip **Install** düğmesine basın. Varsayılan dizin kullanılır (`C:\Program Files\Tableau\Tableau <sürüm>`).
4. Kurulum birkaç dakika içinde tamamlanır. Ardından açılan **Activate Tableau** ekranında, e-posta ile gelen **product key**'i ilgili kutuya yapıştırıp **Activate** seçin.
5. Aktivasyon başarılı olduğunda Tableau başlangıç sayfası açılır ve yazılım kullanılmaya hazır hale gelir.

![Tableau başlangıç ekranı](/img/docs/tableau/start-page.png)

### macOS Kurulumu

1. İndirme sayfasından macOS için `.dmg` paketini indirin.
2. Paketi çift tıklayıp açılan diskteki **Tableau Desktop** simgesini **Applications** klasörüne sürükleyin.
3. Uygulamayı Launchpad veya Spotlight üzerinden başlatın. İlk açılışta macOS güvenlik onayı gerekebilir; **Sistem Ayarları → Gizlilik ve Güvenlik** menüsünden izin verilir.
4. İlk açılışta sorulan **product key**'i e-postanızdan alıp girin ve aktivasyonu tamamlayın.

## Yol 2: Tableau Public (Ücretsiz)

Tableau Public, akademik başvuru gerektirmeden doğrudan indirilir. Arayüz ve temel araç seti Desktop ile aynıdır; fark kaydetme biçiminde ortaya çıkar.

1. [public.tableau.com/app/discover](https://public.tableau.com/app/discover) adresine gidin.
2. Sayfanın üst kısmındaki **Create a Viz** veya **Download the App** seçeneğini tıklayın.
3. İşletim sisteminize uygun kurulum dosyasını indirin ve yukarıdaki Windows/macOS adımlarını uygulayın (aktivasyon adımı atlanır; ürün anahtarı gerekmez).
4. İlk açılışta Tableau Public, çalışmalarınızı kaydedebilmeniz için bir **Tableau Public** hesabı oluşturmanızı ister. Hesap ücretsizdir ve yalnızca e-posta ile kayıt gerektirir.

## Lisans Yenileme ve Sorun Giderme

- **Akademik lisans süresi bir yıllıktır.** Süre dolduğunda aynı başvuru formu üzerinden yeni bir öğrenci belgesiyle yenileme yapılabilir. Yenileme sırasında eski ürün anahtarı yerine yenisi gönderilir; **Help → Manage Product Keys** menüsünden yeni anahtar girilir.
- **Product key kabul edilmiyor.** Anahtarın başındaki ve sonundaki boşlukları temizlediğinizden emin olun. Hatanın sürmesi durumunda Tableau destek ekibine (customerservice@tableau.com) başvurulabilir.
- **Tableau Public ile kaydedilen çalışma görünmüyor.** Çalışma yalnızca `File → Save to Tableau Public` komutuyla, Tableau Public hesabınıza bağlıyken kaydedilir. Yerel dosyaya kayıt bu sürümde devre dışıdır.
- **İşletim sistemi uyumsuzluğu.** Eski Windows 7/8 veya macOS 10.x sürümleri artık desteklenmemektedir; bu ortamlarda kurulum başarılı olsa bile yazılım başlatılamayabilir.
