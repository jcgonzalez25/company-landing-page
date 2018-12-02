var TopNavBar={
  adjust: function(){
    var divs = Utilities.getSectionDivs();
    var navbarSize = document.querySelector("#myNavbar").offsetHeight.toString() + "px";
    for(i=2;i<divs.length;i++){
      divs[i].style.position = "relative";
      divs[i].style.top = navbarSize;
    }
  },
  init:function(){
    this.adjust();
  }
};
