---
title: Temel Kullanım
description: Tableau'nun arayüz bileşenleri ve Sample Superstore veri seti üzerinde adım adım çalışma kitabı ile pano üretimi örneği.
sidebar_position: 3
---

# Temel Kullanım

Bu bölümde Tableau'nun arayüz mantığı özetlendikten sonra, her kurulumda hazır gelen **Sample - Superstore** veri seti üzerinde adım adım bir örnek yürütülecektir. Örnek; veriye bağlanmadan bir pano (dashboard) oluşturup yayımlamaya kadar olan temel iş akışını kapsar.

## Arayüz Bileşenleri

Tableau Desktop'ta bir çalışma kitabı (workbook) açıldığında ekran üç ana bölgeden oluşur: solda **Data** panelindeki veri kaynağı alanları, ortada **View** bölgesindeki görselleştirme tuvali ve üstte **Columns / Rows** rafları (shelf).

![Tableau arayüz genel görünümü](/img/docs/tableau/interface-overview.png)

Öğrenilmesi gereken başlıca kavramlar şunlardır:

1. **Dimensions (Boyutlar):** Kategorik ya da kimlik tipinde alanlar. Tarih, bölge, ürün kategorisi gibi "neye göre?" sorusunun karşılığıdır. Data panelinde mavi ikonla gösterilir.

2. **Measures (Ölçüler):** Sayısal, toplanabilir alanlar. Satış tutarı, miktar, kâr gibi "ne kadar?" sorusunun karşılığıdır. Yeşil ikonla gösterilir.

3. **Columns / Rows rafları:** Görseldeki eksenleri tanımlar. Bir ölçüyü **Rows**'a, bir boyutu **Columns**'a sürüklediğinizde Tableau uygun grafik tipini otomatik seçer.

4. **Marks kartı:** Her işaretin (çubuk, nokta, alan) rengi, boyutu, etiketi ve detayının nasıl belirleneceğini kontrol eder. Renk ekleyerek ikinci bir boyut, boyut ekleyerek üçüncü bir boyut kodlayabilirsiniz.

5. **Filters rafı:** Görselde hangi kayıtların gösterileceğini daraltır. Etkileşimli filtreler gösterim için sağda açılabilir.

6. **Show Me paneli:** Seçili alanlarla üretilebilecek grafik tiplerini önerir. Hızlı keşif için kullanışlıdır; uzun vadede tercih edilen yol ise grafiği raflara elle sürükleyerek inşa etmektir.

## Veri Kaynağına Bağlanma

Tableau açıldığında karşılama sayfasında **Connect** başlığı altında desteklenen veri kaynakları listelenir. Örneği tekrar edilebilir tutmak için her kurulumda hazır gelen **Sample - Superstore** setini kullanacağız.

1. Karşılama sayfasının sağ alt köşesindeki **Saved Data Sources → Sample - Superstore** bağlantısına tıklayın. Çalışma kitabı Superstore veri setine bağlı olarak açılır.
2. Sol panelde üç tablo görürsünüz: **Orders**, **People**, **Returns**. Varsayılan olarak Orders tablosu seçilidir.
3. Alt tarafta **Sheet 1** sekmesine geçerek ilk görselleştirme için analiz sayfasını açın.

![Sample Superstore bağlantısı](/img/docs/tableau/connect-superstore.png)

## Örnek 1: Bölgeye Göre Satış

İlk grafiğimiz, satışların bölgelere göre dağılımını gösteren bir çubuk grafiği olacaktır.

1. **Data** panelinden **Region** alanını (Dimensions) **Columns** rafına sürükleyin. Tableau, dört bölge için boş sütunlar oluşturur.
2. **Sales** alanını (Measures) **Rows** rafına sürükleyin. Her bölge için toplam satışı gösteren bir çubuk grafik belirir; varsayılan birleştirme toplam (**SUM**) şeklindedir.
3. Çubukları değerlerine göre sıralamak için araç çubuğundaki küçük **Sort descending** simgesine tıklayın.
4. Grafik başlığını anlamlı yapmak için üstteki otomatik başlığa çift tıklayıp **"Bölgeye göre toplam satış"** yazın.

![Bölgeye göre satış çubuk grafiği](/img/docs/tableau/region-sales-bar.png)

Bu noktada; kategorik bir boyut (Region) ile sayısal bir ölçünün (Sales) nasıl birleştirildiğini ve Tableau'nun otomatik olarak doğru grafik tipini seçtiğini görmüş oluruz.

## Örnek 2: Kategori Kırılımı ve Renk

Aynı grafiğin her çubuğunu ürün kategorisine göre kırarak zenginleştirelim.

1. **Category** alanını **Marks** kartındaki **Color** kutusuna sürükleyin. Her çubuk, Furniture / Office Supplies / Technology kategorilerine göre renklerle bölümlenir.
2. Görselin stacked (üst üste yığılmış) yerine dodged (yan yana) görünmesi isteniyorsa **Category** alanını **Color**'dan çıkarıp **Columns** rafına, **Region**'ın yanına sürükleyin.
3. **Marks** kartındaki **Label** kutusuna **Sales** alanını ekleyerek her çubuğun üstünde satış tutarı etiketini gösterebilirsiniz.

![Bölge ve kategori kırılımlı grafik](/img/docs/tableau/region-category-sales.png)

## Örnek 3: Hesaplanmış Alan — Kâr Marjı

İstatistik eğitiminde sıkça karşılaşılan bir adımdır: mevcut alanlardan yeni bir değişken türetmek. Örnek olarak **kâr marjı**nı (Profit / Sales) hesaplayalım.

1. Data panelinde boş bir yere sağ tıklayıp **Create Calculated Field** seçin.
2. Açılan pencerede alan adını **"Profit Margin"** olarak girin.
3. Formül kutusuna aşağıdaki ifadeyi yazın ve **OK**'e basın:

```
SUM([Profit]) / SUM([Sales])
```

4. Yeni alan Measures bölümünde görünür. **Profit Margin**'i ikinci bir grafik için **Rows** rafına sürükleyin; **Region** alanını **Columns**'ta tutun. Artık her bölgenin kâr marjı görünür.
5. Etiketi yüzde olarak göstermek için alana sağ tıklayıp **Default Properties → Number Format → Percentage** menüsünden biçimi değiştirin.

Bu adım, Tableau'nun istatistiksel türetmeleri (oran, ortalama, standart sapma) basit ifadelerle tanımlayıp görselleştirmeye nasıl entegre ettiğini gösterir. Daha karmaşık formüller için `AVG`, `STDEV`, `WINDOW_AVG`, `IF-THEN` gibi yerleşik fonksiyonlar kullanılabilir.

## Pano (Dashboard) Oluşturma

İki grafiği tek bir panoda birleştirelim.

1. Alt taraftaki sekmelerin yanındaki **New Dashboard** simgesine tıklayın.
2. Sol paneldeki **Sheets** listesinden önceden oluşturduğunuz iki çalışma sayfasını (bölge satış grafiği ve kâr marjı grafiği) tuvale sürükleyin.
3. Sağ üstteki boyut menüsünden **Automatic** veya sabit bir boyut (ör. Desktop 1366×768) seçerek pano tuvalinin büyüklüğünü ayarlayın.
4. Pano içinde bir grafiğe filtre eklemek için grafik seçiliyken sağ üst köşedeki aşağı oka tıklayıp **Use as Filter** seçin. Artık birinci grafikte bir bölgeye tıklandığında ikinci grafik o bölgeye göre filtrelenir.

![Tamamlanmış pano örneği](/img/docs/tableau/final-dashboard.png)

## Çalışmanın Kaydedilmesi ve Paylaşılması

**Tableau Desktop** kullanıyorsanız çalışmanızı **File → Save** ile `.twb` ya da **File → Save Packaged Workbook** ile veriyi de içeren `.twbx` biçiminde yerel olarak kaydedebilirsiniz. `.twbx` dosyası tek başına taşınabilir — alıcı Tableau Reader veya Desktop açtığında veri setini de beraber alır.

**Tableau Public** kullanıyorsanız çalışma yalnızca **File → Save to Tableau Public** komutuyla bulut hesabınıza yüklenebilir. Yükleme tamamlandığında tarayıcıda herkese açık bir sayfa oluşturulur; bu sayfanın bağlantısı portfolyoda veya sosyal medyada paylaşılabilir.

## Sonraki Adımlar

Bu örnekte tek bir veri kaynağı üzerinde temel rafları, renk kodlamayı, hesaplanmış alanı ve pano birleştirmeyi denedik. Devamında öğrenilmesi önerilen konular şunlardır:

- **Parameters** — kullanıcının bir panoda anlık olarak değiştirebileceği değişkenler.
- **Level of Detail (LOD) expressions** — `{FIXED}`, `{INCLUDE}`, `{EXCLUDE}` sözdizimi ile farklı gruplarda hesaplama kontrolü.
- **Time series analiz** — tarih hiyerarşisi, hareketli ortalama, trend çizgisi.
- **Istatistiksel katmanlar** — regresyon çizgisi, güven aralığı, kutu grafiği gibi istatistiksel işaretlerin eklenmesi (**Analytics** panelinden).
- **Veri birleştirme** — Join, Union ve Blend yöntemleriyle birden fazla kaynağı bir araya getirme.

Bu konuların her biri istatistik pratiğini görsel analitikle birleştirmenin daha ileri aşamalarını oluşturur; ilk aşamada Sample Superstore gibi bir veri seti üzerinde yukarıdaki temel adımlarla rahat çalışmak önerilir.
