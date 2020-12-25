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
        this.scripts();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <form>
                <span id="locationSelect" class="inputContainer">
                    <label for"locationSelect">Location</label>
                    <input type="text" name="locationSelect" value="Helsinki, Finland" placeholder="Add location">
                    <ul id="locationOptions">
                        <li value="Helsinki, Finland">
                            <span><img src="../src/assets/icons/location-pin-svgrepo-com.svg" class="pin"></span>
                            Helsinki, Finland
                        </li>
                        <li value="Turku, Finland">
                            <span><img src="../src/assets/icons/location-pin-svgrepo-com.svg" class="pin"></span>
                            Turku, Finland
                        </li>
                        <li value="Oulu, Finland">
                            <span><img src="../src/assets/icons/location-pin-svgrepo-com.svg" class="pin"></span>
                            Oulu, Finland
                        </li>
                        <li value="Vaasa, Finland">
                            <span><img src="../src/assets/icons/location-pin-svgrepo-com.svg" class="pin"></span>
                            Vaasa, Finland
                        </li>
                    </ul>
                </span>
                
                <span id="numberOfGuests" class="inputContainer">
                    <label for"numberOfGuests">Guests</label>
                    <input type="text name="numberOfGuests" placeholder="Add guests" disabled>
                </span>

                <span id="search" class="inputContainer">
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
                    grid-row: 1;
                    background-color: white;
                }

                :host(.expanded) {
                    height: 460px;
                    padding-top: 61px;
                    z-index: 200;
                    background-color: white;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                }

                form {
                    max-width: 1253px;
                    margin-left: auto;
                    margin-right: auto;
                    display: flex;
                    flex-direction: row;
                    height: 55px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-radius: 16px;
                    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
                }

                .inputContainer {
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                }

                label {
                    display: none;
                    font-weight: 800;
                    font-size: var(--font-size-1);
                    color: var(--grey-5);
                    text-align: start;
                    margin-bottom: 4px;
                }

                input {
                    position: relative;
                    font-size: var(--font-size-5);
                    color: var(--grey-5);
                    outline: none;
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
                    padding-bottom: 10px;
                    padding-left: 16px;
                    text-align: center;
                    font-size: var(--font-size-5);
                    color: var(--grey-5);
                }

                #locationSelect {
                    border-right: 1px solid #F2F2F2;
                }

                #locationOptions {
                    padding: 0;
                    position: relative;
                    top: 52px;
                    z-index: 10;
                    list-style: none;
                }

                #locationOptions li {
                    display: none;
                }

                #locationSelect input:focus ~ #locationOptions li {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 36px;
                }

                #locationOptions > li:not(:last-child) {
                    margin-bottom: 36px;
                }

                #locationOptions img {
                    width: 14px;
                    height: 19.47px;
                    margin-right: 10px;
                }

                #search {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-left: 1px solid #F2F2F2;
                    width: 53px;
                }


                :host(.expanded) form > #locationSelect, :host(.expanded) form > #numberOfGuests {
                    padding-top: 12px;
                }

                :host(.expanded) form > #search {
                    background-color: var(--red-1);
                }
            </style>
        `;
    }

    scripts() {
        this.optionFilter();
    }

    optionFilter() {
        this.shadowRoot.querySelector('form #locationSelect input').addEventListener('input', () => {
            let userInput = this.shadowRoot.querySelector('form #locationSelect input').value;
            let locationOptions = this.shadowRoot.querySelector('form #locationSelect #locationOptions').children;
            for (let i = 0; i < locationOptions.length; i++) {
                locationOptions[i].style.display = "none";
                let option = locationOptions[i].getAttribute('value');
                if (!option.includes(userInput)) {
                    locationOptions[i].style.display = "none";
                } else {
                    locationOptions[i].style.display = "block";
                }
            }
        });
    }
}

if (!customElements.get('search-menu')) {
    customElements.define('search-menu', SearchMenu);
}