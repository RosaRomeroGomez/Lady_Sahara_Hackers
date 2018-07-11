var years = ['1990','1995','2000'];
var container = document.getElementById('container');
var globe = new DAT.Globe(container);
//var datafile = 'data/output.json';
//var datafile = 'population909500.json';
var datafile = 'data/output/APR-2007.json';

console.log(globe);
var i, tweens = [];

var settime = function(globe, t) {
  return function() {
    new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
    var y = document.getElementById('year'+years[t]);
    if (y.getAttribute('class') === 'year active') {
      return;
    }
    var yy = document.getElementsByClassName('year');
    for(i=0; i<yy.length; i++) {
      yy[i].setAttribute('class','year');
    }
    y.setAttribute('class', 'year active');
  };
};

var xhr;
TWEEN.start();

xhr = new XMLHttpRequest();
xhr.open('GET', datafile, true);
xhr.onreadystatechange = function(e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      window.data = data;
      for (i=0;i<data.length;i++) {
        globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
      }
      globe.createPoints();
      settime(globe,0)();
      globe.animate();
      document.body.style.backgroundImage = 'none'; // remove loading
    }
  }
};
xhr.send(null);

//Testing animation through time
let animationStep = 0;
let animationInterval = 1000; //milliseconds
function animationCallback() {
    settime(globe, animationStep)();
    animationStep = animationStep < 2 ? animationStep + 1 : 0;
};

function animateTime() {
    setInterval(animationCallback, animationInterval);
};

let playButton = document.getElementById('playButton');
playButton.onclick = animateTime;
