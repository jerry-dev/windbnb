export default class PropertiesListing extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.css();
    }

    html() {
        let html = ``;
        for (let i = 0; i < 6; i++) {
            html += this.template();
        }

        this.shadowRoot.innerHTML += html;
    }

    css() {
        this.shadowRoot.innerHTML += `
        <style>
            *, *::before, *::after {
                padding: 0;
                margin: 0;
            }

            :host {
                display: grid;
                grid-template-columns: repeat(3, minmax(197.5px, 395px));
                grid-gap: 34px;
            }

            .listing {
                grid-column: span 1;
            }

            .listing img {
                min-width: 100%;
                height: 269px;
                border-radius: 25px;
            }

            .listing ul {
                display: flex;
                justify-content: space-between;
                list-style: none;
            }
        </style>
        `;
    }

    template() {
        return `
        <article class="listing">
            <img src="https://picsum.photos/200/300">
            <div>
                <ul><li>A</li><li>B</li><li>C</li></ul>
                <p>Placeholder text</p>
            </div>
        </article>
        `;
    }
}

if (!customElements.get('properties-listing')) {
    customElements.define('properties-listing', PropertiesListing);
}