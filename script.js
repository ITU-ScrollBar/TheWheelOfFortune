var og = [
  { label: '1x CARROT JUICE'},
  { label: '1x 2-SHOT DRINK'},
  { label: '1x PITCHER OF BEER'},
  { label: '1x REDBULL'},
  { label: '2x 1-SHOT DRINK'},
  { label: '3x JÄGERBOMB'},
  { label: 'SHOT WITH TENDER'},
  { label: '2x DRAUGHT BEER'},
  { label: '1x 10-SHOT TRAY'},
  { label: '1x GLASS OF WATER'},
  { label: '2x FERNET SHOT'},
  { label: 'APEROL HAT!'},
];

var fileUpdate = document.getElementById('wheelInput');

fileUpdate.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const tmp = e.target.result.split('\n');
      const lst = tmp.map((item) => {
        return { label: item.trim() };
      }).filter((item) => item.label.length > 0);

      if (lst.length != 12) {
        alert('Please provide 12 items');
        return;
      }

      data = lst;

      updateDataInWheel();
    };
    reader.readAsText(file);
  }
});

// Init data filled in the wheel
var data = og;

var arcs;

function updateDataInWheel() {
  vis.selectAll('.slice').remove();
  arcs = vis.selectAll('g.slice').data(pie).enter().append('g').attr('class', 'slice');

  arcs.append('path').attr('fill', function (d, i) {
    return color(i);
  })
  .attr('d', function (d) {
    return arc(d);
  });


  // change the color of the text in the wheel
  arcs
    .append('text')
    .attr('transform', function (d) {
      d.innerRadius = 0;
      d.outerRadius = r;
      d.angle = (d.startAngle + d.endAngle) / 2;
      return 'rotate(' + (((d.angle * 180) / Math.PI - 90) + 3) + ')translate(' + (d.outerRadius - 20) + ')';
    })
    .attr('font-size', '14')
    .attr('stroke', 'black')
    .attr('font-align', 'center')
    .attr('stroke-width', 0,5)
    .attr('fill', function(d,i){
      return (i % 2 == 1) ? "white" : "black";
    })
    .attr('text-anchor', 'end')
    .text(function (d, i) {
      return data[i].label;
    });
}

var padding = { top: 0, right: 0, bottom: 0, left: 0 },
  w = 400 - padding.left - padding.right,
  h = 400 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = d3.scale.category20();

var svg = d3
  .select('#spinwheel')
  .append('svg')
  .data([data])
  .attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('viewBox', '0 0 ' + w + ' ' + w + '')
  .attr('width', w)
  .attr('height', h + padding.top + padding.bottom);
var container = svg
  .append('g')
  .attr('class', 'chartholder')
  .attr('transform', 'translate(' + (w / 2 + padding.left) + ',' + (h / 2 + padding.top) + ')');
var vis = container.append('g').attr('id','wheel');

var pie = d3.layout.pie().value(function (d) {
  return 1;
});
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// Initialize the wheel data
updateDataInWheel();

arcs
  .append('image')
  .attr('width', '60')
  .attr('height', '60')
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .attr('href', function (d) {
    return d.data.href;
  })
  .attr('transform', function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return 'rotate(' + (((d.angle * 180) / Math.PI - 90)) + ')translate(' + (d.outerRadius - 80) + ' ' + '-30' + ' )';
  });

var spinning = false;

$('#spin').on('click', () => spin(5));

$(document).on('keypress', function (e) {
  if (e.which == 13) {
    spin(2);
  }
  // listen on h key and hide and unhide
  if (e.which == 'h'.charCodeAt(0)) {
    fileUpdate.hidden = !fileUpdate.hidden;
  }
});

function spin(charge) {
  if (spinning) {
    return;
  }
  spinning = true;

  $('#spin').on('click', null);
  //all slices have been seen, all done

  var ps = 360 / data.length,
    rng = randomInteger(0, 359),
    random_offset = randomInteger(1, ps - 1);

  rotation = rng + Math.round(charge) * 360 + random_offset;

  if (rotation % ps == 0) {
    rotation += 3;
  }

  picked = (data.length - Math.round(((rotation + 180 + ps / 2) % 360) / ps)) % data.length;
  console.log(data[picked].label + " " + new Date().toISOString());

  d3.timer( function(){
    if($('#wheel').attr('transform')){
    let transform =  $('#wheel').attr('transform').replace('rotate(','').replace(')','');
    let rotation = parseFloat(transform);
    let curr = (data.length - Math.round(((rotation + 180 + ps / 2) % 360) / ps)) % data.length;
    document.getElementById('currentItem').innerHTML = data[curr].label;
  }
  });

  var interval = setInterval(function () {
    $('.wheeldots').addClass('active-dots');
    setTimeout(function () {
      $('.wheeldots').removeClass('active-dots');
    }, 500);
  }, 1000);
  vis
    .transition()
    .ease(d3.easeCubicOut)
    .duration(15000)
    .attrTween('transform', rotTween)
    .each('end', function () {
      setTimeout(() => {
        spinning = false;
      }, 1000 * 5);
      clearInterval(interval);
      oldrotation = (oldrotation + rotation) % 360;

      //populate question

      celebrate();
      document.getElementById('winMessage').innerHTML = '<h1>YOU WON ' + data[picked].label + '</h1>';
      document.getElementById('winMessage').style = 'display: block; margin-Top: 100px';
      setTimeout(() => {
        document.getElementById('winMessage').style = 'display: none';
      }, 5000);
      //      alert(data[picked].xp);

      //container.on("click", spin);
    });
}
//draw spin circle
container.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 15).style({ fill: '#FE905D' });

function rotTween(to) {
  //console.log("oldrotation: " + oldrotation);
  //console.log("rotation: " + rotation);
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return 'rotate(' + i(t) + ')';
  };
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function celebrate() {
  var end = Date.now() + 1 * 1000; // celebrate for 15 seconds

  var colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

tsParticles.load('tsparticles', {
  autoPlay: true,
  background: {
    color: { value: '#000' },
    image: '',
    position: '50% 50%',
    repeat: 'no-repeat',
    size: 'cover',
    opacity: 1,
  },
  backgroundMask: {
    composite: 'destination-out',
    cover: { color: { value: '#fff' }, opacity: 1 },
    enable: false,
  },
  fullScreen: { enable: true, zIndex: 1 },
  detectRetina: true,
  fpsLimit: 30,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      resize: true,
    },
  },
  manualParticles: [],
  particles: {
    color: {
      value: '#ffffff',
      animation: {
        h: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
        s: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
        l: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
      },
    },
    groups: {},
    life: {
      count: 0,
      delay: {
        random: { enable: false, minimumValue: 0 },
        value: 0,
        sync: false,
      },
      duration: {
        random: { enable: false, minimumValue: 0.0001 },
        value: 0,
        sync: false,
      },
    },
    move: {
      angle: { offset: 0, value: 90 },
      decay: 1,
      distance: {},
      direction: 'none',
      drift: 0,
      enable: true,
      random: false,
      size: false,
      speed: 0.5,
      straight: false,
      trail: { enable: false, length: 10, fillColor: { value: '#000000' } },
      vibrate: false,
      warp: false,
    },
    number: {
      density: { enable: true, area: 800, factor: 1000 },
      limit: 0,
      value: 80,
    },
    opacity: {
      random: { enable: false, minimumValue: 0.1 },
      value: { min: 0.1, max: 0.5 },
      animation: {
        count: 0,
        enable: true,
        speed: 1,
        sync: false,
        destroy: 'none',
        minimumValue: 0.1,
        startValue: 'random',
      },
    },
    reduceDuplicates: false,
    shape: {
      options: {
        character: [
          {
            fill: true,
            font: 'Font Awesome 5 Free',
            style: '',
            value: ['', '', '', ''],
            weight: '900',
          },
        ],
        polygon: { sides: 5 },
        star: { sides: 5 },
        image: {
          height: 100,
          replaceColor: true,
          src: 'https://particles.js.org/images/github.svg',
          width: 100,
        },
        images: {
          height: 100,
          replaceColor: true,
          src: 'https://particles.js.org/images/github.svg',
          width: 100,
        },
      },
      type: 'char',
    },
    size: {
      random: { enable: false, minimumValue: 1 },
      value: 16,
      animation: {
        count: 0,
        enable: true,
        speed: 10,
        sync: false,
        destroy: 'none',
        minimumValue: 10,
        startValue: 'random',
      },
    },
    stroke: {
      width: 1,
      color: {
        value: '#ffffff',
        animation: {
          h: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
          s: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
          l: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
        },
      },
    },
  },
  pauseOnBlur: false,
  pauseOnOutsideViewport: false,
  responsive: [],
  themes: [],
});
