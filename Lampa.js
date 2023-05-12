class Lampa {
    #allapot;
    #id;
    #divElem;
    constructor(id, allapot, szuloElem) {
        this.#id = id;
        this.#allapot = allapot;
        szuloElem.append(`<div class="mezo"></div>`)
        this.#divElem = szuloElem.children("div:last-child");

        this.#szinBeallit();

        this.#divElem.on("click", () => {
            this.#kattintasTrigger();
        });
    }

    getId() {
        return this.#id;
    }

    setAllapot() {
        this.#allapot = !this.#allapot;
        this.#szinBeallit();
    }

    #szinBeallit() {
        if (this.#allapot) {
            this.#divElem.css("background-color", "green")
        } else {
            this.#divElem.css("background-color", "orange")
        }
    }

    #kattintasTrigger() {
        const EVENT = new CustomEvent("kapcsolas", {
            detail : this,
        });
        window.dispatchEvent(EVENT);
    }
}

export default Lampa;