var years = ['1990','1995','2000'];
var container = document.getElementById('container');
var globe = new DAT.Globe(container);
var datafile = 'data/output/APR-2007.json';
var currentDateIdx = 0;
var animationInterval = 1000; //milliseconds
const totalDates = dates.length;


console.log(globe);
var i, tweens = [];

var settime = function(globe, t) {
  return function() {
    new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
    /**var y = document.getElementById('year'+years[t]);
    if (y.getAttribute('class') === 'year active') {
      return;
    }
    var yy = document.getElementsByClassName('year');
    for(i=0; i<yy.length; i++) {
      yy[i].setAttribute('class','year');
    }
    y.setAttribute('class', 'year active');*/
  };
};

TWEEN.start();

function loadData(month, year) {
    var xhr = new XMLHttpRequest();
    const datafile = 'data/output/'+month+'-'+year+'.json';
    xhr.open('GET', datafile, true);
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          globe.clearData();
          //window.data = data;
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
}

loadData('JUN', '2006');

function playOnClick(d) {
    if (d.interval){
        clearInterval(d.interval);
        d.interval = null;
        d.innerHTML='Play';
    } else {
        d.interval = setInterval(function() {
          currentDateIdx = currentDateIdx < totalDates ? currentDateIdx + 1 : 0;
          updateTimeSlider(currentDateIdx);
          loadData(dates[currentDateIdx].month, dates[currentDateIdx].year);
      }, animationInterval);
        d.innerHTML='Pause';
    }
}

function updateTimeSlider(dateIdx) {
    handle.attr("cx", x(dateIdx));
    document.getElementById('timeSliderLabel').innerHTML = dates[dateIdx].month+' '+dates[dateIdx].year;
}

//Time slider callbacks
d3.select('#timeSlider').selectAll('.track-overlay').call(d3.drag()
    .on("start.interrupt", function() {
        slider.interrupt();
    }).on("start drag", function() {
        const dateIdx = Math.floor(x.invert(d3.event.x));
        updateTimeSlider(dateIdx);
        loadData(dates[dateIdx].month, dates[dateIdx].year);
        currentDateIdx = dateIdx;
    }));
