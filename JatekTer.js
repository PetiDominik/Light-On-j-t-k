import Lampa from "./Lampa.js";

class JatekTer {
    #db;
    #allapotLista = [];
    #meret;
    #lepes;
    constructor() {
        this.#init();
    }

    #setAllapotLista() {
        this.#allapotLista = [];
        for (let i = 0; i < (this.#meret * this.#meret); i++) {
            this.#allapotLista.push(this.#randomTrueFalse())
        }
    }
    
    #szomszedokKeresese(id) {
        
    }
    
    #init() {
        this.#lepes = 0;
        this.#meret = 3;
        this.#setAllapotLista();
        const EGO_SZAMLALO = $("#lekapcsoltak");
        
        EGO_SZAMLALO.html(this.#ellenorzes());
        
        const SZULO = $("#mezok");
        SZULO.html("");
        for (let i = 0; i < this.#allapotLista.length; i++) {
            new Lampa(i, this.#allapotLista[i], SZULO);
        }
        
        $(window).on("kapcsolas", (t) => {
            const LAMPA = t.detail;
            LAMPA.setAllapot();
            this.#allapotLista[LAMPA.getId()] = !this.#allapotLista[LAMPA.getId()];
            EGO_SZAMLALO.html(this.#ellenorzes());
        });

        const GOMB = $("#ujJatek");
        GOMB.on("click", () => {
            GOMB.off("click");
            this.#init();
        });
    }

    #ellenorzes() {
        let db = 0;
        this.#allapotLista.forEach(allapot => {
            db += allapot ? 1 : 0;
        });
        return db;
    }

    #randomTrueFalse() {
        return Math.floor((Math.random() * 5) + 1) == 4;
    }
}

export default JatekTer;