import SearchMenu from '../searchMenu/SearchMenu.js';

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
            <search-menu></search-menu>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::brefore, *::after {
                    padding: 0;
                    margin: 0;
                }

                :host {.
                    width: 100%;
                    display: flex;
                    padding-top: 32px;
                    padding-bottom: 32px;
                    outline: 1px solid rgba(0, 0, 0, 0.1);
                }
            </stlye>
        `;
    }

}

if (!customElements.get('property-listing-menu')) {
    customElements.define('property-listing-menu', PropertyListingMenu);
}
