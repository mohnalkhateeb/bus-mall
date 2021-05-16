'use strict'
let productsImage = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg',
'dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg',
'water-can.jpg','wine-glass.jpg']
let indexleftImg;
let indexrightImg;
let indexmidImg;
let leftImgEl = document.getElementById('leftImg');
let rightImgEl = document.getElementById('rightImg');
let midImgEl=document.getElementById('midImg');
let product = [];
function ProductImage(productName) {
    this.productName = productName.split('.')[0];
    this.source = 'img/' + productName;
    this.vote = 0;
    this.seen = 0;
    product.push(this);
}
for (let i = 0; i < productsImage.length; i++) {
    new ProductImage(productsImage[i]);
}
function generateprductImage() {
    //0-1 >> 0-7
    return Math.floor(Math.random() * product.length);
}
function renderImg() {
    indexleftImg = generateprductImage();
    indexmidImg= generateprductImage();
    indexrightImg = generateprductImage();

    while (indexleftImg === indexmidImg || indexleftImg === indexrightImg || indexmidImg === indexrightImg) {
        indexleftImg = generateprductImage();
        indexmidImg=generateprductImage()

    }

    leftImgEl.setAttribute('src', product[indexleftImg].source);
    leftImgEl.setAttribute('title', product[indexleftImg].source);
    product[indexleftImg].seen++;

    midImgEl.setAttribute('src', product[indexmidImg].source);
    midImgEl.setAttribute('title', product[indexmidImg].source);
    product[indexmidImg].seen++;

    rightImgEl.setAttribute('src', product[indexrightImg].source);
    rightImgEl.setAttribute('title', product[indexrightImg].source);
    product[indexrightImg].seen++;
    
}
renderImg();
let round=0;
let maxround =25;
leftImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);
midImgEl.addEventListener('click',handelClicks);
function handelClicks(event) {
    round++;
    let spanEl = document.getElementById('votes') 
    
    if (round <= maxround) {
        if (event.target.id === 'leftImg') {
            product[indexleftImg].vote++;
        } else if (event.target.id === 'midImg') {
            product[indexrightImg].vote++;
        } else if (event.target.id === 'rightImg') {
            product[indexrightImg].vote++; 
        }
        renderImg();
        spanEl.textContent=round;
    }else{
        leftImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
        midImgEl.removeEventListener('click',handelClicks)
    }
}

let resultButton = document.getElementById('viewResult')
resultButton.addEventListener('click',viewResult)

function viewResult(event)
{
    event.preventDefault();
    let ulEl = document.getElementById('result');
    let liEl;
    if(round >= maxround){ for (let i = 0; i < product.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${product[i].productName} has ${product[i].vote} votes and was seen ${product[i].seen} times.`
        }
    }
       
        
}