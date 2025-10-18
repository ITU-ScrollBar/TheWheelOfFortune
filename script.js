var og = [
  { label: "1x Carrot Juice" },
  { label: "1x Cup of water" },
  { label: "1x Vodka Redbull" },
  { label: "2x Tuborg Gold" },
  { label: "1x ScrollBar Punch" },
  { label: "4x Pure Shots" },
  { label: "2x Somersby" },
  { label: "1x Pitcher" },
  { label: "5x Tequilla shots" },
  { label: "1x Draught Beer" },
  { label: "3x Jägerbombs" },
  { label: "2x Corona" },
];

// Go to loadThemes to change/add themes

var fileUpdate = document.getElementById("wheelInput");
var visibleThemeSelector = document.getElementById("themeSelectorVisible");

// Apply a theme by setting CSS variables on :root
function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.border) root.style.setProperty("--wheel-border", theme.border);
  if (theme.sliceFill) root.style.setProperty("--slice-fill", theme.sliceFill);
  if (theme.sliceAltFill)
    root.style.setProperty("--slice-alt-fill", theme.sliceAltFill);
  // if theme provides icons, reload particles with those icons
  if (theme.icons && theme.icons.length) {
    loadParticles(theme.icons);
  }
  // optional extra variables
  if (theme.centerFill) root.style.setProperty("--center-fill", theme.centerFill);
  if (theme.dotFill) root.style.setProperty("--dot-fill", theme.dotFill);
  if (theme.dotActiveFill) root.style.setProperty("--dot-active-fill", theme.dotActiveFill);
  if (theme.dotActiveAltFill) root.style.setProperty("--dot-active-alt-fill", theme.dotActiveAltFill);
  if (theme.spinButtonBg) root.style.setProperty("--spin-button-bg", theme.spinButtonBg);
  if (theme.spinButtonColor) root.style.setProperty("--spin-button-color", theme.spinButtonColor);
}

// helper to (re)load tsParticles with a set of icons (unicode glyphs)
function loadParticles(icons) {
  const defaultIcons =
    icons && icons.length ? icons : ["\uf561", "\uf72f", "\uf0fc", "\uf79f"];
  const charValues = defaultIcons.map((v) => v);

  // destroy existing instances to avoid duplicates
  try {
    if (
      window.tsParticles &&
      window.tsParticles.dom &&
      window.tsParticles.dom.length
    ) {
      window.tsParticles.dom.forEach((instance) => instance.destroy());
    }
  } catch (e) {}

  tsParticles.load("tsparticles", {
    autoPlay: true,
    background: {
      color: { value: "#000" },
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
      opacity: 1,
    },
    backgroundMask: {
      composite: "destination-out",
      cover: { color: { value: "#fff" }, opacity: 1 },
      enable: false,
    },
    fullScreen: { enable: true, zIndex: 1 },
    detectRetina: true,
    fpsLimit: 30,
    interactivity: { detectsOn: "canvas", events: { resize: true } },
    manualParticles: [],
    particles: {
      color: {
        value: "#ffffff",
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
        direction: "none",
        drift: 0,
        enable: true,
        random: false,
        size: false,
        speed: 0.5,
        straight: false,
        trail: { enable: false, length: 10, fillColor: { value: "#000000" } },
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
          destroy: "none",
          minimumValue: 0.1,
          startValue: "random",
        },
      },
      reduceDuplicates: false,
      shape: {
        options: {
          character: [
            {
              fill: true,
              font: "Font Awesome 5 Free",
              style: "",
              value: charValues,
              weight: "900",
            },
          ],
          polygon: { sides: 5 },
          star: { sides: 5 },
          image: {
            height: 100,
            replaceColor: true,
            src: "https://particles.js.org/images/github.svg",
            width: 100,
          },
          images: {
            height: 100,
            replaceColor: true,
            src: "https://particles.js.org/images/github.svg",
            width: 100,
          },
        },
        type: "char",
      },
      size: {
        random: { enable: false, minimumValue: 1 },
        value: 16,
        animation: {
          count: 0,
          enable: true,
          speed: 10,
          sync: false,
          destroy: "none",
          minimumValue: 10,
          startValue: "random",
        },
      },
      stroke: {
        width: 1,
        color: {
          value: "#ffffff",
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
}

// Load themes.json and populate visible selector
function loadThemes() {
  const embedded = {
    OG: {
      name: "OG",
      border: "#222",
      sliceFill: "#f7eb39",
      sliceAltFill: "#0f0f0f",
      icons: ["\uf561", "\uf72f", "\uf0fc", "\uf79f"],
    },
    "After Ski": {
      name: "After Ski",
      border: "#2D1E99",
      sliceFill: "#3F8EFC",
      sliceAltFill: "#87BFFF",
      icons: ["", "", "", "", ""],
    },
    Aperol: {
      name: "Aperol",
      border: "#222",
      sliceFill: "#fe6f2c",
      sliceAltFill: "#0f0f0f",
      /* additional themeable variables for Aperol */
      centerFill: "#FF3333",
      dotFill: "#FFFFFF",
      dotActiveFill: "#FF8A33",
      dotActiveAltFill: "#2D1E99",
      spinButtonBg: "#FF3333",
      spinButtonColor: "#FFFFFF",
      icons: ["\uf561", "\uf72f", "\uf0fc", "\uf79f"],
    },
  };

  // Use embedded themes only (no external fetch) — edit this object in script.js to add themes
  const themes = embedded;

  // clear existing
  if (visibleThemeSelector) visibleThemeSelector.innerHTML = "";
  Object.keys(themes).forEach((key) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.text = themes[key].name || key;
    if (visibleThemeSelector) visibleThemeSelector.appendChild(opt);
  });

  // apply OG default if available
  const defaultName = "OG";
  const defaultTheme = themes[defaultName] || themes[Object.keys(themes)[0]];
  if (defaultTheme) {
    applyTheme({
      border: defaultTheme.border,
      sliceFill:
        defaultTheme.sliceFill ||
        defaultTheme.slice_fill ||
        defaultTheme.slice ||
        defaultTheme.sliceFill,
      sliceAltFill:
        defaultTheme.sliceAltFill ||
        defaultTheme.slice_alt_fill ||
        defaultTheme.sliceAltFill,
      icons: defaultTheme.icons || defaultTheme.icon || [],
    });
    try {
      if (visibleThemeSelector) visibleThemeSelector.value = defaultName;
    } catch (e) {}
    try {
      loadParticles(
        defaultTheme.icons ||
          defaultTheme.icon || ["\uf561", "\uf72f", "\uf0fc", "\uf79f"]
      );
    } catch (e) {}
  }

  if (visibleThemeSelector) {
    visibleThemeSelector.addEventListener("change", function (e) {
      const key = e.target.value;
      const selected = themes[key];
      if (selected) {
        applyTheme({
          border: selected.border,
          sliceFill: selected.sliceFill,
          sliceAltFill: selected.sliceAltFill,
          icons: selected.icons,
        });
      }
    });
  }
}

// initialize themes on load
loadThemes();

fileUpdate.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const tmp = e.target.result.split("\n");
      const lst = tmp
        .map((item) => {
          return { label: item.trim() };
        })
        .filter((item) => item.label.length > 0);

      if (lst.length != 12) {
        alert("Please provide 12 items");
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
  vis.selectAll(".slice").remove();
  arcs = vis
    .selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

  arcs
    .append("path")
    .attr("fill", function (d, i) {
      return color(i);
    })
    .attr("d", function (d) {
      return arc(d);
    });

  arcs
    .append("text")
    .attr("transform", function (d) {
      d.innerRadius = 0;
      d.outerRadius = r;
      d.angle = (d.startAngle + d.endAngle) / 2;
      return (
        "rotate(" +
        ((d.angle * 180) / Math.PI - 90 + 3) +
        ")translate(" +
        (d.outerRadius - 20) +
        ")"
      );
    })
    .attr("font-size", "16")
    .attr("font-align", "center")
    .attr("fill", function (d, i) {
      return i % 2 == 1 ? "black" : "white";
    })
    .attr("text-anchor", "end")
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
  .select("#spinwheel")
  .append("svg")
  .data([data])
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .attr("viewBox", "0 0 " + w + " " + w + "")
  .attr("width", w)
  .attr("height", h + padding.top + padding.bottom);
var container = svg
  .append("g")
  .attr("class", "chartholder")
  .attr(
    "transform",
    "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
  );
var vis = container.append("g").attr("id", "wheel");

var pie = d3.layout.pie().value(function (d) {
  return 1;
});
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// Initialize the wheel data
updateDataInWheel();

arcs
  .append("image")
  .attr("width", "60")
  .attr("height", "60")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("href", function (d) {
    return d.data.href;
  })
  .attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
      "rotate(" +
      ((d.angle * 180) / Math.PI - 90) +
      ")translate(" +
      (d.outerRadius - 80) +
      " " +
      "-30" +
      " )"
    );
  });

var spinning = false;

$("#spin").on("click", () => spin(5));

$(document).on("keypress", function (e) {
  if (e.which == 13) {
    spin(2);
  }
});

// Remove previous hotspot (if any) and create a centered, easy-to-hit hotspot under the wheel.
// Hotspot reveals the file input on hover and provides a subtle visual cue.
(function () {
  // remove existing hotspot if present
  var old = document.getElementById("fileHotspot");
  if (old && old.parentNode) old.parentNode.removeChild(old);

  var hotspot = document.createElement("div");
  hotspot.id = "fileHotspot";
  Object.assign(hotspot.style, {
    position: "fixed",
    left: "50%", // center horizontally
    transform: "translateX(-50%)",
    bottom: "20px", // position under the wheel arrow; adjust if necessary
    width: "300px", // larger hit area
    height: "120px",
    zIndex: "999999",
    background: "transparent",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "auto",
  });

  if (fileUpdate) {
    // ensure the input isn't using the HTML hidden attribute
    try {
      fileUpdate.removeAttribute && fileUpdate.removeAttribute("hidden");
    } catch (e) {}
    fileUpdate.hidden = false;

    // move the input into the hotspot
    hotspot.appendChild(fileUpdate);

    // move the visible theme selector into the hotspot as well (hidden by default)
    try {
      if (visibleThemeSelector && visibleThemeSelector.parentNode) {
        // remove from existing parent first
        visibleThemeSelector.parentNode.removeChild(visibleThemeSelector);
      }
    } catch (e) {}
    if (visibleThemeSelector) {
      // ensure it's visible in DOM but hidden visually until hover
      visibleThemeSelector.style.position = "absolute";
      visibleThemeSelector.style.bottom = "8px";
      visibleThemeSelector.style.left = "8px";
      visibleThemeSelector.style.zIndex = "1000000";
      visibleThemeSelector.style.opacity = "0";
      visibleThemeSelector.style.pointerEvents = "none";
      visibleThemeSelector.style.transition =
        "opacity 180ms ease, transform 180ms ease";
      visibleThemeSelector.style.transform = "translateY(6px)";
      hotspot.appendChild(visibleThemeSelector);
    }

    // make the input fill the hotspot but start invisible/uninteractive
    Object.assign(fileUpdate.style, {
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: "0",
      transition:
        "opacity 180ms ease, background 180ms ease, box-shadow 180ms ease",
      cursor: "pointer",
      pointerEvents: "none",
      background: "rgba(255,255,255,0.0)", // hidden when not hovered
      borderRadius: "12px",
      border: "none",
      padding: "0",
      margin: "0",
      display: "block",
      boxSizing: "border-box",
    });

    // subtle cue to show hotspot bounds (hidden until hover)
    var cue = document.createElement("div");
    Object.assign(cue.style, {
      position: "absolute",
      width: "92%",
      height: "92%",
      borderRadius: "10px",
      background: "transparent",
      boxShadow: "none",
      transition:
        "background 180ms ease, box-shadow 180ms ease, transform 180ms ease",
      pointerEvents: "none",
    });
    hotspot.appendChild(cue);

    hotspot.addEventListener("mouseenter", function () {
      // reveal the file input and cue so the user can click
      fileUpdate.style.opacity = "1";
      fileUpdate.style.pointerEvents = "auto";
      fileUpdate.style.background = "rgba(255,255,255,0.96)"; // visible input area while hovered
      fileUpdate.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
      cue.style.background = "rgba(255,255,255,0.04)";
      cue.style.boxShadow = "0 8px 26px rgba(0,0,0,0.12)";
      cue.style.transform = "scale(1.02)";
      // reveal the theme selector
      if (visibleThemeSelector) {
        visibleThemeSelector.style.opacity = "1";
        visibleThemeSelector.style.pointerEvents = "auto";
        visibleThemeSelector.style.transform = "translateY(0)";
      }
    });

    hotspot.addEventListener("mouseleave", function () {
      // hide again
      fileUpdate.style.opacity = "0";
      fileUpdate.style.pointerEvents = "none";
      fileUpdate.style.background = "transparent";
      fileUpdate.style.boxShadow = "none";
      cue.style.background = "transparent";
      cue.style.boxShadow = "none";
      cue.style.transform = "scale(1)";
      // hide theme selector
      if (visibleThemeSelector) {
        visibleThemeSelector.style.opacity = "0";
        visibleThemeSelector.style.pointerEvents = "none";
        visibleThemeSelector.style.transform = "translateY(6px)";
      }
    });
  }

  document.body.appendChild(hotspot);
})();

function spin(charge) {
  if (spinning) {
    return;
  }
  spinning = true;

  $("#spin").on("click", null);
  //all slices have been seen, all done

  var ps = 360 / data.length,
    rng = randomInteger(0, 359),
    random_offset = randomInteger(1, ps - 1);

  rotation = rng + Math.round(charge) * 360 + random_offset;

  if (rotation % ps == 0) {
    rotation += 3;
  }

  picked =
    (data.length - Math.round(((rotation + 180 + ps / 2) % 360) / ps)) %
    data.length;
  console.log(data[picked].label + " " + new Date().toISOString());

  d3.timer(function () {
    if ($("#wheel").attr("transform")) {
      let transform = $("#wheel")
        .attr("transform")
        .replace("rotate(", "")
        .replace(")", "");
      let rotation = parseFloat(transform);
      let curr =
        (data.length - Math.round(((rotation + 180 + ps / 2) % 360) / ps)) %
        data.length;
      document.getElementById("currentItem").innerHTML = data[curr].label;
    }
  });

  var interval = setInterval(function () {
    $(".wheeldots").addClass("active-dots");
    setTimeout(function () {
      $(".wheeldots").removeClass("active-dots");
    }, 500);
  }, 1000);
  vis
    .transition()
    .ease(d3.easeCubicOut)
    .duration(15000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      setTimeout(() => {
        spinning = false;
      }, 1000 * 5);
      clearInterval(interval);
      oldrotation = (oldrotation + rotation) % 360;

      //populate question

      celebrate();
      document.getElementById("winMessage").innerHTML =
        "<h1>You won " + data[picked].label + "</h1>";
      document.getElementById("winMessage").style =
        "display: block; margin-Top: 100px";
      setTimeout(() => {
        document.getElementById("winMessage").style = "display: none";
      }, 5000);
      //      alert(data[picked].xp);

      //container.on("click", spin);
    });
}
//draw spin circle
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 10)
  .style("fill", "var(--center-fill)");

function rotTween(to) {
  //console.log("oldrotation: " + oldrotation);
  //console.log("rotation: " + rotation);
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function celebrate() {
  var end = Date.now() + 1 * 1000; // celebrate for 15 seconds

  var colors = ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"];

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
