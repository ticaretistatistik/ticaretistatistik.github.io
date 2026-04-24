---
title: Kurulum Kılavuzu
description: İstanbul Ticaret Üniversitesi lisansı ile IBM SPSS Statistics 24 kurulumu, VPN gereksinimleri ve lisans aktivasyonu.
sidebar_position: 2
---

# Kurulum Kılavuzu

İstanbul Ticaret Üniversitesi; tüm öğrenci ve akademik personeline **IBM SPSS Statistics 24** yazılımını kurumsal lisans kapsamında ücretsiz olarak sunar. Yazılım, Bilgi İşlem Daire Başkanlığı tarafından [bim.ticaret.edu.tr/spss](https://bim.ticaret.edu.tr/spss/) adresi üzerinden dağıtılır; kurulum dosyaları ve üniversite tarafından sağlanan lisans bilgileri SharePoint üzerindeki resmi arşivde barındırılır.

Bu bölümde; kurulum paketine erişim, Windows ve macOS üzerinde kurulum adımları ile lisans aktivasyonu süreci özetlenmiştir. Resmi ve güncel kaynak her zaman Bilgi İşlem Daire Başkanlığı'nın paylaştığı PDF kılavuzudur; aşağıdaki açıklamalar bu kaynağın tamamlayıcısı niteliğindedir.

:::warning Önemli
Kampüs dışından (ev, yurt, kampüs dışı lokasyonlar) kurulum ve kullanım için **GlobalProtect VPN** bağlantısının kurulu ve aktif olması zorunludur. VPN olmadan hem SharePoint üzerindeki kurulum paketine erişim hem de IBM lisans sunucusu üzerinden aktivasyon başarısız olur.
:::

## Ön Koşullar

1. **Üniversite hesabı.** SharePoint arşivine ve kurulum paketine erişim, üniversite e-posta hesabınızla (`@ticaret.edu.tr` veya öğrenci e-posta uzantınız) yapılan oturum açma sonrasında mümkündür.
2. **GlobalProtect VPN.** Kampüs dışından bağlantı için Palo Alto GlobalProtect istemcisinin kurulu olması gerekir. Kurulum adımları için Bilgi İşlem'in ilgili kılavuzlarına başvurabilirsiniz: [Windows için VPN Kurulumu](https://bim.ticaret.edu.tr/windows-pc-icin-vpn-kurulumu/), [macOS için VPN Kurulumu](https://bim.ticaret.edu.tr/mac-pc-icin-vpn-kurulumu/).
3. **Sistem gereksinimleri.** IBM SPSS Statistics 24 için Windows 7 SP1 ve sonrası ya da macOS 10.10 ve sonrası desteklenir. En az 4 GB RAM (büyük veri setleri için 8 GB ve üzeri önerilir), yaklaşık 4 GB boş disk alanı ve 1024×768 piksel ekran çözünürlüğü gereklidir.

## Kurulum Paketine Erişim

1. Kampüs içinde iseniz üniversite kablosuz ağına bağlı olduğunuzdan emin olun. Kampüs dışındaysanız öncelikle GlobalProtect istemcisini çalıştırıp oturum açın.
2. Tarayıcınızdan [Bilgi İşlem SPSS sayfasına](https://bim.ticaret.edu.tr/spss/) girin.
3. Sayfa üzerindeki **"Kurulum Kılavuzunu İndirmek İçin Tıklayınız"** bağlantısına tıklayın. Bağlantı sizi SharePoint üzerindeki resmi arşiv klasörüne yönlendirir.
4. Açılan oturum penceresinde üniversite hesabınızla giriş yapın. Klasör içinde; kurulum dosyaları, üniversite tarafından sağlanan lisans bilgileri ve resmi adım adım PDF kılavuz yer alır.
5. İşletim sisteminize uygun kurulum arşivini (Windows için `.zip` / `.iso`, macOS için `.dmg`) bilgisayarınıza indirin.

## Windows Kurulumu

1. İndirilen arşivi boş bir klasöre çıkartın.
2. Çıkan dosyalar içinden kurulum yürütücüsünü sağ tıklayıp **Yönetici olarak çalıştır** seçeneğiyle başlatın.
3. Kurulum sihirbazı açıldığında dili **İngilizce** bırakın. Lisans anahtarı yazılımın İngilizce kurulumu üzerinde tanımlıdır; farklı dil seçiminde aktivasyon sorunları yaşanabilir.
4. Lisans sözleşmesini okuyup kabul edin ve varsayılan kurulum dizinini değiştirmeden **İleri** adımlarıyla devam edin.
5. Kurulum tamamlandığında **License Authorization Wizard** otomatik olarak açılır. Açılmazsa Başlat menüsünden "IBM SPSS Statistics 24 License Authorization Wizard" kısayolunu bulup elle başlatabilirsiniz.
6. Lisans türü ekranında **Authorised user license (I purchased a single user licence)** seçeneğini işaretleyin.
7. SharePoint klasöründeki belgede sağlanan **authorization code**'u ilgili kutuya yapıştırın ve **İleri**'ye tıklayın.
8. Aktivasyon sunucusuyla bağlantı kurulduğunda ilerleme tamamlanır. **Son** butonuna tıklayarak sihirbazı kapatın.

:::tip VPN'i açık tutun
Kampüs dışından yapılan kurulumlarda 7. adımdaki aktivasyon talebi lisans sunucusuna ancak GlobalProtect oturumu aktifken ulaşır. Aktivasyon tamamlandıktan sonra VPN kapatılabilir; yazılım çevrimdışı kullanılmaya devam eder.
:::

## macOS Kurulumu

1. İndirilen `.dmg` paketini çift tıklayarak açın.
2. Açılan pencerede SPSS simgesini **Applications (Uygulamalar)** klasörüne sürükleyin.
3. İlk açılışta "Bilinmeyen geliştirici" uyarısı ile karşılaşmanız durumunda **Sistem Ayarları → Gizlilik ve Güvenlik** menüsünden uygulamaya açıkça izin verin. Bu işlem yalnızca ilk başlatmada gereklidir.
4. SPSS'i başlattıktan sonra **Help → License Authorization Wizard** menü yolunu izleyin.
5. **Authorised user license** seçeneğini seçerek SharePoint klasörü içinde sağlanan authorization code'u girin.
6. Doğrulama tamamlandığında yazılım tam olarak kullanılabilir hale gelir.

## İlk Açılış ve Kontrol

SPSS başlatıldığında varsayılan çalışma alanı olan **Data Editor** penceresi açılır. Veri içe aktarımı **File → Open → Data** menü yolu üzerinden yapılır ve `.sav`, `.xlsx`, `.csv` gibi birçok biçim doğrudan desteklenir. Analiz menüleri üst şerit üzerindeki **Analyze** sekmesinde; grafik üretim araçları ise **Graphs → Chart Builder** altında toplanmıştır.

Lisansın doğru şekilde yüklenip yüklenmediğini doğrulamak için **Help → About** menüsüne tıklayın. Açılan pencerede "Authorised user license" ibaresi ve lisansın geçerlilik bilgisi görüntüleniyorsa kurulum başarıyla tamamlanmıştır.

## Sık Karşılaşılan Sorunlar

- **Lisans anahtarı kabul edilmiyor.** Büyük ihtimalle kampüs ağına bağlı değilsiniz. GlobalProtect istemcisinin aktif olduğundan emin olup aktivasyonu yeniden başlatın.
- **SharePoint klasörüne erişilemiyor.** Tarayıcınızda üniversite hesabıyla oturum açmış olmanız gerekir. Farklı bir hesapla giriş yapılmışsa oturumu kapatıp üniversite hesabıyla tekrar giriş yapın.
- **"License expired" hatası.** Yıllık lisans süresi dolmuş olabilir. Bu durumda Bilgi İşlem Daire Başkanlığı ile iletişime geçerek lisans yenilemesini talep etmeniz gerekir.
- **Kurulum başlatılamıyor veya çöküyor.** Eksik veya güncel olmayan Microsoft Visual C++ Redistributable paketleri nedeniyle oluşabilir. Microsoft'un güncel sürümünü kurup tekrar deneyin.

## Destek

Kurulum veya lisans aktivasyonu sırasında çözülemeyen bir sorunla karşılaşmanız halinde İstanbul Ticaret Üniversitesi Bilgi İşlem Daire Başkanlığı ile iletişime geçebilirsiniz:

- **E-posta:** [bim@ticaret.edu.tr](mailto:bim@ticaret.edu.tr)
- **Telefon:** 444 0 413
- **Resmi kurulum sayfası:** [bim.ticaret.edu.tr/spss](https://bim.ticaret.edu.tr/spss/)