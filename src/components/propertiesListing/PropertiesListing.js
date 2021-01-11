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
        this.render()
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
            this.shadowRoot.innerHTML += `<span id="overlay"></span>`;
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
                grid-template-columns: repeat(3, minmax(79px, 395px));
                grid-column-gap: 34px;
                grid-row-gap: 50px;
            }

            .block {
                background-color: lightblue;
                OUTLINE: 3PX SOLID BLACK;
                position: relative;
            }

            .block::before {
                content: "";
                padding-top: 100%;
                display: block;
            }

            property-card {
                OUTLINE: 2PX SOLID RED;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
            }

            :host > #overlay.activated {
                z-index: 199;
                background-color: lightblue;
                position: fixed;
                left: 0;
                right: 0;
                background-color: var(--opaque-grey-1);
                width: 100vw;
                height: 100vh;
            }
        </style>
        `;
    }

    async propertyDataFetch(location) {
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
                <div class="block">
                    <property-card id="listing-${i+1}"
                        imageSrc="${listingData[i].photo}"
                        title="${listingData[i].title}"
                        hostStatus="${listingData[i].superHost}"
                        propertyType="${listingData[i].type}"
                        rooms="${listingData[i].beds}"
                        ratings="${listingData[i].rating}"
                    >
                    </property-card>
                </div>
                `;
        }
        return html;
    }

    refresh() {
        this.shadowRoot.innerHTML =``;
        this.render();
    }
}

window.customElements.whenDefined('windbnb-app').then(() => {
    if (!window.customElements.get('properties-listing')) {
        window.customElements.define('properties-listing', PropertiesListing);
    }
});