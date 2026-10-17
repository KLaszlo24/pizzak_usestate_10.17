import { useState } from "react";

type Pizza = {
    nev: string;
    feltetek: string;
    meret: string;
    ar: number;
    kaloria: number;
};

export function Pizzak() {
    const [pizzak, setPizzak] = useState<Pizza[]>([
        { nev: "Margherita", feltetek: "Paradicsomszósz, mozzarella, bazsalikom", meret: "32 cm", ar: 2490, kaloria: 780 },
        { nev: "Pepperoni", feltetek: "Paradicsomszósz, mozzarella, pepperoni", meret: "32 cm", ar: 2990, kaloria: 920 },
        { nev: "Hawaii", feltetek: "Paradicsomszósz, mozzarella, sonka, ananász", meret: "32 cm", ar: 3190, kaloria: 860 },
        { nev: "Négysajtos", feltetek: "Mozzarella, gorgonzola, parmezán, cheddar", meret: "32 cm", ar: 3390, kaloria: 980 },
        { nev: "Vegetáriánus", feltetek: "Paradicsomszósz, mozzarella, paprika, gomba, olívabogyó", meret: "32 cm", ar: 2990, kaloria: 810 }
    ]);

    const [kereso, setKereso] = useState("");
    const [nev, setNev] = useState("");
    const [feltetek, setFeltetek] = useState("");
    const [meret, setMeret] = useState("");
    const [ar, setAr] = useState("");
    const [kaloria, setKaloria] = useState("");
    const [hiba, setHiba] = useState("");
    const [csokkeno, setCsokkeno] = useState(true);

    function hozzaad() {
        if (nev === "" || feltetek === "" || meret === "" || ar === "" || kaloria === "") {
            setHiba("Minden mezőt ki kell tölteni");
            return;
        }

        if (Number(ar) <= 0 || Number(kaloria) <= 0) {
            setHiba("Nem lehet 0 vagy - érték az Ár vagy Kalória");
            return;
        }

        const ujPizzak: Pizza = {
            nev: nev,
            feltetek: feltetek,
            meret: meret,
            ar: Number(ar),
            kaloria: Number(kaloria)
        };

        setPizzak([...pizzak, ujPizzak]);

        setNev("");
        setFeltetek("");
        setMeret("");
        setAr("");
        setKaloria("");
        setHiba("");
    }

    const szurtPizzak = pizzak
        .filter(p => p.nev.toLowerCase().includes(kereso.toLowerCase()))
        .sort((a, b) => {
            if (csokkeno) {
                return b.nev.localeCompare(a.nev);
            }
            return a.nev.localeCompare(b.nev);
        });

    return (//formázás chatgpt :(
        <main className="container py-4" style={{ backgroundColor: "#e6952b", minHeight: "100vh" }}>
            <header
                className="rounded-4 p-4 mb-4 text-white"
                style={{ background: "linear-gradient(120deg, #b83220, #f07832)" }}
            >
                <h1 className="mb-1">🍕 Pizzakínálat</h1>
                <p className="mb-0">Találd meg a kedvenced, vagy állíts össze egy újat!</p>
            </header>

            <section className="bg-white rounded-4 shadow-sm p-4 mb-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                    <h2 style={{color: 'black'}} className="h4 mb-0">Étlap</h2>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => setCsokkeno(!csokkeno)}
                    >
                        Név szerint: {csokkeno ? "Z–A" : "A–Z"}
                    </button>
                </div>

                <input
                    className="form-control mb-4"
                    placeholder="Keress pizzanévre..."
                    value={kereso}
                    onChange={e => setKereso(e.target.value)}
                />

                <div className="row g-3">
                    {szurtPizzak.map((pizza, i) => (
                        <div className="col-sm-6 col-lg-4" key={`${pizza.nev}-${i}`}>
                            <article
                                className="h-100 rounded-4 p-3"
                                style={{ backgroundColor: "#e78524", border: "1px solid #f4d4b8" }}
                            >
                                <h3 className="h5 text-danger">{pizza.nev}</h3>
                                <p className="text-secondary mb-3">{pizza.feltetek}</p>
                                <div className="d-flex justify-content-between">
                                    <span>{pizza.meret}</span>
                                    <strong>{pizza.ar.toLocaleString("hu-HU")} Ft</strong>
                                </div>
                                <small className="text-muted">{pizza.kaloria} kcal</small>
                            </article>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-4 p-4" style={{ backgroundColor: "#fce2cc" }}>
                <h2 className="h4 mb-3">➕ Új pizza felvétele</h2>

                <div className="row g-2">
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            placeholder="Pizza neve"
                            value={nev}
                            onChange={e => setNev(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            placeholder="Feltétek"
                            value={feltetek}
                            onChange={e => setFeltetek(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            placeholder="Méret (pl. 32 cm)"
                            value={meret}
                            onChange={e => setMeret(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            type="number"
                            placeholder="Ár (Ft)"
                            value={ar}
                            onChange={e => setAr(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            type="number"
                            placeholder="Kalória"
                            value={kaloria}
                            onChange={e => setKaloria(e.target.value)}
                        />
                    </div>
                </div>

                {hiba !== "" && <p className="text-danger mt-3 mb-0">{hiba}</p>}

                <button className="btn btn-danger mt-3" onClick={hozzaad}>
                    Pizza hozzáadása
                </button>
            </section>
        </main>
    );
}