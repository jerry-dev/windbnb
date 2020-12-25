import PropertyCard from '../propertycard/PropertyCard.js';

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

    async html() {
        try {
            const listingData = await this.propertyDataFetch();
            const html = this.hydrate(listingData);
            this.shadowRoot.innerHTML += html;
        } catch(error) {
            console.log(`An error took place when generating the markup.`, error.message);
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

    async propertyDataFetch() {
        return (await import('../../data/listingData.js')).default;
    }

    hydrate(listingData, city = "Helsinki") {
        let html = ``;
        for (let i = 0; i < listingData.length; i++) {
            if (listingData[i].city === city) {
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
            } else {
                continue;
            }
        }
        return html;
    }
}

if (!customElements.get('properties-listing')) {
    customElements.define('properties-listing', PropertiesListing);
}