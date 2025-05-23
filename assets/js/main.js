let hooman = 100;
let cat = 0;
let statsHaveBeenShown = false;

window.onload = function() {
    const music = document.getElementById('bg-music');
    music.volume = 0.3;
    music.play().catch(() => {
        
    });
    document.getElementById('toggle-music').onclick = function() {
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
    };

    startGame();
};


function applyTheme(isHooman) {
    const body = document.body;
    const game = document.getElementById('game');
    if (isHooman) {
        body.classList.add('hooman-theme');
        body.classList.remove('potichat-theme');
        game.classList.add('hooman-theme');
        game.classList.remove('potichat-theme');
    } else {
        body.classList.add('potichat-theme');
        body.classList.remove('hooman-theme');
        game.classList.add('potichat-theme');
        game.classList.remove('hooman-theme');
    }
}

function showStory(text, next) {
    document.getElementById('story').innerHTML = text;
    document.getElementById('choices').innerHTML = '';
    if (!statsHaveBeenShown) {
        document.getElementById('stats').style.display = 'none';
    }
    if (next) {
        const btn = document.createElement('button');
        btn.textContent = "Continuer";
        btn.className = "continue-btn";
        btn.onclick = next;
        document.getElementById('choices').appendChild(btn);
    }
}

function showChoices(choices) {
    applyTheme(true); // Tour du joueur
    const div = document.getElementById('choices');
    div.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.textContent = choice.text;
        btn.classList.add('choice-btn');
        btn.onclick = choice.action;
        div.appendChild(btn);
    });
    updateStats();
    document.getElementById('stats').style.display = '';
    statsHaveBeenShown = true;
}

function updateStats() {
    document.getElementById('stats').innerHTML =
        `Affection PotiChat : ${cat}/100<br>Santé mentale : ${hooman}/100`;
}

function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function minMax(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function showFailMessage(isHooman, nextMessage, nextCallback) {
    showStory(
        isHooman ? "Mais échouez !" : "Mais échoue !",
        () => showStory(nextMessage, nextCallback)
    );
}

function startGame() {
    applyTheme(true); 
    showStory(
        "Vous êtes en train de vous promener dans la forêt lorsque...<br>Un PotiChat apparait !",
        showWhatDoYouWant
    );
}

function showWhatDoYouWant() {
    showStory("Que voulez-vous faire ?", showActionButtons);
}

function showActionButtons() {
    document.getElementById('story').innerHTML = "";
    showChoices([
        { text: "Jouer", action: jouer },
        { text: "Regarder des vidéos de chats", action: video },
        { text: "Caresser", action: caresser },
        { text: "Donner des friandises", action: friandise }
    ]);
}

function nextTurn() {
    if (cat >= 100) {
        const finalTextPart1 = "Vous avez charmé PotiChat !<br>Il vous suit jusque chez vous et vous laisse le servir jusqu'à la fin de sa vie.";
        const finalTextPart2 = "Vous devenez le serviteur de PotiChat et votre maison devient sa maison.<br>Vous ne pourriez être plus heureux.<br><span class='cat-emoji'>⸝( ///◞ꈍ ∇ ꈍ///)⸝♡  ᓚ(  =  🝦 ﻌ 🝦 =)</span>";
        showStory(finalTextPart1, () => showFinalMessage(finalTextPart2));
        return;
    }
    if (hooman <= 0) {
        const finalTextPart1 = "A bout de force, vous tombez.<br>PotiChat vous lance un regard méprisant avant de partir.";
        const finalTextPart2 = "Vous passez la nuit recroquevillé sur le sol à pleurer.<br>_(:°з」∠)_";
        showStory(finalTextPart1, () => showFinalMessage(finalTextPart2));
        return;
    }
    showWhatDoYouWant();
}


function showFinalMessage(text) {
    document.getElementById('story').innerHTML = text;
    const div = document.getElementById('choices');
    div.innerHTML = '';
    const btn = document.createElement('button');
    btn.textContent = "Rejouer";
    btn.className = "continue-btn";
    btn.onclick = restartGame;
    div.appendChild(btn);
    document.getElementById('stats').style.display = 'none';
}


function jouer() {
    showStory(
        "Vous ramassez une branche par terre et l'agitez devant PotiChat...",
        () => {
            let play = randomize(1, 2);
            if (play === 1) {
                cat = minMax(cat + 10, 0, 100);
                updateStats();
                showStory("// ฅ(=Φ ω Φ = )⟆<br>PotiChat commence à jouer avec le bâton.<br>PotiChat gagne 10 d'affection !", catStats);
            } else {
                showFailMessage(
                    true,
                    "(=🝦 ﻌ 🝦 = )⟆<br>PotiChat n'est pas impressionné.",
                    catStats
                );
            }
        }
    );
}

function video() {
    showStory(
        "Vous décidez de regarder des vidéos de chats...",
        () => {
            let watchCatVideo = randomize(1, 3);
            if (watchCatVideo === 1) {
                hooman = minMax(hooman + 15, 0, 100);
                updateStats();
                showStory("( ︶◡ ︶ ❀ )<br>Les vidéos soulagent votre coeur meurtri.<br>Vous gagnez 15 de santé mentale !", catStats);
            } else {
                showFailMessage(
                    true,
                    "Votre n'avez pas de connexion...<br>(╥﹏╥)",
                    catStats
                );
            }
        }
    );
}

function caresser() {
    showStory(
        "Vous tentez de caresser PotiChat...",
        () => {
            let pet = randomize(1, 3);
            if (pet === 1) {
                cat = minMax(cat + 20, 0, 100);
                updateStats();
                showStory(
                    "ヽ(o♡ o)/<br>PotiChat se laisse faire.<br>Des larmes apparaissent dans vos yeux.",
                    () => showStory(
                        "(=🝦 ﻌ 🝦 = )⟆<br>PotiChat vous regarde d'un air méprisant puis s'éloigne.<br>PotiChat gagne 20 d'affection !",
                        catStats
                    )
                );
            } else {
                showFailMessage(
                    true,
                    "ε=(= ◣ ﻌ ◢ =)<br>PotiChat vous lance un regard noir.<br>Vous décidez d'épargner votre main.",
                    catStats
                );
            }
        }
    );
}

function friandise() {
    showStory(
        "Vous tendez une friandise à PotiChat...",
        () => {
            let giveCatFood = randomize(1, 4);
            if (giveCatFood === 1) {
                cat = minMax(cat + 30, 0, 100);
                updateStats();
                showStory("๑(=Φ０Φ= ๑)⟆<br>C'est très efficace !", () => showStory("PotiChat mange la friandise.<br>PotiChat gagne 30 d'affection !", catStats));
            } else if (giveCatFood === 4) {
                showFailMessage(
                    true,
                    "PotiChat donne un coup de patte dans la friandise qui tombe sur le sol.<br>(╥﹏╥)",
                    catStats
                );
            } else {
                showFailMessage(
                    true,
                    "ε=(= ◣ ﻌ ◢ =)<br>PotiChat vous lance un regard noir.<br>Vous récupérez votre friandise.",
                    catStats
                );
            }
        }
    );
}

// Actions du chat
function catStats() {
    if (cat >= 100 || hooman <= 0) {
        nextTurn();
        return;
    }
    applyTheme(false); // Tour du chat
    showStory("PotiChat passe à l'action !", catRandomAction);
}

function catRandomAction() {
    let catAction = randomize(1, 4);
    if (catAction === 1) {
        catIgnore();
    } else if (catAction === 2) {
        catClean();
    } else if (catAction === 3) {
        catHiss();
    } else if (catAction === 4) {
        catGriffe();
    }
}

function catIgnore() {
    showStory(
        "PotiChat utilise ignore !",
        () => {
            let ignore = randomize(1, 2);
            if (ignore === 1) {
                hooman = minMax(hooman - 10, 0, 100);
                updateStats();
                showStory("=/ᐠ--ᐟ\\=<br>PotiChat se tourne et vous ignore.", () => showStory("Il n'a que faire de vos supplications.<br>Votre coeur se brise.<br>Vous perdez 10 de santé mentale.", nextTurn));
            } else {
                showFailMessage(
                    false,
                    "( ﻌ 🝦 =)⟆<br>PotiChat ne peut s'empêcher d'être intrigué.<br>Il tourne la tête mais garde un oeil curieux sur vous.",
                    nextTurn
                );
            }
        }
    );
}

function catClean() {
    showStory(
        "PotiChat utilise toilette !",
        () => {
            let clean = randomize(1, 3);
            if (clean === 1) {
                cat = minMax(cat - 15, 0, 100);
                updateStats();
                showStory("ᓚ(=︶ ﻌ ︶=)<br>PotiChat commence à faire sa toilette.", () => showStory("Une fois terminée, il se sent propre et indépendant.<br>PotiChat perd 15 d'affection.", nextTurn));
            } else {
                showFailMessage(
                    false,
                    "(=◡ ﻌ 🝦 = )⟆<br>PotiChat ne vous lâche pas d'un oeil.<br>Il ne peut pas réaliser toilette correctement.",
                    nextTurn
                );
            }
        }
    );
}

function catHiss() {
    showStory(
        "PotiChat utilise hiss !",
        () => {
            let hiss = randomize(1, 3);
            if (hiss === 1) {
                hooman = minMax(hooman - 20, 0, 100);
                updateStats();
                showStory("(=Φ Ⱉ Φ = )⟆<br>PotiChat se met à feuler.", () => showStory("Vous êtes effrayé par PotiChat.<br>Vous perdez 20 de santé mentale", nextTurn));
            } else {
                showFailMessage(
                    false,
                    "ᓚ( =Ф ﻌ Ф= )?<br>PotiChat vous observe d'un oeil intrigué.",
                    nextTurn
                );
            }
        }
    );
}

function catGriffe() {
    showStory(
        "PotiChat utilise feinte !<br>Il s'approche doucement...",
        () => {
            let griffe = randomize(1, 4);
            if (griffe === 1) {
                showStory(
                    "PotiChat s'approche de vous...",
                    () => showStory(
                        "(=✧ Ⱉ ✧ =)ฅ ᵐᵉᵒʷˎˊ˗<br>PotiChat envoi la patte et vous griffe !<br>C'est très efficace !",
                        () => {
                            hooman = minMax(hooman - 30, 0, 100);
                            updateStats();
                            showStory(
                                "Vous saignez, mais votre coeur souffre davantage.<br>Vous perdez 30 de santé mentale",
                                nextTurn
                            );
                        }
                    )
                );
            } else {
                showFailMessage(
                    false,
                    "(=🝦 ﻌ 🝦 = )⟆<br>Face à votre grand sourire, il préfère faire demi-tour.",
                    nextTurn
                );
            }
        }
    );
}



function showRestartButton() {
    const div = document.getElementById('choices');
    div.innerHTML = '';
    const btn = document.createElement('button');
    btn.textContent = "Rejouer";
    btn.className = "continue-btn";
    btn.onclick = restartGame;
    div.appendChild(btn);
    if (!statsHaveBeenShown) {
        document.getElementById('stats').style.display = 'none';
    }
}

function restartGame() {
    hooman = 100;
    cat = 0;
    statsHaveBeenShown = false;
    startGame();
}


