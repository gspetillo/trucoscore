let plus = document.querySelector("#plus");
let minus = document.querySelector("#minus");
let bet = document.querySelector("#bet");
let addButtons = document.querySelectorAll(".addButton");
let teamNames = document.getElementsByTagName('span')

let betOptions = [1, 3, 6, 9, 12]
let betIndex = 0;
let score = {
    team1: 0,
    team2: 0
}

plus.onclick = () => {
    betIndex++;
    bet.value = betOptions[betIndex % betOptions.length] ? betOptions[betIndex % betOptions.length] : 1;
    localStorage.setItem("bet", bet.value);
}

minus.onclick = () => {
    betIndex--;
    bet.value = betOptions[betIndex % betOptions.length] ? betOptions[betIndex % betOptions.length] : 1;
    localStorage.setItem("bet", bet.value);
}

function addPoints(position) {
    let teamPoints = document.querySelector("#score" + (position));
    setPoints(position, Number(teamPoints.innerHTML) + Number(bet.value));
    betIndex = 0
    bet.value = betOptions[0];
}

function setPoints(position, points) {
    console.log('setPoints', position, points);
    let teamPoints = document.querySelector("#score" + (position));
    score['team' + (position)] = Number(points)
    console.log('score', score['team' + (position)], 'team' + (position));
    localStorage.setItem("score" + (position), points);
    teamPoints.innerHTML = Number(score['team' + (position)])
    if (teamPoints.innerHTML >= 12) {
        alert("Ganhador: " + teamNames[position - 1].innerHTML);
    } else if (teamPoints.innerHTML == 11) {
        alert("Mão de 11: " + teamNames[position - 1].innerHTML);
    }
}


function updateNames() {
    // console.log('updateNames');
    teamNames[0].innerHTML = document.querySelector("#team1").value ? document.querySelector("#team1").value : "";
    teamNames[1].innerHTML = document.querySelector("#team2").value ? document.querySelector("#team2").value : "";
    localStorage.setItem("team1", document.querySelector("#team1").value);// "localStorage" is defined
    localStorage.setItem("team2", document.querySelector("#team2").value);// "localStorage" is defined
    // localStorage.setItem("team2-name", document.querySelector("#team2-name").value);
}

function checkLocalStorage() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("team1") != null) {
            console.log('localStorage: get team1 =>', localStorage.getItem("team1"));
            document.querySelector("#team1").value = localStorage.getItem("team1"); // "localStorage" is defined
            updateNames()
        }
        if (localStorage.getItem("team2") != null) {
            console.log('localStorage: get team2 =>', localStorage.getItem("team2"));
            document.querySelector("#team2").value = localStorage.getItem("team2"); // "localStorage" is defined
            updateNames()
        }
        if(localStorage.getItem("bet") != null) {
            console.log('localStorage: get bet =>', localStorage.getItem("bet"));
            bet.value = localStorage.getItem("bet");
        }
        if (localStorage.getItem("score1") != null) {
            console.log('localStorage: get score1 =>', localStorage.getItem("score1"));
            setPoints(1, localStorage.getItem("score1"));
        }
        if (localStorage.getItem("score2") != null) {
            console.log('localStorage: get score2 =>', localStorage.getItem("score2"));
            setPoints(2, localStorage.getItem("score2"));
        }
    } else {
        // Sorry! No Web Storage support..
      }}

function init() {
    setPoints(1, 0);
    setPoints(2, 0);
}

function reset() {
    localStorage.clear();
    init();
}

checkLocalStorage()
init();