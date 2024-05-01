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
   document.getElementById('viewmode').href = 'createqrdark.css';
   localStorage.setItem('view', 'dark');
}

function LMode() {
   document.getElementById('viewmode').href = 'createqrlight.css';
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

function showQR() {
   var qrTextValue = 'NA';
   var qrbgValue = $('#in-bgclr').val() || 'NA';
   var qrclrValue = $('#in-qrclr').val() || 'NA';
   var qrsizeValue = $('#in-size').val() || 'NA';
   var qrlogotextValue = $('#in-lgtext').val() || 'NA';

   var logooption = document.getElementById("se-logoopt").value;
   var logoFile = $('#in-custlg')[0].files[0];

   if (logooption === "Custom") {
      document.getElementById("dv-qrcustlg").style.display = "block"
      if (typeof logoFile == 'undefined') {
         return
      }
   }
   if (logooption !== "Custom") {
      document.getElementById("dv-qrcustlg").style.display = "none"
   }

   var userlogo = new FormData();
   userlogo.append('qrtext', qrTextValue);
   userlogo.append('qrbg', qrbgValue);
   userlogo.append('qrclr', qrclrValue);
   userlogo.append('qrsize', qrsizeValue);
   userlogo.append('qrlgopt', logooption);
   userlogo.append('qrlgtxt', qrlogotextValue);


   if (typeof logoFile !== 'undefined') {
      userlogo.append('logoimg', logoFile);
      $.ajax({
         type: 'POST',
         url: 'ConverttoQR',
         data: userlogo,
         processData: false,
         contentType: false,
         success: function (data) {
            var successmessage = '<h2 id="h2-showqr" style="color:#25b04a">Your QR will look like</h2>';
            $('#dv-rigdisqr').html(successmessage);

            var qrimage = '<img src="data:image/png;base64,' + data + '" alt="QR Code" id="im-showqr">';
            $('#dv-rigdisqr').append(qrimage);
         },
         error: function () {
            var errormessage = '<h2 id="h2-showqr" style="color:#eb0909">Error occured, please retry</h2>';
            $('#dv-rigdisqr').html(errormessage);

            var errorimage = '<img th:src="@{/Images/nt.png}" id="im-showqr" height="350px" width="350px" alt="Error">';
            $('#dv-rigdisqr').append(errorimage);
         }
      });
   } else {
      $.ajax({
         type: 'POST',
         url: 'ConverttoQRWL',
         data: userlogo,
         processData: false,
         contentType: false,
         success: function (data) {
            var successmessage = '<h2 id="h2-showqr" style="color:#25b04a">Your QR will look like</h2>';
            $('#dv-rigdisqr').html(successmessage);

            var qrimage = '<img src="data:image/png;base64,' + data + '" alt="QR Code" id="im-showqr">';
            $('#dv-rigdisqr').append(qrimage);
         },
         error: function () {
            var errormessage = '<h2 id="h2-showqr" style="color:#eb0909">Error occured, please retry</h2>';
            $('#dv-rigdisqr').html(errormessage);

            var errorimage = '<img th:src="@{/Images/nt.png}" id="im-showqr" height="350px" width="350px" alt="Error">';
            $('#dv-rigdisqr').append(errorimage);
         }
      });
   }
}


function generateQRCode() {

   var qrTextValue = $('#tx-input').val() || 'NA';
   var qrbgValue = $('#in-bgclr').val() || 'NA';
   var qrclrValue = $('#in-qrclr').val() || 'NA';
   var qrsizeValue = $('#in-size').val() || 'NA';
   var qrlogotextValue = $('#in-lgtext').val() || 'NA';

   var logooption = document.getElementById("se-logoopt").value;

   var userlogo = new FormData();
   userlogo.append('qrtext', qrTextValue);
   userlogo.append('qrbg', qrbgValue);
   userlogo.append('qrclr', qrclrValue);
   userlogo.append('qrsize', qrsizeValue);
   userlogo.append('qrlgopt', logooption);
   userlogo.append('qrlgtxt', qrlogotextValue);

   var logoFile = $('#in-custlg')[0].files[0];

   if (typeof logoFile !== 'undefined') {
      userlogo.append('logoimg', logoFile);
      $.ajax({
         type: 'POST',
         url: 'ConverttoQR',
         data: userlogo,
         processData: false,
         contentType: false,
         success: function (data) {
            var successmessage = '<h2 id="qrmsg" style="color:#25b04a">Conversion Success</h2>';
            $('#dv-rigdisqr').html(successmessage);

            var qrimage = '<img src="data:image/png;base64,' + data + '" alt="QR Code" id="im-suc">';
            $('#dv-rigdisqr').append(qrimage);

            var qrdownloadbutton = '<button id="rbutton">Download QR</button>';
            $('#dv-rigdisqr').append(qrdownloadbutton);

            $('#rbutton').click(function () {
               var downloadLink = document.createElement('a');
               downloadLink.href = 'data:image/png;base64,' + data;
               downloadLink.download = 'QR Code.png';
               downloadLink.click();
            });
         },
         error: function () {
            var errormessage = '<h2 id="qrmsg" style="color:#eb0909">Conversion Failed</h2>';
            $('#dv-rigdisqr').html(errormessage);

            var errorimage = '<img th:src="@{/Images/nt.png}" id="im-fai" height="350px" width="350px" alt="Error">';
            $('#dv-rigdisqr').append(errorimage);

            var retrybutton = '<button id="rbutton" onclick="generateQRCode()">Retry</button>';
            $('#dv-rigdisqr').append(retrybutton);
         }
      });
   } else {
      $.ajax({
         type: 'POST',
         url: 'ConverttoQRWL',
         data: userlogo,
         processData: false,
         contentType: false,
         success: function (data) {
            var successmessage = '<h2 id="qrmsg" style="color:#25b04a">Conversion Success</h2>';
            $('#dv-rigdisqr').html(successmessage);

            var qrimage = '<img src="data:image/png;base64,' + data + '" alt="QR Code">';
            $('#dv-rigdisqr').append(qrimage);

            var qrdownloadbutton = '<button id="rbutton">Download QR</button>';
            $('#dv-rigdisqr').append(qrdownloadbutton);

            $('#rbutton').click(function () {
               var downloadLink = document.createElement('a');
               downloadLink.href = 'data:image/png;base64,' + data;
               downloadLink.download = 'QR Code.png';
               downloadLink.click();
            });
         },
         error: function () {
            var errormessage = '<h2 id="qrmsg" style="color:#eb0909">Conversion Failed</h2>';
            $('#dv-rigdisqr').html(errormessage);

            var errorimage = '<img th:src="@{/Images/nt.png}" id="btmsg" height="350px" width="350px" alt="Error">';
            $('#dv-rigdisqr').append(errorimage);

            var retrybutton = '<button id="rbutton" onclick="generateQRCode()">Retry</button>';
            $('#dv-rigdisqr').append(retrybutton);
         }
      });
   }
}


function triggerlogoupl() {
   document.getElementById('in-custlg').click();
}

function triggerlogoname() {
   var fileInput = document.getElementById('in-custlg');
   var fileDisplay = document.getElementById('h4-logoname');
   document.getElementById("h4-logoname").style.display = "block";
   if (fileInput.files.length > 0) {
      fileDisplay.textContent = 'Uploaded Logo Name : ' + fileInput.files[0].name;
   } else {
      fileDisplay.textContent = 'No logo uploaded';
   }
}

function showsize() {
   var slider = document.getElementById("in-size");
   var output = document.getElementById("in-pxvalue");
   output.innerHTML = slider.value;
}

function chbxcheck() {
   document.getElementById("cx-ycs").checked = true;
}

function custchbx(obj) {
   var that = obj;
   if (document.getElementById(that.id).checked == true) {
      document.getElementById('cx-ycs').checked = false;
      document.getElementById('cx-ncs').checked = false;
      document.getElementById(that.id).checked = true;
   }
   if ((document.getElementById('cx-ycs').checked == false) && (document.getElementById('cx-ncs').checked == false)) {
      document.getElementById(that.id).checked = true;
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

function showqrclr() {
   document.getElementById("dv-qrbg").style.display = "block";
   document.getElementById("dv-qrclr").style.display = "block";
   document.getElementById("bt-downclr").style.display = "none";
   document.getElementById("bt-upclr").style.display = "inline";
   hideqrsize()
   hideqrlogo()
}

function hideqrclr() {
   document.getElementById("dv-qrbg").style.display = "none";
   document.getElementById("dv-qrclr").style.display = "none";
   document.getElementById("bt-upclr").style.display = "none";
   document.getElementById("bt-downclr").style.display = "inline";
}

function showqrsize() {
   document.getElementById("dv-qrsizefm").style.display = "block";
   document.getElementById("bt-downsize").style.display = "none";
   document.getElementById("bt-upsize").style.display = "inline";
   hideqrclr()
   hideqrlogo()
}

function hideqrsize() {
   document.getElementById("dv-qrsizefm").style.display = "none";
   document.getElementById("bt-upsize").style.display = "none";
   document.getElementById("bt-downsize").style.display = "inline";
}

function showqrlogo() {
   document.getElementById("dv-qrlogo").style.display = "block";
   var logooption = document.getElementById("se-logoopt").value;
   if (logooption === "Custom") {
      document.getElementById("dv-qrcustlg").style.display = "block"
   }
   document.getElementById("dv-qrlogotext").style.display = "block";
   document.getElementById("bt-downlogo").style.display = "none";
   document.getElementById("bt-uplogo").style.display = "inline";
   hideqrclr()
   hideqrsize()
}

function hideqrlogo() {
   document.getElementById("dv-qrlogo").style.display = "none";
   document.getElementById("dv-qrcustlg").style.display = "none";
   document.getElementById("dv-qrlogotext").style.display = "none";
   document.getElementById("bt-uplogo").style.display = "none";
   document.getElementById("bt-downlogo").style.display = "inline";
}

function disableall() {
   document.getElementById("dv-qrsize").style.display = "none";
   document.getElementById("dv-qrclropt").style.display = "none";
   document.getElementById("dv-qrlogoopt").style.display = "none";
}

function enableall() {
   document.getElementById("dv-qrsize").style.display = "block";
   document.getElementById("dv-qrclropt").style.display = "block";
   document.getElementById("dv-qrlogoopt").style.display = "block";
   var logooption = document.getElementById("se-logoopt").value;
   if (logooption === "Custom") {
      document.getElementById("dv-qrcustlg").style.display = "block"
   }
}