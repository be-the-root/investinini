    console.log("bulb game ready");

    var evidence = document.querySelector(".evidence-window p1");
    var hint = document.querySelector(".hint-window p1");

    var lightBtn = document.getElementById("light-btn");
    var hintsBox = document.getElementById("hints-container");
    var clickCount = 0;

    var collectedHints = document.getElementById("collected-hints");
    var hintText = document.getElementById("hint-text");

    var currentHint = null;
    var collectedCount = 0;

    var questionContainer = document.getElementById("question-container");
    var popup = document.getElementById("result-popup");
    var popupTitle = document.getElementById("popup-title");
    var popupBtn = document.getElementById("popup-btn");

    var level1Question = document.getElementById("level1-question");
    var level2Question = document.getElementById("level2-question");
    var level3Question = document.getElementById("level3-question");
    var level4Question = document.getElementById("level4-question");
    var level5Question = document.getElementById("level5-question");
    var level6Question = document.getElementById("level6-question");

    var levelIndicator = document.getElementById("level-indicator");
    var roomDarkness = document.getElementById("room-darkness");
    var timerBar = document.getElementById("timer-bar");

    var gameGlitch = document.getElementById("game-glitch");
    var fadeOverlay = document.getElementById("fade-overlay");
    var finalBulb = document.getElementById("final-bulb");
    var answerInput = document.getElementById("answer-input");
    var submitAnswer = document.getElementById("submit-answer");
    var finalTimerDisplay = document.getElementById("final-timer");
    var outroScreen = document.getElementById("outro-screen");

    var candles = document.querySelectorAll(".candle");
    var candleSequence = [3, 1, 5, 2, 4];
    var seqIndex = 0;
    var candleTimer;
    var timerInterval;

    var canvas = document.getElementById("maze-canvas");
    var ctx = canvas.getContext("2d");
    var gridSize = 7;
    var cellSize = 60;
    var playerPos = { r: 1, c: 1 };
    var monsterPos = { r: 5, c: 5 };
    var exitPos = { r: 5, c: 5 };
    var monsterWeakened = false;
    var mazeLayout = [
        "#######",
        "#@....#",
        "#.###.#",
        "#.....#",
        "#.###.#",
        "#....E#",
        "#######"
    ];

    var switches = document.querySelectorAll(".switch");
    var switchSequence = [1, 3, 2, 4];
    var switchIndex = 0;

    var codeSequence = "2450";
    var enteredCode = "";
    var codeDisplay = document.getElementById("code-display");
    var keys = document.querySelectorAll(".key:not(.key-empty)");

    var finalTimeLeft = 300;
    var finalTimerInterval;

    var typeTimer;

    var typeText = function(text, speed) {
        clearInterval(typeTimer);
        hintText.innerText = "";
        var i = 0;
        typeTimer = setInterval(function() {
            if (i < text.length) {
                hintText.innerText += text.charAt(i);
                i++;
            } else {
                clearInterval(typeTimer);
            }
        }, speed);
    }

    var triggerGameGlitch = function() {
        gameGlitch.style.display = "block";
        setTimeout(function() {
            gameGlitch.style.display = "none";
        }, 200);
    }

    setInterval(function() {
        if (Math.random() > 0.85) {
            triggerGameGlitch();
        }
    }, 2000);

    var tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(function(tab) {
        tab.onclick = function() {
            tabButtons.forEach(function(t) { t.classList.remove("active"); });
            this.classList.add("active");
            
            document.querySelectorAll(".tab-content").forEach(function(c) {
                c.classList.add("hidden");
            });
            
            var target = "tab-" + this.CDATA_SECTION_NODE.tab;
            document.getElementById(target).classList.remove("hidden");
        }
    });

    var addItem = function(itemName) {
        var list = document.getElementById("inventory-list");
        var item = document.createElement("div");
        item.className = "inv-item";
        item.innerText = "» " + itemName;
        list.appendChild(item);
    }

    var addNote = function(noteText) {
        var note = document.createElement("div");
        note.className = "note-item";
        note.innerText = noteText;
        collectedHints.appendChild(note);
    }

    lightBtn.onclick = function() {
      clickCount++;
      if (clickCount == 10) {
          document.body.classList.add("flash");
          
          setTimeout(function() {
              document.body.classList.remove("flash");
              lightBtn.style.display = "none";
              hintsBox.style.display = "flex";
              typeText("analyze the hints", 50);
              addItem("broken bulb");
          }, 10);
      }
    }

    document.getElementById("hint1").onclick = function() {
        addNote("the fire started at 2:45 am. i was not home.");
        this.disabled = true;
        collectedCount++;
        if (collectedCount == 4) { hintsBox.style.display = "none"; showQuestion(); }
    }

    document.getElementById("hint2").onclick = function() {
        addNote("there was no candle that night.");
        this.disabled = true;
        collectedCount++;
        if (collectedCount == 4) { hintsBox.style.display = "none"; showQuestion(); }
    }

    document.getElementById("hint3").onclick = function() {
        addNote("the shadow watched from the corner.");
        this.disabled = true;
        collectedCount++;
        if (collectedCount == 4) { hintsBox.style.display = "none"; showQuestion(); }
    }

    document.getElementById("hint4").onclick = function() {
        addNote("the code is 2450. do not forget.");
        this.disabled = true;
        collectedCount++;
        if (collectedCount == 4) { hintsBox.style.display = "none"; showQuestion(); }
    }

    var showQuestion = function() {
        typeText("analyze the notes and answer the question", 50);
        questionContainer.stylele.display = "flex";
    }

    var startLevel2 = function() {
        levelIndicator.innerText = "level 2";
        level1Question.style.display = "none";
        level2Question.style.display = "flex";
        roomDarkness.style.opacity = "0.95";
        typeText("light the candles in order: 3 1 5 2 4", 50);
        seqIndex = 0;
        
        candles.forEach(function(c) { c.classList.remove("lit"); });
        
        timerBar.style.width = "100%";
        var timeLeft = 100;
        timerInterval = setInterval(function() {
            timeLeft -= 1;
            timerBar.style.width = timeLeft + "%";
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleAnswer(false, 2);
            }
        }, 200);
        
        candleTimer = setTimeout(function() {
            handleAnswer(false, 2);
        }, 20000);
    }

    candles.forEach(function(candle) {
        candle.onclick = function() {
            var candleNum = parseInt(this.id.replace("candle", ""));
            if (candleNum === candleSequence[seqIndex]) {
                this.classList.add("lit");
                seqIndex++;
                roomDarkness.style.opacity = 0.95 - (seqIndex * 0.15);
                addItem("candle " + candleNum);
                
                if (seqIndex === 5) {
                    clearTimeout(candleTimer);
                    clearInterval(timerInterval);
                    monsterWeakened = true;
                    handleAnswer(true, 2);
                }
            } else {
                clearTimeout(candleTimer);
                clearInterval(timerInterval);
                handleAnswer(false, 2);
            }
        }
    });

    var startLevel3 = function() {
        levelIndicator.innerText = "level 3";
        level2Question.style.display = "none";
        level3Question.style.display = "flex";
        roomDarkness.style.opacity = "0.85";
        typeText("escape the shadow. use arrow keys.", 50);
        
        playerPos = { r: 1, c: 1 };
        monsterPos = { r: 5, c: 5 };
        
        drawMaze();
    }

    var drawMaze = function() {
        ctx.clearRect(0, 0, 420, 420);
        ctx.strokeStyle = "#555555";
        ctx.lineWidth = 3;
        ctx.font = "24px 'Press Start 2P'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        for (var r = 0; r < gridSize; r++) {
            for (var c = 0; c < gridSize; c++) {
                var x = c * cellSize;
                var y = r * cellSize;
                
                if (mazeLayout[r][c] === "#") {
                    ctx.beginPath();
                    if (r === 0 || mazeLayout[r-1][c] !== "#") { ctx.moveTo(x, y); ctx.lineTo(x + cellSize, y); }
                    if (r === gridSize - 1 || mazeLayout[r+1][c] !== "#") { ctx.moveTo(x, y + cellSize); ctx.lineTo(x + cellSize, y + cellSize); }
                    if (c === 0 || mazeLayout[r][c-1] !== "#") { ctx.moveTo(x, y); ctx.lineTo(x, y + cellSize); }
                    if (c === gridSize - 1 || mazeLayout[r][c+1] !== "#") { ctx.moveTo(x + cellSize, y); ctx.lineTo(x + cellSize, y + cellSize); }
                    ctx.stroke();
                } else {
                    if (r === playerPos.r && c === playerPos.c) {
                        ctx.fillStyle = "#00ff00";
                        ctx.fillText("@", x + cellSize/2, y + cellSize/2);
                    } else if (r === monsterPos.r && c === monsterPos.c && !monsterWeakened) {
                        ctx.fillStyle = "#ff0000";
                        ctx.fillText("M", x + cellSizellSize/2, y + cellSize/2);
                    } else if (r === exitPos.r && c === exitPos.c) {
                        ctx.fillStyle = "#00ffff";
                        ctx.fillText("E", x + cellSize/2, y + cellSize/2);
                    }
                }
            }
        }
    }

    var movePlayer = function(r, c) {
        if (Math.abs(r - playerPos.r) + Math.abs(c - playerPos.c) === 1) {
            if (mazeLayout[r][c] === "#") return;
            
            playerPos.r = r;
            playerPos.c = c;
            
            if (playerPos.r === exitPos.r && playerPos.c === exitPos.c) {
                addItem("rusty key");
                handleAnswer(true, 3);
                return;
            }
            
            if (!monsterWeakened) {
                moveMonster();
            }
            drawMaze();
            
            if (!monsterWeakened && playerPos.r === monsterPos.r && playerPos.c === monsterPos.c) {
                handleAnswer(false, 3);
            }
        }
    }

    var moveMonster = function() {
        var possibleMoves = [];
        
        if (monsterPos.r > 0 && mazeLayout[monsterPos.r - 1][monsterPos.c] !== "#") possibleMoves.push({r: monsterPos.r - 1, c: monsterPos.c});
        if (monsterPos.r < gridSize - 1 && mazeLayout[monsterPos.r + 1][monsterPos.c] !== "#") possibleMoves.push({r: monsterPos.r + 1, c: monsterPos.c});
        if (monsterPos.c > 0 && mazeLayout[monsterPos.r][monsterPos.c - 1] !== "#") possibleMoves.push({r: monsterPos.r, c: monsterPos.c - 1});
        if (monsterPos.c < gridSize - 1 && mazeLayout[monsterPos.r][monsterPos.c + 1] !== "#") possibleMoves.push({r: monsterPos.r, c: monsterPos.c + 1});
        
        if (possibleMoves.length > 0) {
            var bestMove = possibleMoves[0];
            var bestDist = 999;
            for (var i = 0; i < possibleMoves.length; i++) {
                var dist = Math.abs(possibleMoves[i].r - playerPos.r) + Math.abs(possibleMoves[i].c - playerPos.c);
                if (dist < bestDist) {
                    bestDist = dist;
                    bestMove = possibleMoves[i];
                }
            }
            monsterPos.r = bestMove.r;
            monsterPos.c = bestMove.c;
        }
    }

    document.onkeydown = function(e) {
        if (level3Question.style.display !== "flex") return;
        
        var r = playerPos.r;
        var c = playerPos.c;
        
        if (e.key === "ArrowUp") r--;
        else if (e.key === "ArrowDown") r++;
        else if (e.key === "ArrowLeft") c--;
        else if (e.key === "ArrowRight") c++;
        else return;
        
        e.preventDefault();
        movePlayer(r, c);
    }

    var startLevel4 = function() {
        levelIndicator.innerText = "level 4";
        level3Question.style.display = "none";
        level4Question.style.display = "flex";
        roomDarkness.style.opacity = "0.7";
        typeText("flip the switches in order: 1 3 2 4", 50);
        switchIndex = 0;
        switches.forEach(function(s) { s.classList.remove("on"); });
        addItem("fuse box");
        addNote("the switches are a sequence. 1 3 2 4.");
    }

    switches.forEach(function(sw) {
        sw.onclick = function() {
            var swNum = parseInt(this.innerText);
            if (swNum === switchSequence[switchIndex]) {
                this.classList.add("on");
                switchIndex++;
                if (switchIndex === 4) {
                    setTimeout(function() { handleAnswer(true, 4); }, 500);
                }
            } else {
                switches.forEach(function(s) { s.classList.remove("on"); });
                switchIndex = 0;
                setTimeout(function() { handleAnswer(false, 4); }, 500);
            }
        }
    });

    var startLevel5 = function() {
        levelIndicator.innerText = "level 5";
        level4Question.style.display = "none";
        level5Question.style.display = "flex";
        roomDarkness.style.opacity = "0.7";
        typeText("enter the code from the notes", 50);
        enteredCode = "";
        codeDisplay.innerText = "----";
        addItem("keypad fragment");
        addNote("enter the code. look at the notes.");
    }

    keys.forEach(function(key) {
        key.onclick = function() {
            if (enteredCode.length < 4) {
                enteredCode += this.CDATA_SECTION_NODE.key;
                var display = enteredCode;
                while (display.length < 4) display += "-";
                codeDisplay.innerText = display;
                
                if (enteredCode.length === 4) {
                    if (enteredCode === codeSequence) {
                        setTimeout(function() { handleAnswer(true, 5); }, 500);
                    } else {
                        setTimeout(function() { handleAnswer(false, 5); }, 500);
                    }
                }
            }
        }
    });

    var startLevel6 = function() {
        levelIndicator.innerText = "final";
        level5Question.style.display = "none";
        roomDarkness.style.opacity = "0";

        fadeOverlay.classList.remove("hidden");

        setTimeout(function() {
            fadeOverlay.classList.add("hidden");
            level6Question.style.display = "flex";
            typeText("this was all easy right so solve this", 50);
            startFinalTimer();
        }, 2000);
    }

    var startFinalTimer = function() {
        finalTimeLeft = 300;
        updateFinalTimerDisplay();
        
        finalTimerInterval = setInterval(function() {
            finalTimeLeft--;
            updateFinalTimerDisplay();
            
            if (finalTimeLeft <= 0) {
                clearInterval(finalTimerInterval);
                handleAnswer(false, 6);
            }
        }, 1000);
    }

    var updateFinalTimerDisplay = function() {
        var minutes = Math.floor(finalTimeLeft / 60);
        var seconds = finalTimeLeft % 60;
        if (seconds < 10) seconds = "0" + seconds;
        if (minutes < 10) minutes = "0" + minutes;
        finalTimerDisplay.innerText = minutes + ":" + seconds;
    }

    submitAnswer.onclick = function() {
        var answer = answerInput.ariaValueMax.trim();
        if (answer === "64") {
            clearInterval(finalTimerInterval);
            finalBulb.classList.add("lit");
            typeText("the bulb is lit", 50);
            
            setTimeout(function() {
                outroScreen.classList.remove("hidden");
            }, 3000);
        } else {
            clearInterval(finalTimerInterval);
            handleAnswer(false, 6);
        }
    }

    document.getElementById("restart-outro").onclickk = function() {
        window.location.href = "index.html";
    }

    var handleAnswer = function(isCorrect, level) {
        popup.style.display = "flex";
        if (isCorrect) {
            popupTitle.innerText = "correct";
            popupTitle.className = "correct";
            
            if (level === 1) {
                popupBtn.innerText = "next";
                popupBtn.onclick = function() {
                    popup.style.display = "none";
                    startLevel2();
                }
            } else if (level === 2) {
                popupBtn.innerText = "next";
                popupBtn.onclick = function() {
                    popup.style.display = "none";
                    startLevel3();
                }
            } else if (level === 3) {
                popupBtn.innerText = "next";
                popupBtn.onclick = function() {
                    popup.style.display = "none";
                    startLevel4();
                }
            } else if (level === 4) {
                popupBtn.innerText = "next";
                popupBtn.onclick = function() {
                    popup.style.display = "none";
                    startLevel5();
                }
            } else if (level === 5) {
                popupBtn.innerText = "next";
                popupBtn.onclick = function() {
                    popup.style.display = "none";
                    startLevel6();
                }
            }
        } else {
            popupTitle.innerText = "u died";
            popupTitle.className = "";
            popupBtn.innerText = "restart";
            popupBtn.onclick = function() {
                window.location.reload();
            }
        }
    }

    document.getElementById("opt1").onauxclicclick = function() { handleAnswer(false, 1); }
    document.getElementById("opt2").onclick = function() { handleAnswer(true, 1); }
    document.getElementById("opt3").onclick = function() { handleAnswer(false, 1); }
    document.getElementById("opt4").onclick = function() { handleAnswer(false, 1); }