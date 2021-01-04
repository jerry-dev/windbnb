import PropertyCard from '../propertycard/PropertyCard.js';

export default class PropertiesListing extends HTMLElement {
    static get observedAttributes() {
        return ['location'];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.getAttribute(attrName);
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.css();
    }

    async html() {
        try {
            const listingData = await this.propertyDataFetch(this.getAttribute('location'));
            const html = this.hydrate(listingData);
            this.shadowRoot.innerHTML += html;
        } catch(error) {
            console.log(`An error took @ properties-listing > html():`, error.message);
        }
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
                z-index: 5;
                display: grid;
                grid-template-columns: repeat(3, minmax(197.5px, 395px));
                grid-column-gap: 34px;
                grid-row-gap: 50px;
            }
        </style>
        `;
    }

    async propertyDataFetch(location) {
        console.log(location);
            if (location) {
                let data = (await import('../../data/listingData.js')).default;
                let filteredContainer = [];
                for (let i = 0; i < data.length; i++) {
                    let propertyLocation = `${data[i].city}, ${data[i].country}`;
                    if (propertyLocation === location) {
                        filteredContainer[filteredContainer.length] = data[i];
                    }
                }
                return filteredContainer;
            } else {
                return (await import('../../data/listingData.js')).default;
            }
    }


    hydrate(listingData) {
        let html = ``;
        for (let i = 0; i < listingData.length; i++) {
                html += `
                    <property-card id="listing-${i+1}"
                        imageSrc="${listingData[i].photo}"
                        title="${listingData[i].title}"
                        hostStatus="${listingData[i].superHost}"
                        propertyType="${listingData[i].type}"
                        rooms="${listingData[i].beds}"
                        ratings="${listingData[i].rating}"
                    >
                    </property-card>`;
        }
        return html;
    }

    refresh() {
        this.shadowRoot.innerHTML =``;
        this.render();
    }
}

if (!customElements.get('properties-listing')) {
    customElements.define('properties-listing', PropertiesListing);
}