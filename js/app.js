'use strict'
let productsImage = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg',
'dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg',
'water-can.jpg','wine-glass.jpg']
let indexleftImg = 0
let indexrightImg =0
let indexmidImg = 0
let indecesArr= [];
let leftImgEl = document.getElementById('leftImg');
let rightImgEl = document.getElementById('rightImg');
let midImgEl=document.getElementById('midImg');
let product = [];
let productNameArr = [];
let productVoteArr = [];
let productSeenArr = [];
// creete the ProductImage Constructure 
function ProductImage(productName) {
    this.productName = productName.split('.')[0];
    this.source = 'img/' + productName;
    this.vote = 0;
    this.seen = 0;
    product.push(this);
    productNameArr.push(this.productName)
    //settingItems();
}
// fill the array of object 
for (let i = 0; i < productsImage.length; i++) {
    new ProductImage(productsImage[i]);
}
// to create the random number to chooose the image randomly 
function generateprductImage() {
    //0-1 >> 0-7
    return Math.floor(Math.random() * product.length);
}
// to render image 
function renderImg(){
    
    indexleftImg = generateprductImage();
    indexmidImg= generateprductImage();
    indexrightImg = generateprductImage();
    while(  indexleftImg === indexmidImg || indexleftImg === indexrightImg || indexmidImg === indexrightImg ||
        indecesArr.indexOf(indexleftImg) != -1 || indecesArr.indexOf(indexmidImg) != -1 || indecesArr.indexOf(indexrightImg) != -1)
         {
        indexleftImg = generateprductImage();
        indexmidImg= generateprductImage();
        indexrightImg = generateprductImage();
    }
    indecesArr = [indexleftImg,indexmidImg,indexrightImg]
    leftImgEl.setAttribute('src', product[indexleftImg].source);
    leftImgEl.setAttribute('title', product[indexleftImg].source);
    product[indexleftImg].seen++;

    midImgEl.setAttribute('src', product[indexmidImg].source);
    midImgEl.setAttribute('title', product[indexmidImg].source);
    product[indexmidImg].seen++;

    rightImgEl.setAttribute('src', product[indexrightImg].source);
    rightImgEl.setAttribute('title', product[indexrightImg].source);
    product[indexrightImg].seen++;


        //console.log(indecesArr)
    
    /*for (let x=0;x<indecesArr.length;x++)
    {
        if (indexleftImg === tempindexArr[x] )
        {indexleftImg=generateprductImage()
        indecesArr[0]=indexleftImg;}
        
    }
    for (let y=0;y<indecesArr.length;y++)
    {
        if (indexmidImg === tempindexArr[y] || indexleftImg === indexmidImg || indexleftImg === indexrightImg || indexmidImg === indexrightImg)
        {indexmidImg=generateprductImage()
        indecesArr[1]=indexmidImg;}
        
    }
    for (let z=0;z<indecesArr.length;z++)
    {
        if (indexrightImg === indecesArr[z] ||indexleftImg === indexmidImg || indexleftImg === indexrightImg || indexmidImg === indexrightImg)
        {indexrightImg=generateprductImage()
        indecesArr[2]=indexrightImg}
    }*/
    
}  
renderImg();
let round=0;
let maxround =25;
// view result 
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
        resultButton.disabled=false;
    }
    
}
// show result in the ul element 
let resultButton = document.getElementById('viewResult')
resultButton.addEventListener('click',viewResult)
function viewResult()
{
    
    let ulEl = document.getElementById('result');
    ulEl.textContent=''
    let liEl;
        for (let i = 0; i < product.length; i++)
         {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${product[i].productName} has ${product[i].vote} votes and was seen ${product[i].seen} times.`
            productVoteArr.push(product[i].vote)
            productSeenArr.push(product[i].seen)
         }
         
           chartrender()
       
        resultButton.disabled=true;
    
        settingItems();   
        
}
resultButton.removeEventListener('click',viewResult)
resultButton.addEventListener('click',viewResult)
// create chart 
function chartrender(){
let  ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productNameArr,
        datasets: [{
            label: '# of Votes',
            data: productVoteArr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                
                'rgba(255, 206, 86, 1)',
                
            ],
            borderWidth: 2
            
        },{ label: '# of seen',
        data: productSeenArr,
        backgroundColor: [
            
            'rgba(153, 102, 255, 0.2)',
            
        ],
        borderColor: [
            
            'rgba(54, 162, 235, 1)',
            
        ],
        borderWidth: 2}]
        
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}
// sotoring in local storge 
function settingItems() {
    let data = JSON.stringify(product);
    //console.log(data)
    localStorage.setItem('Product', data);
}
// getting data from local storge 
function gettingItems() {
    let stringObj = localStorage.getItem('Product');
    // console.log(stringObj);
    let normalObj = JSON.parse(stringObj);
    // console.log(normalObj);
    if (normalObj !== null) {
        product = normalObj;
    }
    //viewResult()
    
}
gettingItems();