    console.log("bulb game ready");

    var evidence = document.querySelector(".evidence-window p1");
    var question = document.querySelector(".question-window p1");
    var hint = document.querySelector(".hint-window p1");

    var lightBtn = document.getElementById("light-btn");
    var hintsBox = document.getElementById("hints-container");
    var clickCount = 0;

    var imageViewer = document.getElementById("image-viewer");
    var viewerImg = document.getElementById("viewer-img");
    var backBtn = document.getElementById("back-btn");
    var collectedHints = document.getElementById("collected-hints");
    var hintText = document.getElementById("hint-text");

    var currentHint = null;
    var collectedCount = 0;

    lightBtn.onclick = function() {
      clickCount++;
      if (clickCount == 10) {
          document.body.classList.add("flash");
          
          setTimeout(function() {
              document.body.classList.remove("flash");
              lightBtn.style.display = "none";
              hintsBox.style.display = "flex";
              hintText.innerText = "analyze the hints";
          }, 10);
      }
    }

    var openImage = function(btn, imgName) {
        console.log("trying to open: " + imgName);
        imageViewer.style.display = "flex";
        viewerImg.src = imgName;
        currentHint = btn;
    }

    document.getElementById("hint1").onclick = function() {
        openImage(this, "image1.png");
    }

    document.getElementById("hint2").onclick = function() {
        openImage(this, "image2.png");
    }

    document.getElementById("hint3").onclick = function() {
        openImage(this, "image3.png");
    }

    document.getElementById("hint4").onclick = function() {
        openImage(this, "image4.png");
    }

    backBtn.onclick = function() {
        imageViewer.style.display = "none";
        
        if (currentHint.parentNode.id === "hints-container") {
            collectedHints.appendChild(currentHint);
            collectedCount++;
            
            if (collectedCount == 4) {
                hintsBox.style.display = "none";
            }
        }
    }