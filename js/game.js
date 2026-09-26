    console.log("bulb game ready");

    var evidence = document.querySelector(".evidence-window p1");
    var question = document.querySelector(".question-window p1");
    var hint = document.querySelector(".hint-window p1");

    var lightBtn = document.getElementById("light-btn");
    var hintsBox = document.getElementById("hints-container");
    var clickCount = 0;

    lightBtn.onclick = function() {
      clickCount++;
      if (clickCount == 10) {
          document.body.classList.add("flash");
          
          setTimeout(function() {
              document.body.classList.remove("flash");
              lightBtn.style.display = "none";
              hintsBox.style.display = "flex";
          }, 10);
      }
    }