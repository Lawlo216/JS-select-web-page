//NAV
function toggle(){
	const sec = document.getElementById('sec');
    const nav = document.getElementById('nav');

	sec.classList.toggle('active');
	nav.classList.toggle('active');
}


//1.Header - Background
const images = ["bg.jpg"];
            const texts = [["TEXTúRE"]];

            rgbKineticSlider = new rgbKineticSlider({
                slideImages: images,
                itemsTitles: texts,

                backgroundDisplacementSprite:
                    "http://hmongouachon.com/_demos/rgbKineticSlider/map-9.jpg",
                cursorDisplacementSprite:
                    "http://hmongouachon.com/_demos/rgbKineticSlider/displace-circle.png",
                cursorImgEffect : true,
                cursorTextEffect : false,

                cursorScaleIntensity: 0.6,
                cursorMomentum: 0.14,

                swipe: true,
                swipeDistance: window.innerWidth * 0.4,
                swipeScaleIntensity: 2,

                slideTransitionDuration: 0.8,
                transitionScaleIntensity: 30,
                transitionScaleAmplitude: 160,

                // nav: true,
                // navElement: ".main-nav",

                imagesRgbEffect: false,
                imagesRgbIntensity: 4,
                navImagesRgbIntensity: 120,

                textsDisplay: true,
                textTitleSize: 144,
                textsTiltEffect: true,
                googleFonts: ["Playfair Display:400"],
                textsRgbEffect: true,
                textsRgbIntensity: 1,
            });

const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');



//2. Tabs 
//Select tab content item
function selectItem(e){
    removeBorder();
    removeShow();
    this.classList.add('tab-border');
    console.log(this.id)
    const tabContentItem = document.querySelector(`#${this.id}-content`);
    tabContentItem.classList.add('show');
}

function removeBorder(){
    tabItems.forEach(item => item.classList.remove('tab-border'));
}

function removeShow(){
    tabContentItems.forEach(item => item.classList.remove('show'));
}

//Listen for tab click
tabItems.forEach(item => item.addEventListener('click', selectItem));



//3.BG-change

const wrapper = document.querySelector('.wrapper');
function bgChanger(){
    if (this.scrollY > this.innerHeight/ .6 ){
        wrapper.classList.add('bg-active');
    } else {
        wrapper.classList.remove('bg-active');
    }
}

window.addEventListener('scroll', bgChanger);



//Counter
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const inc = target / speed;
        
        if(count < target){
            counter.innerText = count + inc;
            setTimeout (updateCount, 1);
        } else {
            count.innerText = target;
        }
    }
    updateCount();
}) 



//Footer
const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function(){
    //Current index of word
    const current = this.wordIndex % this.words.length;
    //Get full text of current word
    const fullTxt = this.words[current];

    //Check if deleting
    if(this.isDeleting){
        //Remove char
        this.txt = fullTxt.substring(0, this.txt.length -1);
    } else {
        //Add char
        this.txt = fullTxt.substring(0, this.txt.length +1);
    }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial Type Speed
    let typeSpeed = 300;

    if(this.isDeleting){
        typeSpeed /= 3;
    }

    //If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        //Make pause at end
        typeSpeed = this.wait;
        //Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt ===''){
        this.isDeleting = false;
        //Move to next word
        this.wordIndex++;
        //Pause before start typing
        typeSpeed = 1000;
    }

    setTimeout(()=> this.type(), typeSpeed)
}



//Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWriter
    new TypeWriter(txtElement, words,wait);
}



// 3D Mouse Hover
animteHover();

function animteHover() {
    var $img = $(".img");

    $img.mousemove(function (e) {
        var xPos = $(this).data("xPos");
        var yPos = $(this).data("yPos");
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        var left = mouseX - xPos;
        var top = mouseY - yPos;
        var origin = "center center -300";
        var xPerc =
            ((left - $(this).data("itemWidth") / 2) / $(this).data("itemWidth")) * 200;
        var yPerc =
            ((top - $(this).data("itemHeight") / 2) / $(this).data("itemHeight")) * 200;

        TweenMax.to($(this).data("imgOuter"), 3, {
            rotationX: 0.1 * yPerc,
            rotationY: -0.1 * xPerc,
            transformOrigin: origin,
            ease: Expo.easeOut,
        });
    });

    $img.each(function () {
        $(this).data("xPos", $(this).offset().left);
        $(this).data("yPos", $(this).offset().top);
        $(this).data("itemWidth", $(this).width());
        $(this).data("itemHeight", $(this).height());
        $(this).data("imgOuter", $(this).find(".img-inner"));
    });

    $img.on("mouseleave", function () {
        TweenMax.to($(this).data("imgOuter"), 3, {
            rotationX: 0,
            rotationY: 0,
            transformOrigin: origin,
            ease: Expo.easeOut,
        });
    });
}




