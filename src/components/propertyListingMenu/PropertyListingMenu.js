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
            <h1>Loaded</h1>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::brefore, *::after {
                    padding: 0;
                    margin: 0;
                }

                :host {
                    padding-top: 32px;
                }
            </stlye>
        `;
    }

}

if (!customElements.get('property-listing-menu')) {
    customElements.define('property-listing-menu', PropertyListingMenu);
}
