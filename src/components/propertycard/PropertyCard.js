export default class PropertyCard extends HTMLElement {
    static get observedAttributes() {
        return ['imageSrc, title, hostStatus, propertyType, rooms, ratings']
    }
    
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (newValue !== oldValue) {
			this[attrName] = this.hasAttribute(attrName);
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.template();
        this.css();
        this.mobileCSS();
    }

    css() {
        this.shadowRoot.innerHTML += `
        <style>
            *, *::before, *::after {
                padding: 0;
                margin: 0;
            }

            .listing > figure {
                width: 100%;
                margin-bottom: 21px;
                overflow: hidden;
            }

            .listing > figure > img {
                object-fit: fill;
                border-radius: 25px;
                height: 100%;
                max-height: 275px;
                width: 100%;
                display: block;
            }

            .listing > div {
                max-height: 75px;
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

            .propertyType {
                font-size: var(--font-size-5);
                color: var(--grey-3);
            }

            .rating {
                display: flex;
                height: 15.88px;
                font-size: var(--font-size-5);
                color: var(--grey-4);
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

    mobileCSS() {
        this.shadowRoot.innerHTML += `
        <style>
            @media (max-width: 575.98px) {
                .listing > figure {
                    height: 238.35px;
                    margin-bottom: 13.29px;
                }

                .listing > div {
                    height: 78.58px;
                }

                .superHost {
                    font-size: var(--font-size-2);
                    padding-top: 6.2px;
                    padding-right: 7.97px;
                    padding-bottom: 5.32px;
                    padding-left: 8.86px;
                    margin-right: 9.75px;
                }

                .listing ul {
                    margin-bottom: 15.97px;
                }

                .propertyType,
                .rating {
                    font-size: var(--font-size-4);
                }

                .rating > img {
                    margin-right: 6.31px;
                }

                h3 {
                    font-size: var(--font-size-5);
                }
            }
        </style>
        `;
    }

    template() {
        this.shadowRoot.innerHTML += `
            <article class="listing">
                <figure>
                    <img src="${this.getAttribute('imageSrc')}">
                </figure>
                <div>
                    <ul>
                        ${this.superHost(this.getAttribute('hostStatus'))}
                        ${this.propertyType(this.getAttribute('propertyType'))}
                        ${this.ratings(this.getAttribute('ratings'))}
                    </ul>
                    <h3>${this.getAttribute('title')}</h3>
                </div>
            </article>
        `;
    }

    superHost(status) {
        if (status === 'true') {
            return `<li><span class="superHost">SUPER HOST</span><li>`;
        } else {
            return ``;
        }
    } 

    propertyType(type) {
        if (type) {
            return `<li class="propertyType">${type} ${this.numberOfBeds(this.getAttribute('rooms'))}</li>`;
        } else {
            return ``;
        }
    }

    numberOfBeds(beds) {
        if (beds === 'null') {
            return ``;
        } else {
            return `<span class="bedrooms">. ${beds} beds<span>`;
        }
    }

    ratings(rating) {
        return `
            <li class="rating">
                <img src="../../src/assets/icons/red-star-1.svg">
                <span class="ratingValue">${rating}</span>
            <li>`;
    }
}

if (!customElements.get('property-card')) {
    customElements.define('property-card', PropertyCard);
}