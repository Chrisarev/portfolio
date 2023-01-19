let title = document.querySelector("#container p");
let secondPanelTitle = document.querySelector("#firstHeader");
/*window.addEventListener("scroll", function() {
if (window.scrollY > (secondPanelTitle.offsetTop + secondPanelTitle.offsetHeight)){
    secondPanelTitle.classList.add("animate")
}else{
    secondPanelTitle.classList.remove('animate')
}
})*/

/* Checks to see if an element is halfway visible*/
function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:

    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    var isVisible = (elemTop >= 0) && (elemBottom <= (window.innerHeight+window.innerHeight/3.5));
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

function isVisibleAndAnimateTop(el){
    if(isScrolledIntoView(el)){
        el.classList.remove('animateFadeOut');
        el.classList.add('animateFromTop');
    }else{
        el.classList.add('animateFadeOut');
        el.classList.remove('animateFromTop');
        el.style.opacity="0"; 
    }
}

function isVisibleAndAnimateBottom(el){
    if(isScrolledIntoView(el)){
        el.classList.remove('animateFadeOut');
        el.classList.add('animateFromBottom');
    }else{
        el.classList.remove('animateFromBottom');
        el.classList.add('animateFadeOut');
        el.style.opacity="0"; 
    }
}

function scrollFunc(){
    /* Adds animateFromTop class to elements with fromTop class when they come into view, remove animateFromTop class when they exit view*/
    let secondArr = document.querySelectorAll('.fromTop');
    for(let i=0; i< secondArr.length; i++){
        if (this.window.scrollY > (secondArr[i].offsetTop + secondArr[i].offsetHeight)){
            secondArr[i].classList.add('animateFromTop'); 
        }else{
            secondArr[i].classList.remove('animateFromTop'); 
        }
    }
    
    
    /* Adds animateFromBottom class to elements with fromBottom class when they come into view, remove animateFromBottom class when they exit view*/
    secondArr = document.querySelectorAll('.fromBottom');
    for(let i=0; i< secondArr.length; i++){
        if (this.window.scrollY > (secondArr[i].offsetTop + secondArr[i].offsetHeight)){
            secondArr[i].classList.remove('animateFadeOut');
            secondArr[i].classList.add('animateFromBottom'); 
        }else{
            secondArr[i].classList.add('animateFadeOut');
            secondArr[i].classList.remove('animateFromBottom'); 
        }
    }
    
    /*let projHeader = document.querySelector('.projHeader');*/
    let inpHolder = document.querySelector('.inputHolder');
    let projCards = document.querySelectorAll('.projCard');
    let contactHeader = document.querySelector('.contactHeader');
    
    isVisibleAndAnimateTop(inpHolder); 
    /*isVisibleAndAnimateTop(projHeader); */
    isVisibleAndAnimateTop(contactHeader); 
    
    for(let i=0; i< projCards.length; i++){
        isVisibleAndAnimateTop(projCards[i])
    }
    

}

let myMediaQuery = window.matchMedia('(min-height: 386px)');
 
function widthChangeCallback(myMediaQuery) {
  if(myMediaQuery.matches) {
    window.addEventListener('scroll', scrollFunc)
   } else{
    window.removeEventListener('scroll', scrollFunc)
    body.style.opacity="1";
   }
}
 
myMediaQuery.addEventListener('change', widthChangeCallback);

	
widthChangeCallback(myMediaQuery);