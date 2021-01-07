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
                    <input type="text" id="locationSelectInput" name="locationSelect" value="Helsinki, Finland" placeholder="Add location">
                    <ul id="locationOptions">
                    </ul>
                </span>
                
                <span id="numberOfGuests" class="inputContainer">

                    <label for"numberOfGuests">Guests</label>
                    <input type="text" id="numberOfGuestsInput" name="numberOfGuests" placeholder="Add guests" readonly>

                    <div id="guestDetails">
                        <div id="adultCounter" class="counter">
                            <div class="demographic">Adult</div>
                            <div class="demoLimit">Ages 13 or above</div>
                            <span>
                                <button type="button" id="adultDecrement">-</button>
                                <span id="adultCount" class="countDisplay">0</span>
                                <button type="button" id="adultIncrement">+</button>
                            </span>
                        </div>

                        <div id="childrenCounter" class="counter">
                            <div class="demographic">Children</div>
                            <div class="demoLimit">Ages 2-12</div>
                            <span>
                                <button type="button" id="childrenDecrement">-</button>
                                <span id="childCount" class="countDisplay">0</span>
                                <button type="button" id="childrenIncrement">+</button>
                            </span>
                        </div>
                    </div>
                </span>

                <button type="button" id="search" class="inputContainer">
                    <span id="searchGroup">
                        <img id="searchIcon" src="../src/assets/icons/icons8-search-24.png">
                        <span id="searchText">Search</span>
                    </span>
                </button>
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

                button {
                    background: none;
                    outline: none;
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

                #locationSelect,
                #numberOfGuests {
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

                #locationOptions,
                #guestDetails {
                    padding: 0;
                    position: relative;
                    top: 52px;
                    z-index: 10;
                    list-style: none;
                }

                :host form > #locationSelect > #locationOptions,
                :host form > #numberOfGuests > #guestDetails {
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

                #search > #searchGroup {
                    justify-content: center;
                    align-items: center;
                }

                #search > #searchGroup > #searchText {
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

                :host(.expanded) > form > #numberOfGuests > input:focus ~ #guestDetails,
                :host(.expanded) > form > #numberOfGuests > input ~ #guestDetails:hover {
                    width: 114px;
                    display: flex;
                    flex-direction: column;
                    font-family: var(--font-style-3);
                    cursor: default;
                }

                :host(.expanded) > form > #numberOfGuests > #guestDetails > #adultCounter {
                    margin-bottom: 52px;
                }

                :host(.expanded) > form > #numberOfGuests > input ~ #guestDetails > .counter > .demographic {
                    font-size: var(--font-size-5);
                    font-weight: bold;
                }

                :host(.expanded) > form > #numberOfGuests > input ~ #guestDetails > .counter > .demoLimit {
                    font-size: var(--font-size-5);
                    font-weight: 400;
                    color: var(--grey-1);
                }

                :host(.expanded) > form > #numberOfGuests > input ~ #guestDetails > .counter > * {
                    display: flex;
                    align-items: center;
                }

                :host(.expanded) > form > #numberOfGuests > input ~ #guestDetails > .counter > span {
                    margin-top: 12px;
                }

                :host(.expanded) > form > #numberOfGuests > input ~ #guestDetails > .counter > span > button {
                    width: 23px;
                    height: 23px;
                    border-radius: 4px;
                    background: none;
                    border: 1px solid #828282;
                    cursor: pointer;
                }

                :host(.expanded) > form > #numberOfGuests > input ~ #guestDetails > .counter > span > .countDisplay {
                    font-weight: bold;
                    margin-right: 15px;
                    margin-left: 15px;
                }

                :host(.expanded) > form > #search {
                    width: 395px;
                }

                :host(.expanded) form > #search > #searchGroup {
                    margin-left: auto;
                    margin-right: auto;
                    width: 127px;
                    height: 48px;
                    background-color: var(--red-1);
                    display: flex;
                    border-radius: 16px;
                }

                :host(.expanded) form > #search > #searchGroup > #searchText {
                    display: block;
                }

                :host(.expanded) form > #locationSelect > input:focus ~ #locationOptions,
                :host(.expanded) form > #locationSelect > #locationOptions:active {
                    display: block;
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
