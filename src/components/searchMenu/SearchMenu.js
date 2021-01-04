import listingData from '../../data/listingData.js';

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
        this.expandStateCSS();
        this.scripts();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <form autocomplete="off">
                <span id="locationSelect" class="inputContainer">
                    <label for"locationSelect">Location</label>
                    <input type="text" name="locationSelect" value="Helsinki, Finland" placeholder="Add location">
                    <ul id="locationOptions">
                    </ul>
                </span>
                
                <span id="numberOfGuests" class="inputContainer">
                    <label for"numberOfGuests">Guests</label>
                    <input type="text name="numberOfGuests" placeholder="Add guests">
                </span>

                <span id="search" class="inputContainer">
                    <span id="searchIcon">
                        <img src="../src/assets/icons/icons8-search-24.png">
                        <span id="searchText">Search</span>
                    </span>
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

                :host form > #locationSelect > #locationOptions {
                    display: none;
                }

                #locationOptions > li {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: var(--font-size-5);
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

                #search > #searchIcon {
                    justify-content: center;
                    align-items: center;
                }

                #search > #searchIcon > #searchText {
                    display: none;
                    color: white;
                    margin-left: 10.95px;
                }
            </style>
        `;
    }

    expandStateCSS() {
        this.shadowRoot.innerHTML += `
            <style>
            :host(.expanded) {
                height: 460px;
                padding-top: 61px;
                z-index: 200;
                background-color: white;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                
                outline: 2px solid red;
            }

                :host(.expanded) form > #locationSelect,
                :host(.expanded) form > #numberOfGuests {
                    padding-top: 12px;
                }

                :host(.expanded) form > #locationSelect {
                    width: 420px;
                }

                :host(.expanded) form > #locationSelect label {
                    display: block;
                }

                :host(.expanded) form > #numberOfGuests {
                    width: 821px;
                }

                :host(.expanded) form > #numberOfGuests label {
                    display: block;
                }

                :host(.expanded) form > #search {
                    width: 395px;
                }

                :host(.expanded) form > #search > #searchIcon {
                    margin-left: auto;
                    margin-right: auto;
                    width: 127px;
                    height: 48px;
                    background-color: var(--red-1);
                    display: flex;
                    border-radius: 16px;
                }

                :host(.expanded) form > #search > #searchIcon > #searchText {
                    display: block;
                }

                :host(.expanded) form > #locationSelect > input:focus ~ #locationOptions,
                :host(.expanded) form > #locationSelect > #locationOptions:active {
                    display: block;
                }

                :host(.expanded) > #locationSelect > input:focus {
                    display: flex;
                    outline: 1px solid black;
                    flex-direction: row;
                    align-items: center;
                }
            </style>
        `;
    }

    scripts() {
        this.renderLocationList();
    }

    async dataSetFetch() {
        return (await import('../../data/listingData.js')).default;
    }

    async getDestinctLocations() {      
        const compare = { NOT_EQUALITY: -1, EQUALITY: 1 }
        const compareDefault = (a, b) => {
            return a === b ? compare.EQUALITY : compare.NOT_EQUALITY;
        }
        
        try {
            const dataSet = [];
            const rawDataSet = await this.dataSetFetch();
            for (let i = 0; i < rawDataSet.length; i++) {
                dataSet[dataSet.length] = rawDataSet[i];
            }

            const { length } = dataSet;
            const result = [];

            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length-1; j++) {
                    if (dataSet[j] === 'dupe') {
                        continue;
                    }

                    if (compareDefault(i, j) === compare.NOT_EQUALITY) {
                        if (compareDefault(dataSet[i].city, dataSet[j].city) === compare.EQUALITY) {
                            dataSet[j] = 'dupe';
                        }
                    } else {
                        continue;
                    }
                }
            }

            for (let k = 0; k < length; k++) {
                if (dataSet[k] === 'dupe') {
                    continue;
                } else {
                    result[result.length] = `${dataSet[k].city}, ${dataSet[k].country}`;
                }
            }

            return result;
        } catch(error) {
            console.log(error);
        }
    }

    async renderLocationList() {
        try {
            const locations = await this.getDestinctLocations();
            let html = ``;
            for (let i = 0; i < locations.length; i++) {
                    html += `<li value="${locations[i]}"><span><img src="../src/assets/icons/location-pin-svgrepo-com.svg" class="pin"></span>${locations[i]}</li>`;
            }
            this.shadowRoot.querySelector('form #locationSelect #locationOptions').innerHTML += html;
        } catch (error) {
            console.log(`Error @ renderLocationList(): ${error}`);
        }
    }
}

if (!customElements.get('search-menu')) {
    customElements.define('search-menu', SearchMenu);
}