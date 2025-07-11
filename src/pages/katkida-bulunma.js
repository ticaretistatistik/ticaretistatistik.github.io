import Layout from '@theme/Layout';
import styles from './katkida-bulunma.module.css';


export default function ContributingPage() {
    return (
        <Layout title="Katkıda Bulunma Rehberi" description="Ticaret İstatistik Web Sitesi Katkıda Bulunma Rehberi">
            <div className={styles.container}>
                <div className={styles.contentcontainer}>
                    <h1 id="katk-da-bulunma-rehberi">Katkıda Bulunma Rehberi</h1>
                    <p>Bu rehber, web sitemize katkıda bulunmak isteyen herkese yol göstermek için hazırlanmıştır. İki farklı katkı türü için ayrı bölümler bulunmaktadır:</p>
                    <ol>
                        <li><a href="#blog-yazarlığı">Blog Yazarlığı</a></li>
                        <li><a href="#kod-katkısı">Kod Katkısı</a></li>
                    </ol>
                    <h2 id="blog-yazarl-">Blog Yazarlığı</h2>
                    <p>Blog yazarlığı için programlama veya teknik bilgi gerektiren herhangi bir ön koşul bulunmamaktadır. Yazılarınızı aşağıdaki yöntemlerden biriyle hazırlayabilirsiniz:</p>
                    <h3 id="1-yaz-y-google-docs-veya-microsoft-word-ile-haz-rlama">1. Yazıyı Google Docs veya Microsoft Word ile Hazırlama</h3>
                    <p>Eğer markdown formatıyla çalışma konusunda tecrübeniz yoksa, yazılarınızı alışık olduğunuz bir yazı editöründe (Google Docs veya Microsoft Word) hazırlayabilirsiniz. Aşağıdaki adımları takip edebilirsiniz:</p>
                    <div>
                        <ol>
                            <li>Google Documents veya Microsoft Word üzerinden yazınızı yazın.<ul>
                                <li>Yazınızın başlığı, alt başlıkları ve paragrafları açık ve anlaşılır olmalıdır.</li>
                                <li>Yazım kurallarına dikkat edin.</li>
                                <li>Yazınızı mümkün olduğunca kısa ve öz tutun.</li>
                                <li>Yazının sonunda kaynaklarınızı belirtin (varsa).</li>
                            </ul>
                            </li>
                            <li><p>Formun doldurulması gereken bilgileri hazırlayın:</p>
                                <p>Yazı Bilgileri:</p>
                                <ul>
                                    <li>Yazınızın başlığı</li>
                                    <li>İçerik etiketleri</li>
                                    <li>Yazı dosyasının kendisi (Google Docs veya Word formatında)</li>
                                </ul>
                                <p>Yazar Bilgileri:</p>
                                <ul>
                                    <li>Adınız ve soyadınız</li>
                                    <li>Unvanınız veya üstlendiğiniz rol (örn: İstatistik Bölümü Öğrencisi)</li>
                                    <li>Kullanıcı adınız (Sizi temsil eden bir kullanıcı adı seçiniz, hepsi küçük harfle yazılmalıdır)</li>
                                    <li>1:1 ölçüde bir profil fotoğrafı (kare format)</li>
                                    <li>Web siteniz veya GitHub/LinkedIn profilinizin URL&#39;si</li>
                                </ul>
                            </li>
                            <li><p>3.Yazınızı ve bilgilerinizi <a href="https://forms.gle/nQXvgBrkjBLUQjrA7">Blog Yazısı Başvuru Formu</a> ile gönderin.</p>
                            </li>
                        </ol>
                    </div>
                    <p>Yazınızı markdown formatına çevrilip sitenin blog bölümüne eklenecektir. Bu işlem için birkaç gün sürebilir, lütfen sabırlı olun.</p>
                    <h3 id="2-markdown-format-nda-haz-rlama">2. Markdown Formatında Hazırlama</h3>
                    <p>Eğer markdown formatında yazmayı tercih ederseniz:</p>
                    <ol>
                        <li>Yazınızı markdown formatında hazırlayın<ul>
                            <li>Markdown hakkında bilgi almak için <a href="https://www.markdownguide.org/">Markdown Guide</a> sayfasını ziyaret edebilirsiniz.</li>
                            <li>Yazım kurallarına dikkat edin.</li>
                            <li>Yazınızın başlığı, alt başlıkları ve paragrafları açık ve anlaşılır olmalıdır.</li>
                            <li>Yazının sonunda kaynaklarınızı belirtin (varsa).</li>
                        </ul>
                        </li>
                        <li><code>blog</code> klasörü altında yeni bir klasör oluşturun (klasör adı formatı: <code>YYYY-MM-DD-yazinizin-basligi</code>)</li>
                        <li>Klasörün içine <code>index.md</code> dosyası oluşturun</li>
                        <li><p>Yazınızın başına aşağıdaki metadatayı ekleyin:</p>
                            <pre><code class="lang-markdown"><span class="hljs-meta">---</span>
                                <span class="hljs-attr">slug:</span> yasinizin-url-adresi
                                <span class="hljs-attr">title:</span> Yazınızın Başlığı
                                <span class="hljs-attr">authors:</span> [kullanici-adiniz]
                                <span class="hljs-attr">tags:</span> [etiket1, etiket2]
                                <span class="hljs-meta">---</span>
                            </code></pre>
                        </li>
                        <li><p><code>blog/authors.yml</code> dosyasına yazar bilgilerinizi ekleyin:</p>
                            <pre><code class="lang-yaml"><span class="hljs-attribute">kullanici-adiniz</span>:
                                <span class="hljs-attribute">name</span>: İsim Soyisim
                                <span class="hljs-attribute">title</span>: Unvanınız/Rolünüz (ö<span class="hljs-attribute">rn</span>: İstatistik Bölümü Öğrencisi)
                                <span class="hljs-attribute">url</span>: <span class="hljs-attribute">https</span>:<span class="hljs-comment">//github.com/github-kullanici-adiniz</span>
                                <span class="hljs-attribute">image_url</span>: /img/authors/kullanici-adiniz.jpg
                            </code></pre>
                        </li>
                    </ol>
                    <h2 id="kod-katk-s-">Kod Katkısı</h2>
                    <p>Web sitesinin koduna katkıda bulunmak istiyorsanız, standart GitHub iş akışını takip etmelisiniz:</p>
                    <ol>
                        <li>Öncelikle <a href="https://github.com/ticaretistatistik/ticaretistatistik.github.io/issues">issues</a> sayfasını kontrol edin</li>
                        <li>Yapmak istediğiniz değişiklik için yeni bir issue açın<ul>
                            <li>Değişikliğin amacını açıklayın</li>
                            <li>Nasıl implemente edeceğinizi kısaca anlatın</li>
                        </ul>
                        </li>
                        <li>Issue üzerinde geri bildirim alın</li>
                        <li>Repository&#39;yi forklayın</li>
                        <li>Değişikliklerinizi yapın</li>
                        <li>Pull Request açın<ul>
                            <li>PR açarken ilgili issue&#39;yu referans gösterin (#issue-number)</li>
                            <li>Değişikliklerinizi detaylı bir şekilde açıklayın</li>
                        </ul>
                        </li>
                    </ol>
                    <h3 id="geli-tirme-ortam-">Geliştirme Ortamı</h3>
                    <p>Lokal geliştirme ortamını kurmak için:</p>
                    <ol>
                        <li><p>Repository&#39;yi klonlayın:</p>
                            <pre><code class="lang-shell">git clone git@github<span class="hljs-selector-class">.com</span>:ticaretistatistik/ticaretistatistik<span class="hljs-selector-class">.github</span><span class="hljs-selector-class">.io</span><span class="hljs-selector-class">.git</span>
                            </code></pre>
                        </li>
                        <li><p>Bağımlılıkları yükleyin:</p>
                            <pre><code class="lang-shell">cd ticaretistatistik<span class="hljs-selector-class">.github</span><span class="hljs-selector-class">.io</span>
                                npm install
                            </code></pre>
                        </li>
                        <li><p>Geliştirme sunucusunu başlatın:</p>
                            <pre><code class="lang-shell"><span class="hljs-built_in">npm</span> start
                            </code></pre>
                        </li>
                    </ol>
                    <h2 id="yard-m-ve-i-leti-im">Yardım ve İletişim</h2>
                    <p>Herhangi bir sorunuz olursa <a href="https://github.com/ticaretistatistik/ticaretistatistik.github.io/issues">issues</a> sayfasında yeni bir issue açabilirsiniz.</p>

                </div>
            </div>
        </Layout>
    );
}