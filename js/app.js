'use strict';

let PRODUCTS_ARR = [
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

//-----------------------------------------------------------
//
// Renders images onto the DOM, accumulates totalViews, and adds eventListeners on images
//
//-----------------------------------------------------------
function renderImages() {
  // Runs 3 times for first 3 array elements
  for (let i = 0; i < 3; i++) {
    let imgContainer = document.getElementById(`product_${i}`);
    let img = document.createElement('img');
    imgContainer.appendChild(img);

    img.setAttribute('class', 'item');
    img.setAttribute('id', PRODUCTS_ARR[i].HTMLid);
    img.setAttribute('src', PRODUCTS_ARR[i].imgURL);

    PRODUCTS_ARR[i].totalViews++;
  }
}

//-----------------------------------------------------------
//
// Once click is made on image is increments clicks, and increments votes
// Takes away images, and either calls renderImages or renderResults
//
//-----------------------------------------------------------
function handleClick(event) {
  event.preventDefault();
  clicks++;

  let parentId = event.target.id;
  let childEl = event.target;
  console.log(childEl);

  // Whichever was selected, increment votes
  if (parentId === 'product_0' || parentId === PRODUCTS_ARR[0].HTMLid) {
    console.log(PRODUCTS_ARR[0]);
    PRODUCTS_ARR[0].totalVotes++;
  } else if (parentId === 'product_1' || parentId === PRODUCTS_ARR[1].HTMLid) {
    console.log(PRODUCTS_ARR[1]);
    PRODUCTS_ARR[1].totalVotes++;
  } else {
    console.log(PRODUCTS_ARR[2]);
    PRODUCTS_ARR[2].totalVotes++;
  }

  if (clicks !== 25) {
    // Remove first 3 array elements and splice to random locations > index 2
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.floor(Math.random() * (PRODUCTS_ARR.length - 4) + 4);

      let item = PRODUCTS_ARR.shift();
      PRODUCTS_ARR.splice(randomNum, 0, item);
    }

    setStorage(PRODUCTS_ARR);

    // Removes each image from the DOM and call renderImages() for next 3
    for (let j = 0; j < 3; j++) {
      let parent = document.getElementById(`product_${j}`);
      parent.removeChild(parent.lastChild);
    }

    renderImages();
  } else {
    let divs = document.getElementsByTagName('div');

    for (let y = 1; y < divs.length - 1; y++) {
      divs[y].removeEventListener('click', handleClick);
    }

    renderResults();
  }
}

//-----------------------------------------------------------
//
// Renders list elements containing the final image votes on the DOM
//
//-----------------------------------------------------------
function renderResults() {
  let list = document.getElementById('dataList');

  // sort array from most votes to least
  PRODUCTS_ARR.sort(function(a, b) {
    return b.totalVotes - a.totalVotes;
  });

  for (let i = 0; i < PRODUCTS_ARR.length; i++) {
    let listItem = document.createElement('li');
    list.appendChild(listItem);
    listItem.textContent =`${PRODUCTS_ARR[i].totalVotes} votes for ${PRODUCTS_ARR[i].HTMLid}`;
  }

  renderChart();
}

//-----------------------------------------------------------
//
// Renders bar graph reflecting data
//
//-----------------------------------------------------------
function renderChart() {
  const barData = {
    type: 'bar',
    data: {
      labels : [],
      datasets : [
        {
          data : [],
          backgroundColor : 'rgb(64, 211, 191)',
          borderColor : 'rgb(46, 146, 133)',
          pointBackgroundColor: 'rgb(46, 135, 100)',
        }
      ]
    },
    options: {
      scales: {
        xAxes: [{
          maxBarThickness: 30,
        }],
        yAxes: [{
          ticks: {stepSize: 1},
          gridLines: {
            offsetGridLines: false
          },
          maintainAspectRatio: false,
        }]
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Final Vote Data'
      }
    }
  };

  let container = document.getElementById('graph');

  let canvas = document.createElement('Canvas');
  let ctx = canvas.getContext('2d');

  container.appendChild(canvas);

  for (let i = 0; i < PRODUCTS_ARR.length; i++) {
    barData.data.labels.push(PRODUCTS_ARR[i].HTMLid);

    barData.data.datasets[0]['data'].push(PRODUCTS_ARR[i].totalVotes);
  }

  new Chart(ctx, barData);
}

//-----------------------------------------------------------
//
// Shuffle algorithm to shuffle array of objects to ensure randomness
// Shuffle algorithm is Knuth shuffle found - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//
//-----------------------------------------------------------
// Possibly change to only make first three random rather than shuffle
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

//-----------------------------------------------------------
//
// Sets PRODUCT_ARR and clicks to local storage
//
//-----------------------------------------------------------
function setStorage(data) {
  localStorage.setItem('productsData', JSON.stringify(data));
  localStorage.setItem('clickCount', clicks);
}

//-----------------------------------------------------------
//
// IIFE which either starts poll, continues poll, or renders results
//
//-----------------------------------------------------------
(function startPoll() {
  let ls = localStorage;

  // Add event listeners to parent div
  for (let i = 0; i < 3; i++) {
    let imgContainer = document.getElementById(`product_${i}`);

    imgContainer.addEventListener('click', handleClick);
  }

  // If storage exists get local storage and assign to variables
  if (ls.getItem('productsData')) {
    let data = JSON.parse(ls.getItem('productsData'));
    let clickCount = parseInt(ls.getItem('clickCount'));

    clicks = clickCount;
    PRODUCTS_ARR = data;

    // if clicks !== 25 render images
    if (ls.getItem('clickCount') !== '25') {
      renderImages();

    // if clicks === 25 render results
    } else {
      renderResults();
    }

  // if no storage, start poll
  } else {
    console.log('hello');
    shuffle();
    renderImages();
  }
})();
