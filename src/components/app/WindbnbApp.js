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
            <properties-listing location></properties-listing>
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
        this.searchMenuState();
        this.selectClickedLocation();
        this.filterLocationOnInput();
        this.attachSelectionToAttribute();
        this.search();
    }

    attachSelectionToAttribute() {
        let selectedLocation = this.shadowRoot.querySelector('property-listing-menu')
        .shadowRoot.querySelector('search-menu')
        .shadowRoot.querySelector('form > #locationSelect > input').value;

        this.shadowRoot.querySelector('properties-listing').setAttribute('location', selectedLocation);
    }

    searchMenuState() {
        const propertyListingMenu = this.shadowRoot.querySelector('property-listing-menu');
        const searchMenu = this.shadowRoot.querySelector('property-listing-menu').shadowRoot.querySelector('search-menu');

        propertyListingMenu.shadowRoot.addEventListener('click', (event) => {
            if (event.target === searchMenu && !searchMenu.classList.contains('expanded')) {
                searchMenu.classList.add('expanded');
            }
        });

        this.shadowRoot.addEventListener('click', (event) => {
            if (event.target !== propertyListingMenu && searchMenu.classList.contains('expanded')) {
                console.log(event.target);
                searchMenu.classList.remove('expanded');
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && searchMenu.classList.contains('expanded')) {
                searchMenu.classList.remove('expanded');
            }
        });

        window.addEventListener('click', (event) => {
            console.log(event.target);
            if (event.target !== this && searchMenu.classList.contains('expanded')) {
                searchMenu.classList.remove('expanded');
            }
        });
    }

    selectClickedLocation() {
        const locationList = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
                .querySelector('form > #locationSelect > #locationOptions');
        
        const locationSelectInput = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
                .querySelector('form > #locationSelect > input');

        locationList.addEventListener('click', (event) => {
            if (event.target.getAttribute('value')) {
                const clickedLocation = event.target.getAttribute('value');
                locationSelectInput.value = clickedLocation;
            }
        });
    }

    filterLocationOnInput() {
        const locationSelectInput = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
                .querySelector('form > #locationSelect > input');

        const locationList = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
                .querySelector('form > #locationSelect > #locationOptions');

        locationSelectInput.addEventListener('input', () => {
            let selectedLocation = locationSelectInput.value.toLowerCase();
            let locationOptions = locationList.children;
            for (let i = 0; i < locationOptions.length; i++) {
                let option = locationOptions[i].getAttribute('value').toLowerCase();
                if (!option.includes(selectedLocation)) {
                    locationOptions[i].style.display = "none";
                } else {
                    locationOptions[i].style.display = "block";
                }
            }
        });
    }

    search() {
        const searchButton = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #search');

        searchButton.addEventListener('click', (event) => {
            console.log(event.target);
            this.attachSelectionToAttribute();
            this.shadowRoot.querySelector('properties-listing').refresh();
        });
    }
}

if (!customElements.get('windbnb-app')) {
    customElements.define('windbnb-app', WindbnbApp);
}