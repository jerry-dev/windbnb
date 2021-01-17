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
        this.mobileCSS();
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
                    grid-row: 1;
                    width: 96px;
                    height: 18.75px;
                    z-index: 6;
                }
            </style>
        `;
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
        <style>
            @media (max-width: 575.98px) {
                :host {
                    height: 18.75px;
                    margin-bottom: 39px;
                }
            }
        </style>
        `;
    }
}

if (!customElements.get('windbnb-logo')) {
    customElements.define('windbnb-logo', windbnbLogo);
}