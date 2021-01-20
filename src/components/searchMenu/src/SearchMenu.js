import listingData from '../../../data/listingData.js';

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
        this.mobileCSS();
        this.expandStateCSS();
        this.mobileExpandStateCSS();
        this.expandStateCSSAnimation();
        this.scripts();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="mobileTopRow"><p>Edit your search</p><img id="close" src="../src/assets/icons/close-svgrepo-com.svg"></div>
            <form autocomplete="off">
                <span id="locationSelect" class="inputContainer">
                    <label for="locationSelect" id="locationSelectLabel">Location</label>
                    <input type="text" id="locationSelectInput" name="locationSelect" value="Helsinki, Finland" placeholder="Add location">
                </span>
                
                <span id="numberOfGuests" class="inputContainer">
                    <label for="numberOfGuests" id="guestInputLabel">Guests</label>
                    <input type="text" id="numberOfGuestsInput" name="numberOfGuests" placeholder="Add guests" readonly>
                </span>

                <button type="button" id="search1" class="inputContainer searchButton">
                    <span id="searchGroup">
                        <img id="searchIcon" src="../src/assets/icons/icons8-search-24.png">
                        <span id="searchText">Search</span>
                    </span>
                </button>
            </form>

            <div id="customControls">
                <ul id="locationOptions">
                </ul>

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
            </div>

            <button type="button" id="search2" class="inputContainer searchButton">
                    <span id="searchGroup">
                        <img id="searchIcon" src="../src/assets/icons/icons8-search-24.png">
                        <span id="searchText">Search</span>
                    </span>
            </button>
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

                :host > #mobileTopRow {
                    display: none;
                }

                #search2 {
                    display: none;
                }

                form {
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

                #locationSelect {
                    width: 138px;
                    border-right: 1px solid #F2F2F2;
                }

                #locationSelect > input,
                #locationSelect > label,
                #numberOfGuests > input,
                #numberOfGuests > label {
                    padding-left: 16px;
                    cursor: pointer;
                }

                #locationSelect,
                #numberOfGuests {
                    padding-top: 19px;
                    padding-bottom: 18px;
                    text-align: center;
                    font-size: var(--font-size-5);
                    color: var(--grey-5);
                    cursor: pointer;
                }

                #locationSelect > input,
                #numberOfGuests > input {
                    max-width: 200px;
                    
                }

                ##locationSelect,
                #numberOfGuests {
                    max-width: 33.92%;
                }

                #locationOptions,
                #guestDetails {
                    display: none;
                    padding: 0;
                    z-index: 10;
                    list-style: none;
                }

                #locationOptions > li:not(:last-child) {
                    margin-bottom: 36px;
                }

                #locationOptions li img {
                    width: 14px;
                    height: 19.47px;
                    margin-right: 10px;
                    padding: 0;
                }

                .searchButton {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-left: 1px solid #F2F2F2;
                    width: 53px;
                    
                }
                
                .searchButton > #searchGroup {
                    justify-content: center;
                    align-items: center;
                }

                .searchButton > #searchGroup > #searchText {
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

                :host(.expanded) > form,
                :host(.expanded) > #customControls {
                    max-width: 1253px;
                    margin-right: auto;
                    margin-left: auto;
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

                :host(.expanded) #guestDetails {
                    width: 114px;
                    display: flex;
                    flex-direction: column;
                    font-family: var(--font-style-3);
                    cursor: default;
                    margin-left: 33.5%;
                    margin-left: 27%;
                }

                :host(.expanded) > #customControls {
                    margin-top: 52px;
                }

                :host(.expanded) > #customControls > #locationOptions > li {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: var(--font-size-5);
                    cursor: pointer;
                }

                :host(.expanded) #guestDetails > #adultCounter {
                    margin-bottom: 52px;
                }

                :host(.expanded) #guestDetails > .counter > .demographic {
                    font-size: var(--font-size-5);
                    font-weight: bold;
                }

                :host(.expanded) #guestDetails > .counter > .demoLimit {
                    font-size: var(--font-size-5);
                    font-weight: 400;
                    color: var(--grey-1);
                }

                :host(.expanded) #guestDetails > .counter > * {
                    display: flex;
                    align-items: center;
                }

                :host(.expanded) .counter > span {
                    margin-top: 12px;
                }

                :host(.expanded) #guestDetails > .counter > span > button {
                    width: 23px;
                    height: 23px;
                    border-radius: 4px;
                    background: none;
                    border: 1px solid #828282;
                    cursor: pointer;
                }

                :host(.expanded) .countDisplay {
                    font-weight: bold;
                    margin-right: 15px;
                    margin-left: 15px;
                }

                :host(.expanded) #search1 {
                    width: 31.52%;
                }

                :host(.expanded) > .searchButton {
                    width: 395px;
                }

                :host(.expanded) .searchButton > #searchGroup {
                    margin-left: auto;
                    margin-right: auto;
                    width: 127px;
                    height: 48px;
                    background-color: var(--red-1);
                    display: flex;
                    border-radius: 16px;
                }

                :host(.expanded) #searchGroup > #searchText {
                    display: block;
                }
            </style>
        `;
    }

    expandStateCSSAnimation() {
        this.shadowRoot.innerHTML += `
            <style>
                :host(.expanded) {
                    animation-name: expanded-animation;
                    animation-duration: 0.3s;
                    animation-iteration-count: 1;
                    animation-timing-function: linear;
                }

                :host(.expanded) > form {
                    animation-name: form-expanded;
                    animation-duration: 0.3s;
                    animation-iteration-count: 1;
                    animation-timing-function: linear;
                }

                :host(.expanded) > #customControls > * {
                    animation-name: controls-expanded;
                    animation-duration: 0.3s;
                    animation-iteration-count: 1;
                    animation-timing-function: ease-out;
                }

                @keyframes expanded-animation {
                    0% {
                        transform: scale3d(0.6, 0.6, 1);
                        transform-origin: 100% 0%;
                    }
                    100% {
                        transform: scale3d(1, 1, 1);
                        transform-origin: 100% 0%;
                    }
                }

                @keyframes form-expanded {
                    0% {
                        transform: scale3d(0.5, 1, 1);
                        transform-origin: right;
                    }
                    100% {
                        transform: scale3d(1, 1, 1);
                        transform-origin: right;
                    }
                }

                @keyframes controls-expanded {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                @media (max-width: 575.98px) {
                    :host(.expanded) {
                        animation-name: expanded-animation;
                        animation-duration: 0.15s;
                        animation-iteration-count: 1;
                        animation-timing-function: linear;
                    }

                    :host(.expanded) > form {
                        animation-name: form-expanded;
                        animation-duration: 0.15s;
                        animation-iteration-count: 1;
                        animation-timing-function: linear;
                    }

                    @keyframes expanded-animation {
                        0% {
                            transform: scale(0.6);
                            transform-origin: top;
                        }
                        100% {
                            transform: scale(1);
                            transform-origin: top;
                        }
                    }

                    @keyframes form-expanded {
                        0% {
                            transform: scaleY(0.5);
                            transform-origin: bottom;
                        }
                        100% {
                            transform: scaleY(1);
                            transform-origin: bottom;
                        }
                    }
                }
            </style>
        `;
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
        <style>
            @media (max-width: 575.98px) {
                :host {
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 37px;
                    height: 55px;
                    max-width: 297px;
                }
            }
        </style>
        `;
    }

    mobileExpandStateCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media (max-width: 575.98px) {
                    :host(.expanded) {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        max-width: 100vw;
                        height: 632px;
                        z-index: 200;
                        padding-top: 18px;
                        padding-left: 13px;
                        padding-right: 13px;
                        padding-bottom: 24px;
                    }

                :host(.expanded) > form {
                    max-width: 100%;
                    flex-direction: column;
                    height: 114px;
                    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
                }

                :host(.expanded) > #mobileTopRow {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;                    
                    margin-bottom: 10px;
                    color: var(--grey-5);
                }

                :host(.expanded) > #mobileTopRow > p {
                    font-size: var(--font-size-4);
                    font-weight: bold;
                }

                :host(.expanded) > #mobileTopRow > img {
                    width: 13.18px;
                    height: 13.18px;
                }

                :host(.expanded) > form > #locationSelect,
                :host(.expanded) > form > #numberOfGuests {
                    height: 57px;
                    padding-top: 11px;
                    padding-bottom: 12px;
                    border: none;
                }

                :host(.expanded) > form > #locationSelect {
                    border-bottom: 1px solid #F2F2F2;
                }

                :host(.expanded) > form > #search1 {
                    display: none;
                }

                :host(.expanded) #guestDetails {
                    margin-left: 0%;
                }

                :host(.expanded) > #customControls {
                    margin-left: 13px;
                    margin-top: 36px;
                }

                :host(.expanded) #search2 {
                    display: block;
                    margin-top: auto;
                }
            </style>
        `;
    }

    scripts() {
        this.renderLocationList();
    }

    async dataSetFetch() {
        return (await import('../../../data/listingData.js')).default;
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
            locations.sort();
            let html = ``;
            for (let i = 0; i < locations.length; i++) {
                    html += `<li value="${locations[i]}"><img src="../src/assets/icons/location-pin-svgrepo-com.svg" class="pin">${locations[i]}</li>`;
            }
            this.shadowRoot.querySelector('#customControls > #locationOptions').innerHTML += html;
        } catch (error) {
            console.log(`Error @ renderLocationList(): ${error}`);
        }
    }
}

if (!customElements.get('search-menu')) {
    customElements.define('search-menu', SearchMenu);
}
 