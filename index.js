$(document).ready(function () {
   $("#bt-starrating1").hover(function () {
      $(this).addClass("hovered");
   }, function () {
      $(this).removeClass("hovered");
   });

   $("#bt-starrating2").hover(function () {
      $("#bt-starrating1").addClass("hovered");
      $(this).addClass("hovered");
   }, function () {
      $("#bt-starrating1").removeClass("hovered");
      $(this).removeClass("hovered");
   });

   $("#bt-starrating3").hover(function () {
      $("#bt-starrating1, #bt-starrating2").addClass("hovered");
      $(this).addClass("hovered");
   }, function () {
      $("#bt-starrating1, #bt-starrating2").removeClass("hovered");
      $(this).removeClass("hovered");
   });

   $("#bt-starrating4").hover(function () {
      $("#bt-starrating1, #bt-starrating2, #bt-starrating3").addClass("hovered");
      $(this).addClass("hovered");
   }, function () {
      $("#bt-starrating1, #bt-starrating2, #bt-starrating3").removeClass("hovered");
      $(this).removeClass("hovered");
   });

   $("#bt-starrating5").hover(function () {
      $("#bt-starrating1, #bt-starrating2, #bt-starrating3, #bt-starrating4").addClass("hovered");
      $(this).addClass("hovered");
   }, function () {
      $("#bt-starrating1, #bt-starrating2, #bt-starrating3, #bt-starrating4").removeClass("hovered");
      $(this).removeClass("hovered");
   });
});


var prevScrollpos = window.scrollY;
window.onscroll = function () {
   var currentScrollPos = window.scrollY;
   if (prevScrollpos > currentScrollPos) {
      document.getElementById("dv-header").style.top = "0";
   } else {
      document.getElementById("dv-header").style.top = "-150px";
   }
   prevScrollpos = currentScrollPos;
}

function DMode() {
   document.getElementById('viewmode').href = 'indexdark.css';
   localStorage.setItem('view', 'dark');
}

function LMode() {
   document.getElementById('viewmode').href = 'indexlight.css';
   localStorage.setItem('view', 'light');
}

function Modepreference() {
   const view = localStorage.getItem('view');
   if (view === 'dark') {
      DMode();
   } else {
      LMode();
   }
}

Modepreference();