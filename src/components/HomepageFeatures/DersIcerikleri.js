export default function IstatistikNedir() {
    return (
        <section className="margin-top--lg padding--lg bg--light">
            <div className="container">
                <h2 className="text--center">Neler Öğreneceksiniz?</h2>
                <div className="row">
                    {[
                        "Regresyon Analizi",
                        "Python ile Veri Bilimi",
                        "Makine Öğrenmesi",
                        "SPSS ve R Uygulamaları",
                    ].map((title, i) => (
                        <div className="col col--3" key={i}>
                            <div className="card">
                                <div className="card__body text--center">
                                    <h4>{title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}