listOfShows = [
    {
        date: 'Mon Sept 06 2021',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA',
    },
    {
        date: 'Tue Sept 21 2021',
        venue: 'Pier 3 East',
        location: 'San Francisco, CA',
    },
    {
        date: 'Fri Oct 15 2021',
        venue: 'View Lounge',
        location: 'San Francisco, CA',
    },
    {
        date: 'Sat Nov 06 2021',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA',
    },
    {
        date: 'Fri Nov 26 2021',
        venue: 'Moscow Center',
        location: 'San Francisco, CA',
    },
    {
        date: 'Wed Dec 15 2021',
        venue: 'Press Club',
        location: 'San Francisco, CA',
    },
];

function displayShowList() {
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

        divDate.innerHTML = `<div class="show-list--title">DATE</div><div class="show-list--bold">${show.date}</div>`;
        divVenue.innerHTML = `<div class="show-list--title">VENUE</div>${show.venue}`;
        divLocation.innerHTML = `<div class="show-list--title">LOCATION</div>${show.location}`;

        elementLi.appendChild(divDate);
        elementLi.appendChild(divVenue);
        elementLi.appendChild(divLocation);
        elementLi.appendChild(divBuyTickets);
        showList.appendChild(elementLi);
    });
}
displayShowList();

function displayShowListTablet() {
    showListTablet = document.querySelector('.show-list-tablet');
    let elementLi = document.createElement('li');
    elementLi.className = 'show-list-tablet__row';
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

        divDate.innerHTML = `<div class="show-list-tablet--bold">${show.date}</div>`;
        divVenue.innerHTML = `${show.venue}`;
        divLocation.innerHTML = `${show.location}`;

        elementLi.appendChild(divDate);
        elementLi.appendChild(divVenue);
        elementLi.appendChild(divLocation);
        elementLi.appendChild(divBuyTickets);
        showListTablet.appendChild(elementLi);
    });
}
displayShowListTablet();

{
    /* <ul class="show-list-tablet">
    <li class="show-list-tablet__row">
        <div class="show-list-tablet__title">Date</div>
        <div class="show-list-tablet__title">Venue</div>
        <div class="show-list-tablet__title">Location</div>
        <div class="show-list-tablet__title"></div>
    </li>
    <li class="show-list-tablet__row show-list-tablet--bottom-border">
        <div class="show-list-tablet__item show-list-tablet--bold">
            Mon Sept 06 2021
        </div>
        <div class="show-list-tablet__item">Belly Up Aspen</div>
        <div class="show-list-tablet__item">Aspen, CO</div>
        <div class="show-list-tablet__item show-list-tablet__show-link">
            buy tickets
        </div>
    </li>
    <li class="show-list-tablet__row show-list-tablet--bottom-border">
        <div class="show-list-tablet__item show-list-tablet--bold">
            Mon Sept 06 2021
        </div>
        <div class="show-list-tablet__item">Belly Up Aspen</div>
        <div class="show-list-tablet__item">Aspen, CO</div>
        <div class="show-list-tablet__item show-list-tablet__show-link">
            buy tickets
        </div>
    </li>
</ul>; */
}
