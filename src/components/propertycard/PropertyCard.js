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
    }
533
    css() {
        this.shadowRoot.innerHTML += `
        <style>
            *, *::before, *::after {
                padding: 0;
                margin: 0;
            }

            .listing > figure {
                width: 100%;
                margin-bottom: 15px;
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

    // template() {
    //     this.shadowRoot.innerHTML += `
    //         <article class="listing">
    //             <figure>
    //                 <div class="img" style="background-image: url(${this.getAttribute('imageSrc')})"></div>
    //             </figure>
    //             <div>
    //                 <ul>
    //                     ${this.superHost(this.getAttribute('hostStatus'))}
    //                     ${this.propertyType(this.getAttribute('propertyType'))}
    //                     ${this.ratings(this.getAttribute('ratings'))}
    //                 </ul>
    //                 <h3>${this.getAttribute('title')}</h3>
    //             </div>
    //         </article>
    //     `;
    // }

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