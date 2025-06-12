# Ticaret İstatistik Yardımcı Doküman Sitesi

Bu repository, İstanbul Ticaret Üniversitesi İstatistik bölümü öğrencileri için hazırlananmış yardımcı doküman sitesinin kaynak kodlarını barındırır.

## İçindekiler

1. [Başlangıç](#başlangıç)
2. [Gereksinimler](#gereksinimler)
3. [Kurulum](#kurulum)
4. [Kullanım](#kullanım)
5. [Katkıda Bulunanlar](#katkıda-bulunanlar)
6. [Katkıda Bulunma Rehberi](#katkıda-bulunma-rehberi)
7. [Lisans](#lisans)

## Başlangıç

Bu web sitesi [NodeJS](https://nodejs.org/en/download) ve [Docusaurus](https://docusaurus.io/) kullanılarak oluşturulmuştur. Eğer bu siteyi kendi bilgisayarınızda barındırmak ve erişmek istiyorsanız kurulum aşamasına geçebilir ve yönergeleri takip ederek bilgisayarınızda da siteyi çalıştırabilirsiniz.

## Gereksinimler

Web sitesinin kaynak kodlarını bilgisayarınıza çekebilmeniz ve gerekli paketleri kurabilmek için birkaç ön kurulum adımının izlenmesi gerekir. Aşağıdaki bağlantılardan kurulum dosyalarını indirerek kurulumlarını gerçekleştirebilirsiniz.

- [Git](https://git-scm.com/downloads)
- [NodeJS & Npm](https://nodejs.org/en/download/)

## Kurulum

Kurulum aşamalarını tamamlamak için bilgisayarınızın terminaline gidip sırasıyla aşağıdaki işlemleri uygulamanız gerekir.

1. Bu repository'yi bilgisayarınıza git clone aracılığıyla klonlayın.

    ```shell
    git clone git@github.com:ticaretistatistik/ticaretistatistik.github.io.git
    ```

2. Terminalinizden ana dizine gidin.

    ```shell
    cd ticaretistatistik.github.io
    ```

3. Uygulamanın çalışabilmesi için gerekli paketleri indirin

    ```shell
    npm install
    ```

## Kullanım

Web sitesini, aşağıdaki komut yardımıyla `development` modunda çalıştırabilirsiniz. `development` modu, siz dosyaları değiştirdikçe ve kaydettikçe otomatik olarak siteyi yenileyecektir.

Siteye, tarayıcınızdan [localhost:3000](http://localhost:3000) adresine girerek erişebilirsiniz.

```shell
npm start
```

## Katkıda Bulunanlar

<a href="https://github.com/ticaretistatistik/ticaretistatistik.github.io/graphs/contributors">
  <img alt="List of the contributors with every contributor's github profile picture" src="https://contrib.rocks/image?repo=ticaretistatistik/ticaretistatistik.github.io" />
</a>

## Katkıda Bulunma Rehberi

Eğer sizler de bu web sitesinde yazı yazmak veya geliştirme aşamalarına katkıda bulunmak isterseniz daha detaylı bilgiye [CONTRIBUTING.md](./CONTRIBUTING.md) üzerinden erişebilirsiniz.

## Lisans

Bu proje `GPL-3` Lisansı ile lisanslanmıştır. Detaylar için [LICENSE](./LICENSE) dosyasını inceleyebilirsiniz.

This project is licensed under the `GPL-3` License. See the [LICENSE](./LICENSE) file for details.
