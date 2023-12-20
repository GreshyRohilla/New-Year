$(document).ready(function () {
    $('.container').mouseenter(function () {
        $('.card').stop().animate({
            top: '-90px'
        }, 'slow');
    }).mouseleave(function () {
        $('.card').stop().animate({
            top: 0
        }, 'slow');
    });
});
function updateCountdown() {
    const currentTime = new Date();
    const newYear = new Date(currentTime.getFullYear() + 1, 0, 1);
    const timeRemaining = newYear - currentTime;
  
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
    document.getElementById('days').innerText = formatTime(days);
    document.getElementById('hours').innerText = formatTime(hours);
    document.getElementById('minutes').innerText = formatTime(minutes);
    document.getElementById('seconds').innerText = formatTime(seconds);
  }
  
  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
        const max_fireworks = 5,
          max_sparks = 50;
        let canvas = document.getElementById('myCanvas');
        let context = canvas.getContext('2d');
        let fireworks = [];
         
        for (let i = 0; i < max_fireworks; i++) {
          let firework = {
            sparks: []
          };
          for (let n = 0; n < max_sparks; n++) {
            let spark = {
              vx: Math.random() * 5 + .5,
              vy: Math.random() * 5 + .5,
              weight: Math.random() * .3 + .03,
              red: Math.floor(Math.random() * 2),
              green: Math.floor(Math.random() * 2),
              blue: Math.floor(Math.random() * 2)
            };
            if (Math.random() > .5) spark.vx = -spark.vx;
            if (Math.random() > .5) spark.vy = -spark.vy;
            firework.sparks.push(spark);
          }
          fireworks.push(firework);
          resetFirework(firework);
        }
        window.requestAnimationFrame(explode);
         
        function resetFirework(firework) {
          firework.x = Math.floor(Math.random() * canvas.width);
          firework.y = canvas.height;
          firework.age = 0;
          firework.phase = 'fly';
        }
         
        function explode() {
          context.clearRect(0, 0, canvas.width, canvas.height);
          fireworks.forEach((firework,index) => {
            if (firework.phase == 'explode') {
                firework.sparks.forEach((spark) => {
                for (let i = 0; i < 10; i++) {
                  let trailAge = firework.age + i;
                  let x = firework.x + spark.vx * trailAge;
                  let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
                  let fade = i * 20 - firework.age * 2;
                  let r = Math.floor(spark.red * fade);
                  let g = Math.floor(spark.green * fade);
                  let b = Math.floor(spark.blue * fade);
                  context.beginPath();
                  context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
                  context.rect(x, y, 4, 4);
                  context.fill();
                }
              });
              firework.age++;
              if (firework.age > 100 && Math.random() < .05) {
                resetFirework(firework);
              }
            } else {
              firework.y = firework.y - 10;
              for (let spark = 0; spark < 15; spark++) {
                context.beginPath();
                context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
                context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
                context.fill();
              }
              if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
            }
          });
          window.requestAnimationFrame(explode);
        }
        