/*onmousemove = function(e){console.log("mouse location:", e.clientX, e.clientY)}*/

/*const parallax = document.querySelector('#parallax')

document.addEventListener('mousemove', parallaxFunc);
*/

/*function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

function parallaxFunc(e) {
    e.clientX 
}*/

let arrow = document.getElementById("arrow");
let arrowHeader = document.getElementById("arrowHeader");

var myScrollFunc = function() {
  var y = window.scrollY;
  const rect = arrow.getBoundingClientRect();
  if (y >= rect.bottom) {
    arrow.className = "hide"
    arrowHeader.className = "hide"
  } else {
    arrow.className = "show"
    arrowHeader.className = "show"
  }
};

function elementInViewport2(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;
  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

let aniBottom = document.querySelectorAll('.aniBottom'); 
function animateIfScrolled() {
  for(let i =0;i<aniBottom.length; i++)
  if(elementInViewport2(aniBottom[i])){
    aniBottom[i].classList.add("animateFromBottom");
    aniBottom[i].classList.remove("animateFadeOut");
  }else{
    aniBottom[i].classList.add("animateFadeOut");
    aniBottom[i].classList.remove("animateFromBottom");
  }
}

window.addEventListener("scroll", function(){
  myScrollFunc();
  animateIfScrolled();
})
