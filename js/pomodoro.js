
var colors = ["#ede7f6", "#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#673ab7", "#5e35b1", "#512da8", "#4527a0", "#311b92"];
var bcolors = ["#009688", "#26a69a", "#4db6ac", "#80cbc4",  "#b2dfdb"];

var work_q = ["Focus","","","","Half time already! Keep Working","","","You've made so far,you can do more.","","","Few more minutes"];


var pomo = 0;

const start = document.getElementById("zen_start");
const complete = document.getElementById("zen_complete");
const wow = document.getElementById("zen_wow");


function wait() {
    
}

function work() {
    var display = document.querySelector('#timer'),
        timer = new CountDownTimer(1500),
        timeObj = CountDownTimer.parse(1500);

    var t = 1;

    format(timeObj.minutes, timeObj.seconds);
    checkColor(timeObj.minutes,timeObj.seconds);

    timer.onTick(format).onTick(checkColor);
    $('#startPO').hide();
    $('#counter').show();
    var task = $('#task').val();
    $('#task_display').text(task);
    $('#quotes').text("Keep Working.");
    $('body').css({"background-color":colors[0]});
    timer.start();
    Alarm(start);
    function format(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;
    }
    function checkColor(minutes, seconds){
        var ct = minutes*60 + seconds;
        if ((1500 - ct)%150 == 0){
            $('body').css({"background-color":colors[t]});
            t+=1;
            if (t < 4){
                $('body').css({"color":"black"});
            } else {
                $('body').css({"color":"white"});
            }
        }
        if (ct == 0){
            pomo+=1;
            breakTime();
        }
    }
};

function breakTime() {

    if (pomo == 4){
        end();
        return 0;
    }

    var display = document.querySelector('#timer'),
        timer = new CountDownTimer(300),
        timeObj = CountDownTimer.parse(300);

    var p = 1;

    format2(timeObj.minutes, timeObj.seconds);
    checkColor2(timeObj.minutes, timeObj.seconds);

    timer.onTick(format2).onTick(checkColor2);

    $('#task_display').text("Break :\)");
    $('#quotes').text("Have some water.");
    $('body').css({"background-color":bcolors[0]});
    $('body').css({"color":"black"});
    timer.start();
    Alarm(complete);

    function format2(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;
    }

    function checkColor2(minutes, seconds){
        var ct = minutes*60 + seconds;
        if ((300 - ct)%60 == 0){
            $('body').css({"background-color":bcolors[p]});
            p+=1;
        }
        if (ct == 0){
            work();
        }
    }
}
function end() {
    Alarm(wow);
    $("#counter").hide();
    $("#cardy").show();
}

function Alarm(e){
    e.play();
}

function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};
