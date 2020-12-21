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
                <fieldset>
                    <div id="inputGroup-1" class="inputGroup">
                        <label for"locationSelect">Location</label>
                        <select id="locationSelect" for="locationSelect" placeholder="Add location">
                            <option>Helsinki, Finland</option>
                            <option>Turku, Finland</option>
                            <option>Oulu, Finland</option>
                            <option>Vaasa, Finland</option>
                        </select>
                    </div>
                    <div id="inputGroup-2" class="inputGroup">
                        <label for"numberOfGuests">Guests</label>
                        <input type="text" id="numberOfGuests" for="numberOfGuests" placeholder="Add guests">
                    </div>
                    <div id="searchIcon" class="inputGroup">
                        <img src="">
                    </div>
                </fieldset>
            </form>
        `;
    }

    // Will position the labels absolutely on the top when the input is :focus
    // The labels will have a display of none by default
    //CURRENTLY Shaping the group's radius
    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {
                    padding: 0;
                    margin: 0;
                }

                :host {
                    margin-left: auto;
                    
                    margin-top: 50px;
                }

                form {
                    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
                    border-radius: 16px 16px 16px 16px;
                }

                fieldset {
                    display: flex;
                    flex-direction: row;
                    border: none;
                }

                label {
                    display: none;
                }

                input::placeholder {
                    color: var(--grey-1);
                }

                #locationSelect, #numberOfGuests, #searchIcon {
                    padding-top: 19px;
                    padding-right: 16px;
                    padding-bottom: 18px;
                    padding-left: 16px;
                    text-align: center;
                    font-size: var(--font-size-5);
                    color: var(--grey-5);
                    border: none;
                }

                searchIcon {
                    
                }

                .inputGroup {
                    margin-left: auto;
                    display: flex
                    flex-direction: column;
                    outline: 1px solid rgba(0, 0, 0, 0.1);
                    
                }

                #inputGroup-1 {
                    outline: 2px solid red;
                }

                #inputGroup-1 > input {
                    width: 138px;
                }

                #inputGroup-2 > input {
                    width: 106px;
                }

                #searchIcon {
                    display: none;
                }
            </style>
        `;
    }
}

if (!customElements.get('search-menu')) {
    customElements.define('search-menu', SearchMenu);
}