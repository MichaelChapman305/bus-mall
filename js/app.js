'use strict';

const PRODUCTS_ARR = [
  {HTMLid: 'bag', imgURL: './images/bag.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'banana', imgURL: './images/banana.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'bathroom', imgURL: './images/bathroom.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'boots', imgURL: './images/boots.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'breakfast', imgURL: './images/breakfast.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'bubblegum', imgURL: './images/bubblegum.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'chair', imgURL: './images/chair.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'cthulhu', imgURL: './images/cthulhu.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'dogDuck', imgURL: './images/dog-duck.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'dragon', imgURL: './images/dragon.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'pen', imgURL: './images/pen.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'petSweep', imgURL: './images/pet-sweep.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'scissors', imgURL: './images/scissors.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'shark', imgURL: './images/shark.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'sweep', imgURL: './images/sweep.png', totalViews: 0, totalVotes: 0},
  {HTMLid: 'tauntaun', imgURL: './images/tauntaun.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'unicorn', imgURL: './images/unicorn.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'usb', imgURL: './images/usb.gif', totalViews: 0, totalVotes: 0},
  {HTMLid: 'waterCan', imgURL: './images/water-can.jpg', totalViews: 0, totalVotes: 0},
  {HTMLid: 'wineGlass', imgURL: './images/wine-glass.jpg', totalViews: 0, totalVotes: 0},
];

let clicks = 0;

function renderImages() {
  for (let i = 0; i < 3; i++) {
    let imgContainer = document.getElementById(`product_${i}`);
    let img = document.createElement('img');
    imgContainer.appendChild(img);

    img.setAttribute('class', 'item');
    img.setAttribute('id', PRODUCTS_ARR[i].HTMLid);
    img.setAttribute('src', PRODUCTS_ARR[i].imgURL);

    PRODUCTS_ARR[i].totalViews++;

    // Need to place this on parent div and remove once 25 clicks
    document.getElementById(PRODUCTS_ARR[i].HTMLid).addEventListener('click', handleClick);
  }
}

function handleClick(event) {
  event.preventDefault();
  clicks++;

  let parentId = event.target.parentElement.id;

  if (parentId === 'product_0') {
    PRODUCTS_ARR[0].totalVotes++;
  } else if (parentId === 'product_1') {
    PRODUCTS_ARR[1].totalVotes++;
  } else {
    PRODUCTS_ARR[2].totalVotes++;
  }

  if (clicks !== 25) {
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.floor(Math.random() * (PRODUCTS_ARR.length - 4) + 4);

      let item = PRODUCTS_ARR.shift();
      PRODUCTS_ARR.splice(randomNum, 0, item);
    }

    for (let j = 0; j < 3; j++) {
      let parent = document.getElementById(`product_${j}`);
      parent.removeChild(parent.lastChild);
    }

    renderImages();
  } else {
    renderResults();
  }
}

function renderResults() {
  let list = document.getElementById('dataList');

  PRODUCTS_ARR.sort(function(a, b) {
    return b.totalVotes - a.totalVotes;
  });

  for (let i = 0; i < PRODUCTS_ARR.length; i++) {
    let listItem = document.createElement('li');
    list.appendChild(listItem);
    listItem.textContent =`${PRODUCTS_ARR[i].totalVotes} votes for ${PRODUCTS_ARR[i].HTMLid}`;
  }
}

// Shuffle algorithm is Knuth shuffle found - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle() {
  let currentIndex = PRODUCTS_ARR.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Kind of like reverse string algorithm using while loop
    temporaryValue = PRODUCTS_ARR[currentIndex];
    PRODUCTS_ARR[currentIndex] = PRODUCTS_ARR[randomIndex];
    PRODUCTS_ARR[randomIndex] = temporaryValue;
  }
}

shuffle();
renderImages();
