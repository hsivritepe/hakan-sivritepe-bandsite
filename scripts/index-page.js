comments = [
    {
        name: 'Connor Walton',
        date: '02/17/2021',
        comment:
            'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
    },
    {
        name: 'Emilie Beach',
        date: '01/09/2021',
        comment:
            'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
    },
    {
        name: 'Miles Acosta',
        date: '12/20/2020',
        comment:
            "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    },
];

function getCommentsfromAPI(url, apiKey) {
    return axios
        .get(url, {
            params: {
                api_key: apiKey,
            },
        })
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

function displayComment() {
    oldComments = document.querySelector('.old-comments');
    getCommentsfromAPI(
        'https://project-1-api.herokuapp.com/comments',
        'e7ca0048-5bad-422a-8f23-f7677987cda6'
    ).then((commentsFromAPI) => {
        //console.log(commentsFromAPI);
        commentsFromAPI.forEach((comment) => {
            let li = document.createElement('li');
            li.className = 'old-comments__container';
            let img = document.createElement('img');
            img.className = 'old-comments__profile-icon';
            img.src = '/assets/images/grey-background.jpg';
            let divContent = document.createElement('div');
            divContent.className = 'old-comments__content';
            let divTop = document.createElement('div');
            divTop.className = 'old-comments__top';
            let divName = document.createElement('div');
            divName.className = 'old-comments__name';
            let divDate = document.createElement('div');
            divDate.className = 'old-comments__date';
            let divBottom = document.createElement('div');
            divBottom.className = 'old-comments__bottom';
            let divComment = document.createElement('div');
            divComment.className = 'old-comments__comment';

            divName.textContent = comment.name;
            divDate.textContent = comment.date;
            divComment.textContent = comment.comment;

            divTop.appendChild(divName);
            divTop.appendChild(divDate);
            divBottom.appendChild(divComment);
            divContent.appendChild(divTop);
            divContent.appendChild(divBottom);
            li.appendChild(img);
            li.appendChild(divContent);
            oldComments.appendChild(li);
        });
    });
}
displayComment();

// Getting the profile icons and setting the default image if there is no image
function setDefaultImage() {
    profileIcons = document.querySelectorAll(
        '.old-comments__profile-icon'
    );
    profileIcons.forEach((icon) => {
        getSrc = icon.getAttribute('src');
        if (!getSrc) {
            icon.src = '/assets/images/grey-background.jpg';
        }
    });
}
setDefaultImage();

// Use this function to add a new comment to the comments array
function addNewComment() {
    // Get all necessary values to variables
    let form = document.querySelector('#new-comment-form');
    let formName = document.querySelector('#formName');
    let formComment = document.querySelector('#formComment');
    let todayDate = new Date().toLocaleDateString();

    // When I am done with the field, it is checking for error
    formName.addEventListener('focusout', () => {
        if (formName.value.length > 0) {
            formName.classList.remove(
                'new-comment--input-error-state'
            );
        } else {
            formName.classList.add('new-comment--input-error-state');
        }
    });
    formComment.addEventListener('focusout', () => {
        if (formComment.value.length > 0) {
            formComment.classList.remove(
                'new-comment--input-error-state'
            );
        } else {
            formComment.classList.add(
                'new-comment--input-error-state'
            );
        }
    });

    // I am preventing the default behaviour so I can do checks
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let formNameTrim = event.target.formName.value.trim();
        let formCommentTrim = event.target.formComment.value.trim();

        let errorStatus = false;
        if (formNameTrim === '') {
            formName.classList.add('new-comment--input-error-state');
            errorStatus = true;
        }
        if (formCommentTrim === '') {
            formComment.classList.add(
                'new-comment--input-error-state'
            );
            errorStatus = true;
        }
        if (errorStatus) {
            return;
        }

        formComment.classList.remove(
            'new-comment--input-error-state'
        );

        // Construct the new comment and add it to the top
        let comment = {
            name: formName.value,
            date: todayDate,
            comment: formComment.value,
        };
        comments.unshift(comment);
        console.log(comments);

        // Clear the form, clear the comments and re construct it
        formName.value = formComment.value = '';
        let oldComments = document.querySelector('.old-comments');
        oldComments.innerHTML = '';
        displayComment();
    });
}
addNewComment();
