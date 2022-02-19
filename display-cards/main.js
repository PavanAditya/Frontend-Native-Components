let loadCards = async () => {
    let response = await fetch('./cards.json');
    let cardsResp = response.json();
    cardsResp.then(cards => {
        console.log(cards);
        let cardsRow = document.getElementById('cards-row');
        cards.forEach(card => {
            let cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.id = 'card-id-' + card.id;
            cardDiv.style.align = 'center';
            let cardImage = document.createElement('img');
            cardImage.src = card.image;
            cardImage.alt = 'Card image. Src: ' + card.image;
            cardDiv.appendChild(cardImage);
            let cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            let cardTitle = document.createElement('h2');
            cardTitle.className = 'card-title';
            cardTitle.innerHTML = card.title;
            let cardDescription = document.createElement('div');
            cardDescription.className = 'card-description';
            cardDescription.innerHTML = card.description;
            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardDescription);
            cardDiv.appendChild(cardContent);
            cardsRow.appendChild(cardDiv);
        });
    })
    .catch(err => {
        document.getElementById('cards-row').innerHTML = '<div width="100%" align="center">There is some error while loading the cards. Please try again later</div>';
    });
};

loadCards();