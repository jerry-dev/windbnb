import SearchMenu from '../searchMenu/SearchMenu.js';
import windbnbLogo from '../windbnbLogo/WindbnbLogo.js';

export default class PropertyListingMenu extends HTMLElement {
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
            <div id="propertyListingMenuContainer">
                <windbnb-logo></windbnb-logo>
                <search-menu></search-menu>
            </div>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                    z-index: 50;
                    position: relative;
                    height: 148px;
                }

                #propertyListingMenuContainer {
                    width: 100%;
                    padding-top: 32px;
                    display: grid;
                    grid-template-columns: repeat(3, minmax(79px, 395px));
                    grid-column-gap: 34px;
                    grid-row-gap: 50px;
                }
            </stlye>
        `;
    }
}

if (!customElements.get('property-listing-menu')) {
    customElements.define('property-listing-menu', PropertyListingMenu);
}
