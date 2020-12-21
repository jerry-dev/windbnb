export default class windbnbLogo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.css();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <img src="../src/assets/icons/logo.svg">
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {
                    padding: 0;
                    margin: 0;
                }
                :host {
                    grid-column: 1;
                    width: 96px;
                    height: 18.75px;
                }
            </style>
        `;
    }
}

if (!customElements.get('windbnb-logo')) {
    customElements.define('windbnb-logo', windbnbLogo);
}