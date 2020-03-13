function notifyMe(text) {
  // let's create a notification
  if (Notification.permission === "granted") {
    var notification = new Notification(text);
  }
}

var d = document.getElementById('neu');

d.onclick = function() {
    startTimer(60*53);
    notifyMe("Started");
    d.classList.add("fivetwo");
};

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    var display = document.querySelector('#centered');
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes;
        console.log(minutes);
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
        var notification = new Notification("Welcome back hustler.");
    } else {
        Notification.requestPermission();
    }

};