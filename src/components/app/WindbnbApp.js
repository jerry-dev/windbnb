import PropertyListingMenu from '../propertyListingMenu/PropertyListingMenu.js';
import PropertiesListing from '../propertiesListing/PropertiesListing.js';

class WindbnbApp extends HTMLElement {    
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.guests = { totalGuests: 0, adults: 0, children: 0};
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.css();
        this.mobileCSS();
        this.scripts();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <property-listing-menu></property-listing-menu>
            <div id="propertylistingHeader">
                <span id="stays">Stays in Finland</span>
                <span id="days">12+ stays</span>
            </div>
            <properties-listing location></properties-listing>
            <footer><span>Jerry Dormetus @ DevChallenges.io</span></footer>
        `;
    }
    
    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {
                    padding: 0;
                    margin: 0;
                }

                properties-listing {
                    margin-bottom: 85px;
                }

                :host {
                    position: relative;
                    display: grid;
                    grid-template-columns: 1fr;
                }

                #propertylistingHeader {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 32px;
                }

                #propertylistingHeader > #stays {
                    font-size: var(--font-size-7);
                    font-weight: bold;
                    color: var(--grey-4);
                }

                #propertylistingHeader > #days {
                    font-size: var(--font-size-5);
                }

                footer {
                    display: flex;
                    width: 100%;
                }

                footer > span {
                    margin-left: auto;
                    margin-right: auto;
                    position: relative;
                    width: 300px;
                    color: var(--grey-1);
                    font-weight: 600;
                    font-size: var(--font-size-5);
                }

                footer > span::before {
                    margin-bottom: 26px;
                    display: block;
                    content: "";
                    height: 1px;
                    postion: absolute;
                    width: 100%;
                    transform: scaleX(1.2);
                    background-color: var(--grey-1);
                }
            </style>
        `;
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
        <style>
            @media (max-width: 575.98px) {
                :host {
                    
                }
            }
        </style>
        `;
    }

    scripts() {
        this.searchMenuState();
        this.attachSelectionToAttribute();
        this.filterLocationOnInput();
        this.selectClickedLocation();
        this.guestDetails();
    }

    expandMenu() {
        this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').classList.add('expanded');

        this.shadowRoot.querySelector('properties-listing').shadowRoot
                .querySelector('#overlay').classList.add('activated');
    }

    collapseMenu() {
        this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').classList.remove('expanded');

        this.shadowRoot.querySelector('properties-listing').shadowRoot
            .querySelector('#overlay').classList.remove('activated');

        this.locationControlsOff();
        this.guestControlsOff();
    }

    locationControlsOn() {
        const locationOptions = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector(`#customControls > #locationOptions`);

            locationOptions.style.display = "block";
    }

    locationControlsOff() {
        const locationOptions = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector(`#customControls > #locationOptions`);

            locationOptions.style.display = "none";
    }

    guestControlsOn() {
        const guestDetails = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector(`#customControls > #guestDetails`);

            guestDetails.style.display = "block";
    }

    guestControlsOff() {
        const guestDetails = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector(`#customControls > #guestDetails`);

            guestDetails.style.display = "none";
    }

    isMenuActive() {
        const answer = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').classList.contains('expanded');
        return answer;
    }

    attachSelectionToAttribute() {
        let selectedLocation = this.shadowRoot.querySelector('property-listing-menu')
            .shadowRoot.querySelector('search-menu')
            .shadowRoot.querySelector('form > #locationSelect > input').value;

        this.shadowRoot.querySelector('properties-listing').setAttribute('location', selectedLocation);
    }

    searchMenuState() {
        const propertyListingMenu = this.shadowRoot.querySelector('property-listing-menu');
        const searchMenu = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu');


        searchMenu.shadowRoot.addEventListener('click', (event) => {
            const { id } = event.target;
            if (!this.isMenuActive()) {
                this.expandMenu();
            }

            switch (id) {
                case 'searchText':
                case 'search':
                case 'searchIcon':
                case 'searchGroup':
                    this.search();
                    this.locationControlsOff();
                    this.guestControlsOff();
                    break;
                case 'locationSelect':
                case 'locationSelectInput':
                    this.locationControlsOn();
                    this.guestControlsOff();
                    break;
                case 'numberOfGuests':
                case 'numberOfGuestsInput':
                    this.guestControlsOn();
                    this.locationControlsOff();
                    break;
                case 'close':
                    this.collapseMenu();
                    break;
            }
        });

        this.shadowRoot.addEventListener('click', (event) => {
            const { target } = event;
            if (this.isMenuActive()) {
                switch (target) {
                    case propertyListingMenu:
                        break;
                    default:
                        this.collapseMenu();
                }
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isMenuActive()) {
                this.collapseMenu();
            }
        });
    }

    selectClickedLocation() {
        const locationList = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('#customControls > #locationOptions');
        
        const locationSelectInput = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #locationSelect > input');

        locationList.addEventListener('click', (event) => {
            if (event.target.getAttribute('value')) {
                const clickedLocation = event.target.getAttribute('value');
                locationSelectInput.value = clickedLocation;
                this.attachSelectionToAttribute();
            }
        });
    }

    filterLocationOnInput() {
        const locationSelectInput = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #locationSelect > input');

        const locationList = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('#customControls > #locationOptions');

        locationSelectInput.addEventListener('input', () => {
            let selectedLocation = locationSelectInput.value.toLowerCase();
            let locationOptions = locationList.children;
            for (let i = 0; i < locationOptions.length; i++) {
                let option = locationOptions[i].getAttribute('value').toLowerCase();
                if (!option.includes(selectedLocation)) {
                    locationOptions[i].style.display = "none";
                } else {
                    locationOptions[i].style.display = "flex";
                }
            }
        });
    }

    guestDetails() {
        const numberOfGuestsDisplay = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #numberOfGuests > input');

        const guestDetails = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('#customControls > #guestDetails');
        const adultCountDisplay = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('#customControls > #guestDetails > #adultCounter > span > #adultCount');
        const childCountDisplay = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('#customControls > #guestDetails > #childrenCounter > span > #childCount');

        guestDetails.addEventListener('click', (event) => {
            const { id } = event.target

            switch(id) {
                case "adultDecrement":
                    if (this.guests.adults === 0) {
                        break;
                    }
                    this.guests.adults--;
                    this.guests.totalGuests = (this.guests.adults + this.guests.children);
                    numberOfGuestsDisplay.value = `${this.guests.totalGuests} guests`;
                    adultCountDisplay.innerText = this.guests.adults;
                    break;
                case "adultIncrement":
                    if (this.guests.adults === 16) {
                        break;
                    }
                    this.guests.adults++;
                    this.guests.totalGuests = (this.guests.adults + this.guests.children);
                    numberOfGuestsDisplay.value = `${this.guests.totalGuests} guests`;
                    adultCountDisplay.innerText = this.guests.adults;
                    break;
                case "childrenDecrement":
                    if (this.guests.children === 0) {
                        break;
                    }
                    this.guests.children--;
                    this.guests.totalGuests = (this.guests.adults + this.guests.children);
                    numberOfGuestsDisplay.value = `${this.guests.totalGuests} guests`;
                    childCountDisplay.innerText = this.guests.children;
                    break;
                case "childrenIncrement":
                    if (this.guests.children === 5) {
                        break;
                    }
                    this.guests.children++;
                    if (this.guests.adults === 0) {
                        this.guests.adults++;
                    }
                    this.guests.totalGuests = (this.guests.adults + this.guests.children);
                    numberOfGuestsDisplay.value = `${this.guests.totalGuests} guests`;
                    childCountDisplay.innerText = this.guests.children;
                    adultCountDisplay.innerText = this.guests.adults;
                    break;
            }
        });
    }

    search() {
        this.shadowRoot.querySelector('properties-listing').refresh();
        this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').classList.remove('expanded');
    }
}

if (!customElements.get('windbnb-app')) {
    customElements.define('windbnb-app', WindbnbApp);
}