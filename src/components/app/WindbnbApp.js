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
        this.script();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <property-listing-menu></property-listing-menu>
            <div id="propertylistingHeader">
                <span id="stays">Stays in Finland</span>
                <span id="days">12+ stays</span>
            </div>
            <properties-listing location></properties-listing>
            <footer><p>Jerry Dormetus @ DevChallenges.io<p></footer>
        `;
    }
    
    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {
                    padding: 0;
                    margin: 0;
                }

                :host {
                    position: relative;
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr, repeat() 1fr
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
                    margin-top: 85px;
                    margin-left: auto;
                    margin-right: auto;
                    padding-top: 23px;
                }

                footer > p {
                    color: var(--grey-1);
                    font-weight: 600;
                    font-size: var(--font-size-5);
                }
            </style>
        `;
    }

    script() {
        this.searchMenuState();
        this.selectClickedLocation();
        this.filterLocationOnInput();
        this.attachSelectionToAttribute();
        this.guestDetails();
        this.search();
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

        propertyListingMenu.shadowRoot.addEventListener('click', (event) => {
            if (event.target === searchMenu && !searchMenu.classList.contains('expanded')) {
                searchMenu.classList.add('expanded');
            }
        });

        this.shadowRoot.addEventListener('click', (event) => {
            const { target } = event;
            if (searchMenu.classList.contains('expanded')) {
                switch (target) {
                    case propertyListingMenu:
                        break;
                    default:
                        searchMenu.classList.remove('expanded');
                }
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && searchMenu.classList.contains('expanded')) {
                searchMenu.classList.remove('expanded');
            }
        });

        window.addEventListener('click', (event) => {
            if (event.target !== this && searchMenu.classList.contains('expanded')) {
                searchMenu.classList.remove('expanded');
            }
        });
    }

    selectClickedLocation() {
        const locationList = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #locationSelect > #locationOptions');
        
        const locationSelectInput = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #locationSelect > input');

        locationList.addEventListener('click', (event) => {
            if (event.target.getAttribute('value')) {
                const clickedLocation = event.target.getAttribute('value');
                locationSelectInput.value = clickedLocation;
            }
        });
    }

    filterLocationOnInput() {
        const locationSelectInput = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #locationSelect > input');

        const locationList = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #locationSelect > #locationOptions');

        locationSelectInput.addEventListener('input', () => {
            let selectedLocation = locationSelectInput.value.toLowerCase();
            let locationOptions = locationList.children;
            for (let i = 0; i < locationOptions.length; i++) {
                let option = locationOptions[i].getAttribute('value').toLowerCase();
                if (!option.includes(selectedLocation)) {
                    locationOptions[i].style.display = "none";
                } else {
                    locationOptions[i].style.display = "block";
                }
            }
        });
    }

    guestDetails() {
        const guestDetails = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #numberOfGuests > #guestDetails');
        const numberOfGuestsDisplay = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #numberOfGuests > input');
        const adultCountDisplay = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #numberOfGuests > #guestDetails > #adultCounter > span > #adultCount');
        const childCountDisplay = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #numberOfGuests > #guestDetails > #childrenCounter > span > #childCount');

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
                        this.guests.totalGuests = (this.guests.adults + this.guests.children);
                        numberOfGuestsDisplay.value = `${this.guests.totalGuests} guests`;
                        childCountDisplay.innerText = this.guests.children;
                        break;
                }
            });
    }

    search() {
        const searchButton = this.shadowRoot.querySelector('property-listing-menu').shadowRoot
            .querySelector('search-menu').shadowRoot
            .querySelector('form > #search');

        searchButton.addEventListener('click', () => {
            this.attachSelectionToAttribute();
            this.shadowRoot.querySelector('properties-listing').refresh();
        });
    }
}

if (!customElements.get('windbnb-app')) {
    customElements.define('windbnb-app', WindbnbApp);
}