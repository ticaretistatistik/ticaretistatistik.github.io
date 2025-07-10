# Katkıda Bulunma Rehberi

Bu rehber, web sitemize katkıda bulunmak isteyen herkese yol göstermek için hazırlanmıştır. İki farklı katkı türü için ayrı bölümler bulunmaktadır:

1. [Blog Yazarlığı](#blog-yazarlığı)
2. [Kod Katkısı](#kod-katkısı)

## Blog Yazarlığı

Blog yazarlığı için programlama veya teknik bilgi gerektiren herhangi bir ön koşul bulunmamaktadır. Yazılarınızı aşağıdaki yöntemlerden biriyle hazırlayabilirsiniz:

### 1. Yazıyı Google Docs veya Microsoft Word ile Hazırlama

Eğer markdown formatıyla çalışma konusunda tecrübeniz yoksa, yazılarınızı alışık olduğunuz bir yazı editöründe (Google Docs veya Microsoft Word) hazırlayabilirsiniz. Aşağıdaki adımları takip edebilirsiniz:

1. Google Documents veya Microsoft Word üzerinden yazınızı yazın.
   - Yazınızın başlığı, alt başlıkları ve paragrafları açık ve anlaşılır olmalıdır.
   - Yazım kurallarına dikkat edin.
   - Yazınızı mümkün olduğunca kısa ve öz tutun.
   - Yazının sonunda kaynaklarınızı belirtin (varsa).
2. Formun doldurulması gereken bilgileri hazırlayın:

   Yazı Bilgileri:
   - Yazınızın başlığı
   - İçerik etiketleri
   - Yazı dosyasının kendisi (Google Docs veya Word formatında)

   Yazar Bilgileri:
   - Adınız ve soyadınız
   - Unvanınız veya üstlendiğiniz rol (örn: İstatistik Bölümü Öğrencisi)
   - Kullanıcı adınız (Sizi temsil eden bir kullanıcı adı seçiniz, hepsi küçük harfle yazılmalıdır)
   - 1:1 ölçüde bir profil fotoğrafı (kare format)
   - Web siteniz veya GitHub/LinkedIn profilinizin URL'si

- 3.Yazınızı ve bilgilerinizi [Blog Yazısı Başvuru Formu](https://forms.gle/nQXvgBrkjBLUQjrA7) ile gönderin.

Yazınızı markdown formatına çevrilip sitenin blog bölümüne eklenecektir. Bu işlem için birkaç gün sürebilir, lütfen sabırlı olun.

### 2. Markdown Formatında Hazırlama

Eğer markdown formatında yazmayı tercih ederseniz:

1. Yazınızı markdown formatında hazırlayın
   - Markdown hakkında bilgi almak için [Markdown Guide](https://www.markdownguide.org/) sayfasını ziyaret edebilirsiniz.
   - Yazım kurallarına dikkat edin.
   - Yazınızın başlığı, alt başlıkları ve paragrafları açık ve anlaşılır olmalıdır.
   - Yazının sonunda kaynaklarınızı belirtin (varsa).
2. `blog` klasörü altında yeni bir klasör oluşturun (klasör adı formatı: `YYYY-MM-DD-yazinizin-basligi`)
3. Klasörün içine `index.md` dosyası oluşturun
4. Yazınızın başına aşağıdaki metadatayı ekleyin:

   ```markdown
   ---
   slug: yasinizin-url-adresi
   title: Yazınızın Başlığı
   authors: [kullanici-adiniz]
   tags: [etiket1, etiket2]
   ---
   ```

5. `blog/authors.yml` dosyasına yazar bilgilerinizi ekleyin:

   ```yaml
   kullanici-adiniz:
     name: İsim Soyisim
     title: Unvanınız/Rolünüz (örn: İstatistik Bölümü Öğrencisi)
     url: https://github.com/github-kullanici-adiniz
     image_url: /img/authors/kullanici-adiniz.jpg
   ```

## Kod Katkısı

Web sitesinin koduna katkıda bulunmak istiyorsanız, standart GitHub iş akışını takip etmelisiniz:

1. Öncelikle [issues](https://github.com/ticaretistatistik/ticaretistatistik.github.io/issues) sayfasını kontrol edin
2. Yapmak istediğiniz değişiklik için yeni bir issue açın
   - Değişikliğin amacını açıklayın
   - Nasıl implemente edeceğinizi kısaca anlatın
3. Issue üzerinde geri bildirim alın
4. Repository'yi forklayın
5. Değişikliklerinizi yapın
6. Pull Request açın
   - PR açarken ilgili issue'yu referans gösterin (#issue-number)
   - Değişikliklerinizi detaylı bir şekilde açıklayın

### Geliştirme Ortamı

Lokal geliştirme ortamını kurmak için:

1. Repository'yi klonlayın:

   ```shell
   git clone git@github.com:ticaretistatistik/ticaretistatistik.github.io.git
   ```

2. Bağımlılıkları yükleyin:

   ```shell
   cd ticaretistatistik.github.io
   npm install
   ```

3. Geliştirme sunucusunu başlatın:

   ```shell
   npm start
   ```

## Yardım ve İletişim

Herhangi bir sorunuz olursa [issues](https://github.com/ticaretistatistik/ticaretistatistik.github.io/issues) sayfasında yeni bir issue açabilirsiniz.
