# Kurulum

Bu bölümde, **JASP**’ı farklı işletim sistemlerinde nasıl kurabileceğinizi öğreneceksiniz.  
JASP tamamen ücretsizdir ve resmi web sitesi üzerinden indirilebilir: [JASP Resmi Sitesi](https://jasp-stats.org).  

---

## Windows Kurulumu

1. [JASP Windows sürümünü](https://jasp-stats.org/download/) indirin.  
2. İndirilen `.exe` kurulum dosyasını çalıştırın.  
3. Kurulum sihirbazındaki yönergeleri takip ederek kurulumu tamamlayın.  
4. Kurulum tamamlandığında masaüstünüzde veya başlat menüsünde **JASP** simgesi görünecektir.  
5. Çift tıklayarak programı açabilir ve analizlerinize başlayabilirsiniz.  

💡 **İpucu:** İlk açılışta Windows Güvenlik Uyarısı alırsanız, "Çalıştır" seçeneğini işaretlemeniz yeterlidir.  

---

## macOS Kurulumu

1. [macOS için DMG dosyasını](https://jasp-stats.org/download/) indirin.  
2. Dosyayı açın ve JASP simgesini **Applications (Uygulamalar)** klasörüne sürükleyin.  
3. Launchpad üzerinden JASP’ı çalıştırabilirsiniz.  

⚠️ **Not:** Eğer macOS “Bilinmeyen Geliştirici” uyarısı verirse:  
- **Sistem Ayarları > Güvenlik ve Gizlilik** menüsünden uygulamayı açmaya izin verin.  

---

## Linux Kurulumu

JASP Linux dağıtımları için resmi depolardan indirilebilir. Örneğin **Ubuntu/Debian** üzerinde kurulum:  

```bash
sudo apt update
sudo apt install jasp
```

Alternatif olarak, [JASP indirilebilir paketlerini](https://jasp-stats.org/download/) kullanabilir veya Flatpak / AppImage seçeneklerini değerlendirebilirsiniz.  

---

## İlk Açılış

- Programı açtığınızda SPSS’e benzer bir menü yapısı göreceksiniz.  
- Varsayılan paketler otomatik yüklenir.  
- Veri setinizi içe aktararak (CSV, Excel vb.) anında analiz yapmaya başlayabilirsiniz.  

💡 **İpucu:** JASP, sonuçları otomatik olarak tablo ve grafik halinde sunar. Bu raporlar doğrudan akademik çalışmalarda kullanılabilir.  

---

## R ile Bağlantısı

JASP, arka planda tüm istatistiksel hesaplamaları **R programlama dili** üzerinden gerçekleştirir.  
Kullanıcılar doğrudan R kodu yazmaz; JASP’ın menü tabanlı arayüzü işlemleri otomatik olarak R’e iletir ve sonuçları hazır tablo/grafik olarak sunar.  

### R Neden Gereklidir?  
- İstatistiksel hesaplamaların doğruluğu için R motorunu kullanır.  
- Bayesyen analizler ve gelişmiş testlerin çalışabilmesi için zorunludur.  
- R güncel değilse, bazı JASP fonksiyonları çalışmayabilir.  

---

## R Kurulumu

1. [R Project Resmi Sitesi](https://cran.r-project.org/) adresine gidin.  
2. Kullandığınız işletim sistemine uygun R sürümünü indirin.  
3. Kurulum adımlarını tamamlayın.  
4. JASP, bilgisayarınızda kurulu olan R’i otomatik olarak algılar ve analizlerde kullanır.  

---

## Önemli Notlar

- 🔄 **R Güncellemeleri:** R sürümünüzü güncel tutmanız JASP’ın daha stabil çalışmasını sağlar.  
- ❌ **Hata Durumları:** Eğer R kurulu değilse veya eskiyse, JASP bazı analizlerde hata verebilir.  
- 📦 **Ek Paketler:** İleri düzey analizlerde ek R paketleri gerekebilir; JASP bu paketleri gerektiğinde otomatik yükler.  