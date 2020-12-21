import PropertyListingMenu from '../propertyListingMenu/PropertyListingMenu.js';
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
            <property-listing-menu>
            </property-listing-menu>
            <main>
                <properties-listing>
                </properties-listing>
            </main>
            <h1>Footer Goes Here</h1>
        `;
    }
    
    css() {
        this.shadowRoot.innerHTML += `
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