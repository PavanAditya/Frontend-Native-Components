let allRatings = [];

let displayAllRatingBars = function () {
    let newRateBtn = document.getElementById('add-new-rating-btn');
    let ratingBlock = document.getElementById('rating-display');
    ratingBlock.removeChild(newRateBtn);
    let newRating = document.createElement('div');
    for (let i = 1; i <= allRatings.length; i++) {
        newRating.id = 'rating-div-' + i;
        newRating.className = 'rating-div';
        newRating.innerHTML = 'Your Profile is Rated with the following Rating: <br />';
        for (let j = 1; j <= 5; j++) {
            let star = document.createElement('span');
            star.id = 'star-id-' + i + j;
            star.className = 'star';
            star.innerHTML = '&#9733';
            star.addEventListener('click', rating.bind(null, i, j));
            star.addEventListener('mouseover', hoverStar.bind(null, i, j));
            star.addEventListener('mouseout', removeHoverStar.bind(null));
            newRating.appendChild(star);
        }
    }
    ratingBlock.appendChild(newRating);
    ratingBlock.appendChild(newRateBtn);
}

let createNewRatingBlock = function () {
    let ratingBlock = document.getElementById('rating-display');
    ratingBlock.innerHTML = '<h2>Ratings Display</h2><p>Click on the star to add rating</p>';
    let newRatingButton = document.createElement('button');
    newRatingButton.id = 'add-new-rating-btn';
    newRatingButton.innerHTML = 'Add New Rating Bar';
    newRatingButton.onclick = addNewRatingBar.bind(null);
    ratingBlock.appendChild(newRatingButton);
    addNewRatingBar();
}

let addNewRatingBar = function () {
    allRatings = allRatings.length ? [...allRatings, 0] : [0];
    displayAllRatingBars();
}

let rating = function (rateNum, rateValue) {
    allRatings[rateNum] = rateValue;
    for (let i = 1; i <= rateValue; i++) {
        let star = document.getElementById('star-id-' + rateNum + i);
        star.className += ' star-rated';
    }
    for (let i = rateValue + 1; i <= 5; i++) {
        let star = document.getElementById('star-id-' + rateNum + i);
        star.className = star.className.replace(' star-rated', '');
    }
}

let hoverStar = function (rateNum, starNum) {
    for (let i = 1; i <= starNum; i++)
        document.getElementById('star-id-' + rateNum + i).className += ' star-hover';
}

let removeHoverStar = function () {
    let stars = document.getElementsByClassName('star');
    for (i = 0; i < stars.length; i++)
        stars[i].className = stars[i].className.replace(' star-hover', '');
}

window.onload = createNewRatingBlock;