    var btn = document.getElementById("continue-btn");
  var warn = document.getElementById("warning-screen");
 var inst = document.getElementById("instruction-screen");

    btn.onclick = function() {
      warn.style.display = "none";
    inst.style.display = "flex";
    }