const newYears = "1 Jan 2021";

function countdown() {
  const day = document.getElementById("days");
  const hour = document.getElementById("hours");
  const min = document.getElementById("mins");
  const sec = document.getElementById("seconds");

  const newYearsDate = new Date(newYears);
  const currentDate = new Date();

  const totalSeconds = Math.floor((newYearsDate - currentDate) / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(totalSeconds / 3600) % 24;

  const minute = Math.ceil(totalSeconds / 60) % 60;

  const c_seconds = totalSeconds % 60;
  day.innerText = days;
  hour.innerText = formatTime(hours);
  min.innerText = formatTime(minute);
  sec.innerText = formatTime(c_seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

countdown();

setInterval(countdown, 1000);
