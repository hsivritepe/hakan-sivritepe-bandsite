/*
 * Get the showdates from the API
 */
function getTheShowDatesFromAPI(url, api_key) {
    return axios
        .get(url, {
            params: {
                api_key,
            },
        })
        .then((response) => {
            console.log(response.data);
            displayShowListHTML(response.data);
        });
}
getTheShowDatesFromAPI(
    'https://project-1-api.herokuapp.com/showdates',
    'e7ca0048-5bad-422a-8f23-f7677987cda6'
).then(() => {
    selectShow();
});

function displayShowListHTML(listOfShows) {
    showList = document.querySelector('.show-list');
    listOfShows.forEach((show) => {
        let curDate = new Date();
        curDate.setTime(show.date);

        let elementLi = document.createElement('li');
        elementLi.className = 'show-list__container';

        let divDate = document.createElement('p');
        divDate.className = 'show-list__item';
        let divDateTitle = document.createElement('p');
        divDateTitle.className = 'show-list--title';
        divDateTitle.textContent = 'DATE';
        let divDateBold = document.createElement('p');
        divDateBold.className = 'show-list--bold';
        divDateBold.textContent = curDate.toLocaleDateString();
        divDate.appendChild(divDateTitle);
        divDate.appendChild(divDateBold);
        elementLi.appendChild(divDate);

        let divVenue = document.createElement('p');
        divVenue.className = 'show-list__item';
        let divVenueTitle = document.createElement('p');
        divVenueTitle.className = 'show-list--title';
        divVenueTitle.textContent = 'VENUE';
        let divVenuePlace = document.createElement('p');
        divVenuePlace.textContent = show.place;
        divVenue.appendChild(divVenueTitle);
        divVenue.appendChild(divVenuePlace);
        elementLi.appendChild(divVenue);

        let divLocation = document.createElement('p');
        divLocation.className = 'show-list__item';
        let divLocationTitle = document.createElement('p');
        divLocationTitle.className = 'show-list--title';
        divLocationTitle.textContent = 'LOCATION';
        let divLocationLocation = document.createElement('p');
        divLocationLocation.textContent = show.location;
        divLocation.appendChild(divLocationTitle);
        divLocation.appendChild(divLocationLocation);
        elementLi.appendChild(divLocation);

        let divBuyTickets = document.createElement('p');
        divBuyTickets.className = 'show-list__show-link';
        divBuyTickets.textContent = 'buy tickets';

        elementLi.appendChild(divBuyTickets);
        showList.appendChild(elementLi);
    });
}

function selectShow() {
    let showRows = document.querySelectorAll('.show-list__container');
    let selectedRow = null;
    console.log(showRows);

    showRows.forEach((row) => {
        row.addEventListener('click', () => {
            console.log(row);
            if (selectedRow !== null) {
                selectedRow.classList.remove(
                    'show-list__container--selected'
                );
            }
            row.classList.add('show-list__container--selected');
            selectedRow = row;
        });
    });
}
selectShow();
