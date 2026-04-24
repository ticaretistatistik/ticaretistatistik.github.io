---
title: Kurulum
description: JASP'ın Windows, macOS ve Linux üzerinde kurulumu, sistem gereksinimleri ve R entegrasyonu.
sidebar_position: 2
---

# Kurulum

Bu bölüm, JASP'ın desteklenen işletim sistemlerinde kurulum adımlarını, sistem gereksinimlerini ve R ile entegrasyonunu açıklar. Güncel kararlı sürüme her zaman [jasp-stats.org/download](https://jasp-stats.org/download/) adresinden erişilebilir; resmi dağıtım dışındaki kaynaklardan edinilen kurulum paketlerinin kullanılması önerilmez.

## Sistem Gereksinimleri

JASP, 64-bit mimari gerektirir. Windows 10 ve sonrası, macOS 11 (Big Sur) ve sonrası, Ubuntu 22.04 LTS ve türevleri resmi olarak desteklenen platformlardır. Çalışma belleği olarak en az 4 GB RAM önerilir; büyük veri setleriyle çalışılan senaryolarda 8 GB ve üzeri daha uygundur. Ekran çözünürlüğü için 1280×800 piksel ve üstü tavsiye edilir.

## Windows

1. [JASP indirme sayfasından](https://jasp-stats.org/download/) Windows için `.msi` kurulum dosyasını edinin.
2. İndirilen dosyayı çift tıklayarak çalıştırın ve kurulum sihirbazındaki yönergeleri izleyin.
3. Kurulum tamamlandığında JASP, Başlat menüsü ve masaüstü kısayolu üzerinden erişilebilir hale gelir.

Kurulum sırasında Windows SmartScreen uyarısıyla karşılaşılması halinde, **Daha fazla bilgi** bağlantısına ardından **Yine de çalıştır** seçeneğine tıklayarak devam edilebilir. JASP imzalı bir yazılımdır; ancak SmartScreen, yeni yayımlanmış sürümleri zaman zaman tanımayabilmektedir.

## macOS

1. İndirme sayfasından macOS için `.dmg` paketini indirin.
2. Açılan disk görüntüsündeki JASP simgesini **Applications** klasörüne sürükleyin.
3. Uygulamayı Launchpad veya Spotlight üzerinden başlatın.

İlk açılışta "Bilinmeyen geliştirici" uyarısı gösterilebilir. Bu durumda **Sistem Ayarları → Gizlilik ve Güvenlik** menüsünden ilgili uygulama için açıkça izin verilmesi gerekir; işlem yalnızca bir kez gerçekleştirilir, sonraki başlatmalarda tekrarlanmaz.

## Linux

Debian ve Ubuntu tabanlı dağıtımlarda kurulum, resmi depolar üzerinden doğrudan yapılabilir:

```bash
sudo apt update
sudo apt install jasp
```

Diğer dağıtımlar için taşınabilir formatta Flatpak ve AppImage paketleri sunulur. Flatpak aracılığıyla kurulum için:

```bash
flatpak install flathub org.jaspstats.JASP
```

AppImage kullanımı durumunda indirilen dosyaya çalıştırma izni verildikten sonra (`chmod +x`) doğrudan yürütülebilir; ayrıca bir kurulum adımı gerektirmez.

## R Entegrasyonu

JASP, tüm istatistiksel hesaplamaları arka planda R dili üzerinden yürütür. Kullanıcı arayüzünde seçilen her analiz, ilgili R paketine aktarılarak çalıştırılır; üretilen sonuçlar ardından tablo ve grafik biçiminde sunulur. Bu yapı, kullanıcının doğrudan R kodu yazmasına gerek kalmadan R ekosisteminin matematiksel doğruluğundan faydalanmasını sağlar.

JASP kurulum paketi, ihtiyaç duyulan R çalışma zamanını ve temel paketleri kendi içinde barındırır. Bu nedenle ayrı bir R kurulumu **zorunlu değildir**. İleri düzey veya alana özgü bazı analizlerde eksik R paketlerinin gerekmesi durumunda JASP, ilgili paketleri otomatik olarak indirir ve süreç kullanıcıya bildirilir.

Sistemde bağımsız bir R kurulumunun tercih edilmesi halinde — örneğin RStudio ile paylaşılan bir geliştirme ortamı kullanılıyorsa — güncel bir R sürümünün sistemde kurulu olması yeterlidir. JASP, mevcut kurulumu otomatik olarak algılar ve bu sürümü analizlerde kullanabilir.

## İlk Açılış

JASP açıldığında sol üstteki dosya simgesi aracılığıyla veri setinizi içe aktarabilirsiniz. Desteklenen biçimler arasında CSV, SPSS (`.sav`), Stata (`.dta`), Excel (`.xlsx`) ve düz metin dosyaları yer alır. Veri yüklendikten sonra üst şerit üzerindeki analiz başlıklarından biri (Descriptives, T-Tests, ANOVA, Regression ve benzeri) seçilir; ilgili değişkenler sağ paneldeki kutulara sürüklenerek analize dahil edilir. Seçim yapıldığı anda sonuçlar anlık olarak oluşur.

Her analiz oturumu `.jasp` uzantılı tek bir dosya olarak kaydedilir. Bu dosya; veri setini, seçilen yöntemleri ve üretilmiş çıktıları bir arada saklar. Böylece çalışmanın başka bir cihazda veya başka bir araştırmacı tarafından birebir açılıp sonuçlarının kontrol edilmesi mümkün olur; bu, açık bilim ilkeleri açısından önemli bir avantajdır.
