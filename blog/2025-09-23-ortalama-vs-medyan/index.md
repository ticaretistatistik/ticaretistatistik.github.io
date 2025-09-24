---
slug: ortalama-vs-medyan
title: Ortalama mı, Medyan mı?
authors: [yigitefeavci]
tags: [istatistik,ortalama,medyan,istatistik-toplulugu]
---

# Ortalama mı, Medyan mı?
Haberlerde sık sık şu tür cümlelerle karşılaşmışsınızdır:
**"Bu ilçede ortalama ev kirası 30.000 TL!"**

Kulağa çarpıcı geliyor, değil mi? Ama ya bu rakam gerçeği tam olarak yansıtmıyorsa?

İstatistikte en çok kullanılan ölçülerden biri “ortalama”dır. Basit ve anlaşılır olduğu için çoğu zaman tercih edilir. Fakat özellikle uç değerler (örneğin birkaç aşırı pahalı ev) işin içine girdiğinde, ortalama tek başına gerçeği çarpıtarak farklı bir tablo sunabilir.

İşte bu noktada medyan devreye girer. Peki ortalama ile medyan arasındaki fark nedir, hangisi daha güvenilirdir ve neden bu ayrım bu kadar önemlidir?

## Ortalama (Mean) Nedir?
Ortalama, tüm değerlerin toplanıp gözlem sayısına bölünmesiyle hesaplanır. Matematiksel olarak basittir ve çoğu zaman bize "geneli" göstermek için yeterlidir.

<!-- truncate -->

![Mean Equation](./mean-equation.png)

- Burada xi her bir gözlemi,
- n gözlem sayısını ifade eder.

**Avantajları:**  
- Hesaplaması kolaydır.  
- Normal dağılım gösteren verilerde oldukça güvenilirdir.  

**Dezavantajları:**  
- Uç değerlerden çok etkilenir.  
- Küçük örneklemlerde yanıltıcı olabilir.  

**Örnek:**  
Bir mahallede 5 evin kira değerleri şu şekilde olsun:  
10.000 TL, 12.000 TL, 11.000 TL, 9.000 TL ve 150.000 TL.  

![Mean Equation Example Solved](./mean-equation-example-solved.png)

Ama gerçekçi mi? Çoğu ev aslında 10-12 bin bandında. Ortalama, tek bir uç değerin etkisiyle şişmiş oldu.  

---

## Medyan (Median) Nedir?
Medyan, sıralanmış verilerin tam ortasında kalan değerdir.  

- Eğer n tek sayıysa, medyan ortadaki sayıdır.
- Eğer n çift sayıysa, medyan ortadaki iki sayının ortalamasıdır.

**Avantajları:**  
- Uç değerlerden etkilenmez.  
- Verinin “tipik” değerini daha iyi gösterir.  

**Dezavantajları:**  
- Çok küçük örneklemlerde hassas olabilir.  
- Matematiksel işlemlerde ortalama kadar esnek değildir.  

**Örnek:**  
Yukarıdaki kira değerlerini sıralayalım:  
9.000 TL, 10.000 TL, 11.000 TL, 12.000 TL, 150.000 TL  

Medyan = 11.000 TL

Bu değer, mahalledeki tipik kira düzeyini çok daha iyi yansıtıyor. 

## Ortalama mı, Medyan mı?  

- **Uç değerlerin bol olduğu dağılımlarda** (kira, gelir, ev fiyatı): **Medyan** daha güvenilirdir.  
- **Dengeli dağılımlarda** (boy uzunluğu, sınav puanı): **Ortalama** ile **medyan** birbirine yakın çıkar.  

Örneğin:  
- TÜİK gelir dağılımı raporlarında “medyan gelir” paylaşır çünkü ortalama, en zengin küçük bir grubun kazançlarıyla şişebilir.  
- Sağlık araştırmalarında da “medyan yaşam süresi” kullanılır çünkü herkesin ömrü eşit dağılmaz.