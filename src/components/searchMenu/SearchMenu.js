export default class SearchMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
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
            <form>
                <label for"locationSelect">Location</label>
                <select id="locationSelect" name="locationSelect" placeholder="Add location">
                    <option>Helsinki, Finland</option>
                    <option>Turku, Finland</option>
                    <option>Oulu, Finland</option>
                    <option>Vaasa, Finland</option>
                </select>
                <label for"numberOfGuests">Guests</label>
                <input type="text" id="numberOfGuests" name="numberOfGuests" placeholder="Add guests">
                <span id="search">
                    <img src="../src/assets/icons/icons8-search-24.png">
                </span>
            </form>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {
                    padding: 0;
                    margin: 0;
                    border: none;
                }

                :host {
                    grid-column: -1;
                }

                form {
                    display: flex;
                    flex-direction: row;
                    height: 55px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-radius: 16px;
                    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
                }

                select {
                    border-radius: 16px 0px 0px 16px;
                    appearance: none;
                }

                label {
                    display: none;
                }

                input::placeholder {
                    color: var(--grey-1);
                }
                
                #numberOfGuests {
                    width: 106px;
                }

                #locationSelect, #numberOfGuests {
                    padding-top: 19px;
                    padding-right: 16px;
                    padding-bottom: 18px;
                    padding-left: 16px;
                    text-align: center;
                    font-size: var(--font-size-5);
                    color: var(--grey-5);
                }

                #locationSelect {
                    border-right: 1px solid #F2F2F2;
                }

                #search {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-left: 1px solid #F2F2F2;
                    display: flex;
                    width: 53px;
                }
            </style>
        `;
    }
}

if (!customElements.get('search-menu')) {
    customElements.define('search-menu', SearchMenu);
}