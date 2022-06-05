/*Kanban Board*/
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

var i=1;
function add() {
var add=document.querySelector('.kanban');

    add.innerHTML += '<div class="block" id="a" ondrop="drop(event)" ondragover="allowDrop(event)"><div contenteditable="true">Rename</div></div> '

}
/*Stopwatch Timer*/
let [milliseconds,second,minute,] = [0,0,0];
let timerRef = document.querySelector('.time');
let int = null;

document.getElementById('start').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(mainTime,10);
});

document.getElementById('stop').addEventListener('click', ()=>{
    clearInterval(int);
});

document.getElementById('reset').addEventListener('click', ()=>{
    clearInterval(int);
    [milliseconds,seconds,minutes,hours] = [0,0,0];
    timerRef.innerHTML = '00 : 00 : 00';
});

function mainTime(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        second++;
        if(second == 60){
            second = 0;
            minute++;
            if(minute == 60){
                minute = 0;
            }
        }
    }

 let m = minute < 10 ? "0" + minute : minute;
 let s = second < 10 ? "0" + second : second;
 let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

 timerRef.innerHTML = ` ${m} : ${s} : ${ms}`;
}

/*Pomodoro Timer*/
const el = document.querySelector(".clock");
const mindiv = document.querySelector(".pmin"); 
const secdiv = document.querySelector(".psec");

const startBtn = document.querySelector(".pstart");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, stoped, mins, seconds;

startBtn.addEventListener("click", () => {
  let btn = localStorage.getItem("btn");

  if (btn === "focus") {
    mins = +localStorage.getItem("focusTime") || 25;
  } else {
    mins = +localStorage.getItem("offTime") || 5;
  }

  seconds = mins * 60;
  totalsecs = mins * 60;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = "scale(0)";
  stoped = false;
});

function decremenT() {
  mindiv.textContent = Math.floor(seconds / 60);
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  if (circle.classList.contains("danger")) {
    circle.classList.remove("danger");
  }

  if (seconds > 0) {
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    setProgress(perc);
    seconds--;
    initial = window.setTimeout("decremenT()", 1000);
    if (seconds < 10) {
      circle.classList.add("danger");
    }
  } else {
    mins = 0;
    seconds = 0;
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
      startBtn.textContent = "Start";
      startBtn.classList.add("off");
      localStorage.setItem("btn", "off");
    } else {
      startBtn.classList.remove("off");
      startBtn.textContent = "start";
      localStorage.setItem("btn", "focus");
    }
    startBtn.style.transform = "scale(1)";
  }
}

const focusTimeInput = document.querySelector("#on"); 
const breakTimeInput = document.querySelector("#off");
const pauseBtn = document.querySelector(".pstop");

focusTimeInput.value = localStorage.getItem("focusTime");
breakTimeInput.value = localStorage.getItem("breakTime");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("focusTime", focusTimeInput.value);
  localStorage.setItem("breakTime", breakTimeInput.value);
});

document.querySelector(".preset").addEventListener("click", () => {
  startBtn.style.transform = "scale(1)";
  clearTimeout(initial);
  setProgress(0);
  mindiv.textContent = 00;
  secdiv.textContent = 00;
});

pauseBtn.addEventListener("click", () => {
  if (stoped === undefined) {
    return;
  }
  if (stoped) {
    stoped = false;
    initial = setTimeout("decremenT()", 60);
    pauseBtn.textContent = "pause";
    pauseBtn.classList.remove("resume");
  } else {
    clearTimeout(initial);
    pauseBtn.textContent = "resume";
    pauseBtn.classList.add("resume");
    stoped = true;
  }
});
const circle = document.querySelector(".progress");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI; 

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}
