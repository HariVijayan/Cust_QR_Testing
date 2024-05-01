function triggerfupl() {
   document.getElementById('in-decqr').click();
}

function triggerfilename() {
   var fileInput = document.getElementById('in-decqr');
   var fileDisplay = document.getElementById('h4-filename');
   if (fileInput.files.length > 0) {
      fileDisplay.textContent = 'Uploaded File Name : ' + fileInput.files[0].name;
   } else {
      fileDisplay.textContent = 'No file selected';
   }
}

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

function copyresult() {
   var decodedTextElement = document.getElementById('h2-decmsg');
   var decodedText = decodedTextElement.textContent;
   var dataPart = decodedText.replace('Decoded Text : ', '');
   navigator.clipboard.writeText(dataPart)
}

function decodeQRCode() {
   var formData = new FormData();
   formData.append('todecode', $('#in-decqr')[0].files[0]);


   var fileReader = new FileReader();

   fileReader.onload = function (event) {
      var userimage = '<h2 id="h2-userimg">Uploaded Image</h2>';
      $('#dv-decodeimg').html(userimage);

      var imageUrl = event.target.result;
      $('#dv-decodeimg').append('<img src="' + imageUrl + '" alt="Uploaded Image" id="im-userqr">');
   };

   fileReader.readAsDataURL(formData.get('todecode'));

   $.ajax({
      type: 'POST',
      url: 'decodeQR',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
         if (data != "QR code not found in the image") {
            var decstate = '<h2 id="h2-decstate-s">Decode Success</h2> <span class="material-symbols-outlined" id="bt-copy" onclick="copyresult()" title="Copy Decoded Text">content_copy</span>';
            $('#dv-decodetext').html(decstate);

            var dmsg = '<h2 id="h2-decmsg">Decoded Text : <br>' + data + '</h2>';
            $('#dv-decodetext').append(dmsg);
         } else {
            var decstate = '<h2 id="h2-decstate-f">Decode Failed</h2>';
            $('#dv-decodetext').html(decstate);

            var demsg = '<h2 id="h2-decmsg">Either there is no QR present in the image or it may be unreadable</h2>';
            $('#dv-decodetext').append(demsg);
         }
      },
      error: function () {
         var decstate = '<h2 id="h2-decstate-f">Decode Failed</h2>';
         $('#dv-decodetext').html(decstate);

         var demsg = '<h2 id="h2-decmsg">Either there is no QR present in the image or it may be unreadable</h2>';
         $('#dv-decodetext').html(demsg);
      }
   });
}

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


function DMode() {
   document.getElementById('viewmode').href = 'decodedark.css';
   localStorage.setItem('view', 'dark');
}

function LMode() {
   document.getElementById('viewmode').href = 'decodelight.css';
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