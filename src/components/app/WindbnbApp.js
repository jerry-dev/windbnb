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
        this.script();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <property-listing-menu></property-listing-menu>
            <properties-listing></properties-listing>
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

                :host {
                    position: relative;
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr, repeat() 1fr
                }
            </style>
        `;
    }

    script() {
        this.menuEvents();
    }

    menuEvents() {
        this.menuContainerExpand();
        this.menuContainerCollapse();
    }

    menuContainerExpand() {
        const propertyListingMenu = this.shadowRoot.querySelector('property-listing-menu');
        const searchMenu = this.shadowRoot.querySelector('property-listing-menu').shadowRoot.querySelector('search-menu');

        propertyListingMenu.shadowRoot.addEventListener('click', (event) => {
            if (event.target === searchMenu) {
                searchMenu.classList.add('expanded');
                searchMenu.shadowRoot.querySelector('#locationSelect label').style.display = 'block';
            }
        });
    }

    menuContainerCollapse() {
        const propertyListingMenu = this.shadowRoot.querySelector('property-listing-menu');
        const searchMenu = this.shadowRoot.querySelector('property-listing-menu').shadowRoot.querySelector('search-menu');

        this.shadowRoot.addEventListener('click', (event) => {
            if (event.target !== propertyListingMenu) {
                searchMenu.classList.remove('expanded');
                searchMenu.shadowRoot.querySelector('#locationSelect label').style.display = 'none';
            }
        });
    }
}

if (!customElements.get('windbnb-app')) {
    customElements.define('windbnb-app', WindbnbApp);
}