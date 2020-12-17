import listingData from '../../data/listingData.js';


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
            const listingData = await this.propertyData();
            const html = this.hydrate(listingData, 6);
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
                display: grid;
                grid-template-columns: repeat(3, minmax(197.5px, 395px));
                grid-column-gap: 34px;
                grid-row-gap: 50px;
            }

            .listing {
                grid-column: span 1;
            }

            .listing img {
                width: 100%;
                height: 269px;
                border-radius: 25px;
                margin-bottom: 15px;
            }

            .listing ul {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                list-style: none;
                height: 28px;
                margin-bottom: 19px;
            }

            .superHost {
                padding-top: 7px;
                padding-right: 9px;
                padding-bottom: 6px;
                padding-left: 10px;
                margin-right: 11px;
                border: 1px solid black;
                border-radius: 25px;
                font-size: var(--font-size-4);
                line-height: 15px;
                font-weight: bold;
            }

            .rating {
                display: flex;
                height: 15.88px;
                justify-self: end;
                font-size: var(--font-size-5);
                margin-left: auto;
            }

            .rating > img {
                width: 15.76px;
                height: 15.88px;
                margin-right: 7.12px;
            }

            h3 {
                font-size: var(--font-size-6);
            }
        </style>
        `;
    }

    async propertyData() {
        return (await import('../../data/listingData.js')).default;
    }

    hydrate(listingData, limit = 6) {
        let html = ``;
        for (let i = 0; i < limit; i++) {
            html += this.card(i+1, listingData[i]);
        }
        return html;
    }

    // Method for the property card component
    card(id, data) {
        const superHost = (status) => {
            if (status) {
                return `<li><span class="superHost">SUPER HOST</span><li>`;
            } else {
                return ``;
            }
        } 

        const propertyType = (type) => {
            return `<li class="propertyType">${type} ${numberOfBeds(data.beds)}<li>`;
        }

        const numberOfBeds = (beds) => {
            if (beds) {
                return `<span class="bedrooms">. ${beds} beds<span>`;
            } else {
                return ``;
            }
        }
        const ratings = (rating) => {
            return `<li class="rating"><img src="../../src/assets/icons/red-star-1.svg"><span class="ratingValue">${rating}</span><li>`;
        }

        return `
        <article id="listing-${id}" class="listing">
            <img src="${data.photo}">
            <div>
                <ul>
                    ${superHost(data.superHost)}
                    ${propertyType(data.type)}
                    ${ratings(data.rating)}
                </ul>
                <h3>${data.title}</h3>
            </div>
        </article>
        `;
    }
}

if (!customElements.get('properties-listing')) {
    customElements.define('properties-listing', PropertiesListing);
}