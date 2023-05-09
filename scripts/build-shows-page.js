/*
 * Get the showdates from the API
 */
function getTheShowDatesFromAPI(url, api_key) {
    axios
        .get(url, {
            params: {
                api_key,
            },
        })
        .then((response) => {
            console.log(response.data);
            displayShowListHTML(response.data);
            displayShowListHTMLTablet(response.data);
        });
}
getTheShowDatesFromAPI(
    'https://project-1-api.herokuapp.com/showdates',
    'e7ca0048-5bad-422a-8f23-f7677987cda6'
);

function displayShowListHTML(listOfShows) {
    showList = document.querySelector('.show-list');
    listOfShows.forEach((show) => {
        let elementLi = document.createElement('li');
        elementLi.className = 'show-list__container';
        let divDate = document.createElement('div');
        divDate.className = 'show-list__item';
        let divVenue = document.createElement('div');
        divVenue.className = 'show-list__item';
        let divLocation = document.createElement('div');
        divLocation.className = 'show-list__item';
        let divBuyTickets = document.createElement('div');
        divBuyTickets.className = 'show-list__show-link';
        divBuyTickets.textContent = 'buy tickets';

        let curDate = new Date();
        curDate.setTime(show.date);

        divDate.innerHTML = `<div class="show-list--title">DATE</div><div class="show-list--bold">${curDate.toLocaleDateString()}</div>`;
        divVenue.innerHTML = `<div class="show-list--title">VENUE</div>${show.place}`;
        divLocation.innerHTML = `<div class="show-list--title">LOCATION</div>${show.location}`;

        elementLi.appendChild(divDate);
        elementLi.appendChild(divVenue);
        elementLi.appendChild(divLocation);
        elementLi.appendChild(divBuyTickets);
        showList.appendChild(elementLi);
    });
}

function displayShowListHTMLTablet(listOfShows) {
    showListTablet = document.querySelector('.show-list-tablet');
    let elementLi = document.createElement('li');
    elementLi.className = 'show-list-tablet__row';
    elementLi.classList.add('show-list-tablet__row--title');
    let divDate = document.createElement('div');
    divDate.className = 'show-list-tablet__title';
    let divVenue = document.createElement('div');
    divVenue.className = 'show-list-tablet__title';
    let divLocation = document.createElement('div');
    divLocation.className = 'show-list-tablet__title';
    let divBuyTickets = document.createElement('div');
    divBuyTickets.className = 'show-list-tablet__title';

    divDate.textContent = 'DATE';
    divVenue.textContent = 'VENUE';
    divLocation.textContent = 'LOCATION';
    divBuyTickets.textContent = '';

    elementLi.appendChild(divDate);
    elementLi.appendChild(divVenue);
    elementLi.appendChild(divLocation);
    elementLi.appendChild(divBuyTickets);
    showListTablet.appendChild(elementLi);

    listOfShows.forEach((show) => {
        elementLi = document.createElement('li');
        elementLi.className = 'show-list-tablet__row';
        let divDate = document.createElement('div');
        divDate.className = 'show-list-tablet__item';
        let divVenue = document.createElement('div');
        divVenue.className = 'show-list-tablet__item';
        let divLocation = document.createElement('div');
        divLocation.className = 'show-list-tablet__item';
        let divBuyTickets = document.createElement('div');
        divBuyTickets.className =
            'show-list-tablet__item show-list-tablet__show-link';
        divBuyTickets.textContent = 'buy tickets';

        let curDate = new Date();
        curDate.setTime(show.date);

        divDate.innerHTML = `<div class="show-list-tablet--bold">${curDate.toLocaleDateString()}</div>`;
        divVenue.innerHTML = `${show.place}`;
        divLocation.innerHTML = `${show.location}`;

        elementLi.appendChild(divDate);
        elementLi.appendChild(divVenue);
        elementLi.appendChild(divLocation);
        elementLi.appendChild(divBuyTickets);
        showListTablet.appendChild(elementLi);
    });
}

function selectShow() {
    let showRows = document.querySelectorAll(
        '.show-list-tablet__row'
    );
    let selectedRow = null;

    showRows.forEach((row) => {
        row.addEventListener('click', () => {
            if (selectedRow !== null) {
                selectedRow.classList.remove(
                    'show-list-tablet__row--selected'
                );
            }
            row.classList.add('show-list-tablet__row--selected');
            selectedRow = row;
        });
    });
}
selectShow();
