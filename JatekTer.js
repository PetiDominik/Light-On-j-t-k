import Lampa from "./Lampa.js";

class JatekTer {
    #db;
    #allapotLista = [];
    #lampak = [];
    #meret;
    #lepes;
    constructor() {
        this.#init();

        $(window).on("kapcsolas", (t) => {
            const LAMPA = t.detail;
            let id = LAMPA.getId("id");
            this.#szomszedokKeresese(id);

            const LEKAPCSOLTAK = this.#ellenorzes();
            $("#lekapcsoltak").html(LEKAPCSOLTAK);
            if (LEKAPCSOLTAK >= this.#allapotLista.length) {
                setTimeout(() => {
                    alert(`Ügyes vagy!\nLépések száma: ${this.#lepes}`);

                    this.#init();
                }, 100);
            }
            this.#lepes++;
        });
    }

    #setAllapotLista() {
        this.#allapotLista = [];
        for (let i = 0; i < (this.#meret * this.#meret); i++) {
            this.#allapotLista.push(this.#randomTrueFalse())
        }
    }
    
    #szomszedokKeresese(id) {
        let balSzelek = [3];
        let jobbSzelek = [2, 5, 8];
        const OFFSETS = [0, -1, 1, -this.#meret, this.#meret];
        OFFSETS.forEach(offset => {
            let aktId = id + offset; 
            if (aktId >= 0 && aktId < this.#allapotLista.length) {

                this.#lampak[aktId].setAllapot();
                this.#lampak[aktId].getId();
                this.#allapotLista[aktId] = !this.#allapotLista[aktId];

            }
        });
    }
    
    #init() {
        this.#lampak = [];
        this.#lepes = 0;
        this.#meret = 3;
        this.#db = 0;
        this.#setAllapotLista();
        const EGO_SZAMLALO = $("#lekapcsoltak");
        
        EGO_SZAMLALO.html(this.#ellenorzes());
        
        const SZULO = $("#mezok");
        SZULO.html("");

        for (let i = 0; i < this.#allapotLista.length; i++) {
            this.#lampak.push(new Lampa(i, this.#allapotLista[i], SZULO));
        }

        const GOMB = $("#ujJatek");
        GOMB.on("click", () => {
            GOMB.off("click");
            this.#init();
        });
    }

    #ellenorzes() {
        let db = 0;
        this.#allapotLista.forEach(allapot => {
            db += allapot ? 0 : 1;
        });
        return db;
    }

    #randomTrueFalse() {
        return Math.floor((Math.random() * 5) + 1) == 4;
    }
}

export default JatekTer;