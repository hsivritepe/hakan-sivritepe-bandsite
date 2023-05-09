/*
 *  Create the functions related to API requests
 */
function getCommentsfromAPI(url, api_key) {
    axios
        .get(url, {
            params: {
                api_key,
            },
        })
        .then((response) => {
            let sortedData = response.data.sort((a, b) => {
                return b.timestamp - a.timestamp;
            });
            displayCommentInHTML(sortedData);
        })
        .catch((error) => console.log(error));
}

function createNewCommentWithAPI(url, api_key, commentData) {
    return axios
        .post(
            url,
            {
                name: commentData.name,
                comment: commentData.comment,
            },
            {
                params: {
                    api_key,
                },
            }
        )
        .catch((error) => console.error(error));
}

function incrementTheLikeOnACommentWithAPI(url, api_key, id) {
    axios
        .put(
            url + id + '/like',
            {},
            {
                params: {
                    api_key,
                },
            }
        )
        .then(() => {
            getCommentsfromAPI(
                'https://project-1-api.herokuapp.com/comments',
                'e7ca0048-5bad-422a-8f23-f7677987cda6'
            );
        });
}

function deleteTheCommentWithAPI(url, api_key, id) {
    axios
        .delete(url + id, {
            params: {
                api_key,
            },
        })
        .then(() => {
            getCommentsfromAPI(
                'https://project-1-api.herokuapp.com/comments',
                'e7ca0048-5bad-422a-8f23-f7677987cda6'
            );
        });
}

/*
 *   Create the functions to manipulate the DOM
 */
function displayCommentInHTML(commentsFromPromise) {
    oldComments = document.querySelector('.old-comments');
    oldComments.innerHTML = '';

    commentsFromPromise.forEach((comment) => {
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
        let divLikeDelete = document.createElement('div');
        divLikeDelete.className = 'old-comments__social';
        let divLike = document.createElement('div');
        divLike.className = 'old-comments__like';
        let imgLike = document.createElement('img');
        imgLike.className = 'old-comments__icon';
        imgLike.src = '/assets/icons/svg/icon-like.svg';
        let imgDelete = document.createElement('img');
        imgDelete.className = 'old-comments__delete';
        imgDelete.src = '/assets/icons/svg/icon-delete.svg';

        divName.textContent = comment.name;
        divDate.textContent = comment.date;
        divComment.textContent = comment.comment;
        divLike.textContent = comment.likes;
        imgLike.id = imgDelete.id = divLike.id = comment.id;

        divTop.appendChild(divName);
        divTop.appendChild(divDate);
        divBottom.appendChild(divComment);
        divContent.appendChild(divTop);
        divContent.appendChild(divBottom);
        divLikeDelete.appendChild(divLike);
        divLike.appendChild(imgLike);
        divLikeDelete.appendChild(imgDelete);
        divContent.appendChild(divLikeDelete);
        li.appendChild(img);
        li.appendChild(divContent);
        oldComments.appendChild(li);

        imgLike.addEventListener('click', () => {
            incrementTheLikeOnACommentWithAPI(
                'https://project-1-api.herokuapp.com/comments/',
                'e7ca0048-5bad-422a-8f23-f7677987cda6',
                imgLike.id
            );
        });
        imgDelete.addEventListener('click', () => {
            deleteTheCommentWithAPI(
                'https://project-1-api.herokuapp.com/comments/',
                'e7ca0048-5bad-422a-8f23-f7677987cda6',
                imgDelete.id
            );
        });
    });
}

getCommentsfromAPI(
    'https://project-1-api.herokuapp.com/comments',
    'e7ca0048-5bad-422a-8f23-f7677987cda6'
);

/*
 * Getting the profile icons and setting the default image if there is no image
 */
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

/*
 * Use this function to add a new comment to the comments array
 */
function addNewCommentToHTML() {
    /*
     * Get all necessary values to variables
     */
    let form = document.querySelector('#new-comment-form');
    let formName = document.querySelector('#formName');
    let formComment = document.querySelector('#formComment');
    let todayDate = new Date().toLocaleDateString();

    /*
     * When I am done with the field, it is checking for error
     */
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

    /*
     * I am preventing the default behaviour so I can do checks
     */
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

        /*
         * Construct the new comment and add it to the top
         */
        createNewCommentWithAPI(
            'https://project-1-api.herokuapp.com/comments',
            'e7ca0048-5bad-422a-8f23-f7677987cda6',
            {
                name: formName.value,
                comment: formComment.value,
            }
        ).then(() =>
            getCommentsfromAPI(
                'https://project-1-api.herokuapp.com/comments',
                'e7ca0048-5bad-422a-8f23-f7677987cda6'
            )
        );

        /*
         * Clear the form, clear the comments and re construct it
         */
        formName.value = formComment.value = '';
        let oldComments = document.querySelector('.old-comments');
        oldComments.innerHTML = '';
    });
}
addNewCommentToHTML();

getCommentsfromAPI(
    'https://project-1-api.herokuapp.com/comments',
    'e7ca0048-5bad-422a-8f23-f7677987cda6'
);
