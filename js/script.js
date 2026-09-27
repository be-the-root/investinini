    var btn = document.getElementById("continue-btn");
  var warn = document.getElementById("warning-screen");
 var inst = document.getElementById("instruction-screen");
var btn2 = document.getElementById("continue-btn2");

    var glitch = document.getElementById("glitch1");
    var title = document.getElementById("main-title");

    var loadingScreen = document.getElementById("loading-screen");
    var menuScreen = document.getElementById("menu-screen");
    var settingsScreen = document.getElementById("settings-screen");
    var creditsScreen = document.getElementById("credits-screen");

    var loadBar = document.getElementById("load-bar");
    var loadTip = document.getElementById("load-tip");

    var menuStart = document.getElementById("menu-start");
    var menuSettings = document.getElementById("menu-settings");
    var menuCredits = document.getElementById("menu-credits");

    var settingsBack = document.getElementById("settings-back");
    var creditsBack = document.getElementById("credits-back");

    var toggleGlitch = document.getElementById("toggle-glitch");
    var toggleSpeed = document.getElementById("toggle-speed");
    var toggleStatic = document.getElementById("toggle-static");

    var whisperBox = document.getElementById("whisper-box");

    var phoneOverlay = document.getElementById("phone-overlay");
    var phoneText = document.getElementById("phone-text");
    var phoneButtons = document.getElementById("phone-buttons");
    var answerBtn = document.getElementById("answer-btn");
    var bookOverlay = document.getElementById("book-overlay");
    var closeBookBtn = document.getElementById("close-book-btn");

    var settings = {
        glitch: true,
        speed: "normal",
        static: true
    };

    var tips = [
        "do not blink",
        "the bulb remembers",
        "some hints are lies",
        "it was not the candle",
        "2:45 am. do not forget.",
        "click faster",
        "you are being watched",
        "do not trust the shadow",
        "the fire was a warning",
        "keep the light on"
    ];

    var loadProgress = 0;
    var loadInterval = setInterval(function() {
        loadProgress += Math.random() * 15;
        if (loadProgress > 100) loadProgress = 100;
        loadBar.style.width = loadProgress + "%";
        
        if (Math.random() > 0.7) {
            loadTip.innerText = tips[Math.floor(Math.random() * tips.length)];
        }
        
        if (loadProgress >= 100) {
            clearInterval(loadInterval);
            setTimeout(function() {
                loadingScreen.style.display = "none";
                menuScreen.style.display = "flex";
            }, 800);
        }
    }, 200);

    setInterval(function() {
        if (Math.random() > 0.7 && settings.glitch) {
            glitch.style.display = "block";
            setTimeout(function() {
                glitch.style.display = "none";
            }, 200);
        }
    }, 3000);

    setInterval(function() {
        if (Math.random() > 0.9) {
            var whispers = [
                "it is behind you",
                "do not turn around",
                "the light lies",
                "you started the fire",
                "remember 2:45",
                "help me"
            ];
            whisperBox.innerText = whispers[Math.floor(Math.random() * whispers.length)];
            whisperBox.classList.remove("whisper-hidden");
            setTimeout(function() {
                whisperBox.classList.add("whisper-hidden");
            }, 2500);
        }
    }, 12000);

    menuStart.onclick = function() {
        menuScreen.style.display = "none";
        warn.style.display = "flex";
    }

    menuSettings.onclick = function() {
        menuScreen.style.display = "none";
        settingsScreen.style.display = "flex";
    }

    menuCredits.onclick = function() {
        menuScreen.style.display = "none";
        creditsScreen.style.display = "flex";
    }

    settingsBack.onclick = function() {
        settingsScreen.style.display = "none";
        menuScreen.style.display = "flex";
    }

    creditsBack.onclick = function() {
        creditsScreen.style.display = "none";
        menuScreen.style.display = "flex";
    }

    toggleGlitch.onclick = function() {
        settings.glitch = !settings.glitch;
        this.innerText = settings.glitch ? "on" : "off";
    }

    toggleSpeed.onclick = function() {
        if (settings.speed === "normal") {
            settings.speed = "fast";
            this.innerText = "fast";
        } else if (settings.speed === "fast") {
            settings.speed = "slow";
            this.innerText = "slow";
        } else {
            settings.speed = "normal";
            this.innerText = "normal";
        }
    }

    toggleStatic.onclick = function() {
        settings.static = !settings.static;
        this.innerText = settings.static ? "on" : "off";
        document.querySelector(".static-overlay").style.display = settings.static ? "block" : "none";
    }

    btn.onclick = function() {
      warn.style.display = "none";
      inst.style.display = "flex";
    }

    btn2.onclick = function() {
        inst.style.display = "none";
        phoneOverlay.classList.remove("hidden");
    }

    answerBtn.onclick = function() {
        phoneText.innerText = "listen to me. you cant stay there. the fire was just the beginning. there is a book. find it. the ritual. 5 candles. hurry. before it finds you.";
        phoneButtons.innerHTML = '<button class="btn" id="hangup-btn">hang up</button>';
        document.getElementById("hangup-btn").onclick = function() {
            phoneOverlay.classList.add("hidden");
            bookOverlay.classList.remove("hidden");
        }
    }

    closeBookBtn.onclick = function() {
        bookOverlay.classList.add("hidden");
        window.location.href = "game.html";
    }

    window.onkeydown = function(e) {
        if (e.key === "Escape") {
            if (settingsScreen.style.display === "flex") {
                settingsScreen.style.display = "none";
                menuScreen.style.display = "flex";
            }
            if (creditsScreen.style.display === "flex") {
                creditsScreen.style.display = "none";
                menuScreen.style.display = "flex";
            }
            if (!bookOverlay.classList.contains("hidden")) {
                bookOverlay.classList.add("hidden");
                window.location.href = "game.html";
            }
        }
    }