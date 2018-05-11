// Modal Image Gallery
window.onload = main();
const divSize = document.getElementById("home").offsetHeight;
function main(){
  window.onscroll = function() {scrollCheck();};
  adjustNavbar();
}

function adjustNavbar(){
    var divs = getDivs();
    var navbarSize = document.querySelector("#myNavbar").offsetHeight.toString() + "px";
    
    for(i=2;i<divs.length;i++){
      divs[i].style.position = "relative";
      divs[i].style.top = navbarSize;

    }
}
function getDivs(){
  let sections = document.body.childNodes;
  let mainDivs = [];
  for(i=0;i<sections.length;i++){
    let tempDiv = sections[i];
    if(tempDiv.tagName == 'DIV')
      mainDivs.push(tempDiv);
  }
  return mainDivs;
}

function onClick(element) {
  var captionText = document.getElementById("caption");
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  captionText.innerHTML = element.alt;
}
// Change style of navbar on scroll
function scrollCheck() {
    var navbar = document.getElementById("myNavbar");
    var window_position = document.documentElement.scrollTop;
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white" + " adjust";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}
function scrollIt(destination, duration = 200, easing = 'easeOutQuad', callback) {
  // Predefine list of available timing functions
  // If you need more, tween js is full of great examples
  // https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L421-L737
  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };


  // Store initial position of a window and time
  // If performance is not available in your browser
  // It will fallback to new Date().getTime() - thanks IE < 10
  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  // const startTime = typeof(window.performance['now']) == 'function' ? performance.now() : new Date().getTime();


  // Take height of window and document to sesolve max scrollable value
  // Prevent requestAnimationFrame() from scrolling below maximum scollable value
  // Resolve destination type (node or number)
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);


  // If requestAnimationFrame is not supported
  // Move window to destination position and trigger callback function
  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }


  // function resolves position of a window and moves to exact amount of pixels
  // Resolved by calculating delta and timing function choosen by user
  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    // Stop requesting animation when window reached its destination
    // And run a callback function
    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    // If window still needs to scroll to reach destination
    // Request another scroll invokation
    requestAnimationFrame(scroll);
  }


  // Invoke scroll and sequential requestAnimationFrame
  scroll();
}
function slideTo(sect){
  if(sect == ".what_we_do" || sect == ".footage" || sect == ".contactus")
    scrollIt(document.querySelector(sect),500,'easeOutQuad');
}
// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction(ev) {
    var choosenSection = ev.target.tagName == 'A'? ev.target.id : null;
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    }else{
        x.className = x.className.replace(" w3-show", "");
        slideTo(choosenSection);
    }
}


// CAPABILITIES Section JS

function show(section){
  let e = document.querySelector( '.' + section );
  if(e.className.indexOf(" w3-show") == -1){
    e.className = e.className.replace(" w3-hide", " w3-show");
  }else{
    e.className = e.className.replace(" w3-show", " w3-hide");
  }
}
