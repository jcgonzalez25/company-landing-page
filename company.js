var applicationState = document.getElementById("home");
var divSize = document.getElementById("home").offsetHeight;

(function() {
  Capabilities.init();
  TopNavBar.init();
  adjustNavbar();
  adjustInfoDivs();
  disableScroll();
  addNavBar();
})();

function adjustInfoDivs() {
  var sections = [".what_we_do", ".contactus", ".footage"];
  var navSize = document.querySelector("#myNavbar").offsetHeight + "px";
  sections.forEach(function(divName) {
    document.querySelector(divName).style.paddingTop = navSize;
  });
}

function preventDefaultForScrollKeys(e) {
  if (e.key == "ArrowDown" || e.key == "ArrowUp")
    e.preventDefault();
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
    e.preventDefault();
  e.preventDefault();
  e.returnValue = false;
}

function disableScroll() {
  if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
  }
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  document.onkeydown = preventDefaultForScrollKeys;
}

function showOrDont(elementId) {
  var e = document.querySelector(elementId);
  console.log(e);
  if (e.className.indexOf(" w3-show") != -1)
    e.className = e.className.replace(" w3-show", " w3-hide");
}

function fixHomeClickDefault() {
  var homeButton = document.querySelector('a[href="#home"]');

  homeButton.addEventListener("click", function() {
    showOrDont("#navDemo");
  });

}

function adjustNavbar() {
  //fixHomeClickDefault();
  var divs = Utilities.getSectionDivs();
  var navbarSize = document.querySelector("#myNavbar").offsetHeight.toString() + "px";
  for (i = 2; i < divs.length; i++) {
    divs[i].style.position = "relative";
    divs[i].style.top = navbarSize;
  }
}

function onClick(element) {
  var captionText = document.getElementById("caption");
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  captionText.innerHTML = element.alt;
}
// Change style of navbar on scroll

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction(ev) {
  var choosenSection = ev.target.tagName == 'A' ? ev.target.id : null;
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
    Utilities.slideTo(choosenSection);
  }
}
// CAPABILITIES Section JS
var focusedCapability = null;

function show(section) {
  var e = document.querySelector('.' + section);
  if (e.className.indexOf(" w3-show") == -1) {
    if (focusedCapability !== null)
      focusedCapability.className = focusedCapability.className.replace(" w3-show", " w3-hide");
    e.className = e.className.replace(" w3-hide", " w3-show");
    focusedCapability = e;
  } else {
    e.className = e.className.replace(" w3-show", " w3-hide");
  }
}

//side navigation menu
var def = "";
var sideNav;

function addLinks(ParentElement) {
  var homeLink, whatWeDoLink, footageLink, contactUsLink;
  homeLink      = document.createElement("a");
  whatWeDoLink  = document.createElement("a");
  footageLink   = document.createElement("a");
  contactUsLink = document.createElement("a");
  links         = [homeLink, whatWeDoLink, footageLink, contactUsLink];

  links.forEach(function(element, index) {
    var textNode,id="";
    switch (index) {
      case 0:
        innerContent = "Home";
        id           = "home";
        element.href = "#home";
        break;
      case 1:
        id           = "what_we_do";
        innerContent = "What We Do";
        element.href = "#what_we_do";
        break;
      case 2:
        innerContent = "Footage";
        id           = "footage";
        element.href = "#footage";
        break;
      case 3:
        innerContent = "Contact Us";
        id           = "contact_us";
        element.href = "#contact_us";
    }
    element.innerHTML = innerContent;
    ParentElement.appendChild(element);
  });
  return ParentElement;
}

function createSideNav() {
  var sideNav_element, name, arr;
  sideNav_element = document.createElement("div");
  name = "sideNav";
  arr = sideNav_element.className.split(" ");
  if (arr.indexOf(name) == -1) {
    sideNav_element.className += " " + name;
  }
  sideNav_element = addLinks(sideNav_element);
  sideNav_element.setAttribute("class", "sidenav");
  sideNav_element.setAttribute("id", "mySidenav");
  sideNav_element.style.width="0px";
  return sideNav_element;
}

function addNavBar() {
  var sideNav = createSideNav();
  applicationState.appendChild(sideNav);

}
function blurBackground(opening){
  var elements =  document.querySelectorAll(".contactus,.footage,.what_we_do");
  for(i=0;i<elements.length;i++)
    elements[i].style.filter = opening?"blur(5px)":null;
}
function openNav() {
  document.getElementById("mySidenav").setAttribute("onclick","closeNav()");
  document.getElementById("whopper_button").setAttribute("onclick","closeNav()");
  document.getElementById("mySidenav").style.width = "100%";
  blurBackground(true);
}

function closeNav() {
  blurBackground(false);
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").setAttribute("onclick","openNav()");
  document.getElementById("whopper_button").setAttribute("onclick","openNav()");
}
