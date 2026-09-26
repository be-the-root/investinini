    var btn = document.getElementById("continue-btn");
  var warn = document.getElementById("warning-screen");
 var inst = document.getElementById("instruction-screen");
var btn2 = document.getElementById("continue-btn2");

    btn.onclick = function() {
      warn.style.display = "none";
    inst.style.display = "flex";
    }

    btn2.onclick = function() {
    window.location.href = "game.html";
    }