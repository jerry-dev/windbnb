import PropertiesListing from '../propertiesListing/PropertiesListing.js';

class WindbnbApp extends HTMLElement {
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
        this.shadowRoot.innerHTML += `
            <main>
            <h1>Outside the properties listing</h1>
                <properties-listing>
                </properties-listing>
            </main>
        `;
    }
    
    css() {
        this.shadowRoot.querySelector('main').innerHTML += `
            <style>
                *, *::before, *::after {
                    padding: 0;
                    margin: 0;
                }
            </style>
        `;
    }
}

if (!customElements.get('windbnb-app')) {
    customElements.define('windbnb-app', WindbnbApp);
}