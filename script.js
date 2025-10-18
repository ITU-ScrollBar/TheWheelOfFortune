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
  { label: 'SPIN AGAIN!'},
];

/* ====================
   CONFIG (easy to edit)
   - Put things you expect to change often near the top
   - Themes are defined here so you can edit them without digging
 ==================== */

// Default wheel data (items). Edit the `og` array at the top of this file if you
// want different prizes. Keep 12 entries for the wheel to work as expected
// (file input validation enforces this).
// NOTE: `og` is declared above — we rely on that original array instance.

// Editable themes object: change colors, center circle, border, and particle icons here.
// Each key is a theme id. The loader will expose these in the visible selector.
const THEMES = {
  OG: {
    name: "OG",
    sliceFill: "#f7eb39",
    sliceAltFill: "#0f0f0f",
    icons: ["\uf561", "\uf72f", "\uf0fc", "\uf79f"],
  },
  "After Ski": {
    name: "After Ski",
    border: "#1C3FD4",
    sliceFill: "#3F8EFC",
    sliceAltFill: "#87BFFF",
    icons: ["", "", "", "", ""],
  },
  Aperol: {
    name: "Aperol",
    border: "#FE905D",
    sliceFill: "#fff",
    sliceAltFill: "#fe6f2c",
    icons: ["\uf561", "\uf72f", "\uf0fc", "\uf79f"],
  },
  Shrek: {
    name: "Shrek",
    border: "#956F37",
    centerFill: "#795A2D",
    sliceFill: "#CBD421",
    sliceAltFill: "#93A300",
    icons: ["", "", "", ""],
  },
};

// Default theme id to apply on startup
const DEFAULT_THEME_NAME = "OG";

// DOM references used by theming and file input
var fileUpdate = document.getElementById("wheelInput");
var visibleThemeSelector = document.getElementById("themeSelectorVisible");

// will hold computed defaults captured at load time so themes can revert unspecified values
var themeDefaults = {};

// Apply a theme by setting CSS variables on :root
function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  // helper to pick theme value or default
  const pick = (key) =>
    theme[key] !== undefined ? theme[key] : themeDefaults[key];

  // basic CSS vars
  const border = pick("border");
  if (border !== undefined) root.style.setProperty("--wheel-border", border);

  const borderWidth = pick("borderWidth");
  if (borderWidth !== undefined)
    root.style.setProperty("--wheel-border-width", borderWidth);

  const sliceFill = pick("sliceFill");
  if (sliceFill !== undefined)
    root.style.setProperty("--slice-fill", sliceFill);

  const sliceAltFill = pick("sliceAltFill");
  if (sliceAltFill !== undefined)
    root.style.setProperty("--slice-alt-fill", sliceAltFill);

  const wheelBg = pick("wheelBg");
  if (wheelBg !== undefined) root.style.setProperty("--wheel-bg", wheelBg);

  // dots and button
  const centerFill = pick("centerFill");
  if (centerFill !== undefined)
    root.style.setProperty("--center-fill", centerFill);

  const dotFill = pick("dotFill");
  if (dotFill !== undefined) root.style.setProperty("--dot-fill", dotFill);

  const dotActiveFill = pick("dotActiveFill");
  if (dotActiveFill !== undefined)
    root.style.setProperty("--dot-active-fill", dotActiveFill);

  const dotActiveAltFill = pick("dotActiveAltFill");
  if (dotActiveAltFill !== undefined)
    root.style.setProperty("--dot-active-alt-fill", dotActiveAltFill);

  const spinButtonBg = pick("spinButtonBg");
  if (spinButtonBg !== undefined)
    root.style.setProperty("--spin-button-bg", spinButtonBg);

  const spinButtonColor = pick("spinButtonColor");
  if (spinButtonColor !== undefined)
    root.style.setProperty("--spin-button-color", spinButtonColor);

  const winTextStrokeColor = pick("winTextStrokeColor");
  if (winTextStrokeColor !== undefined)
    root.style.setProperty("--win-text-stroke-color", winTextStrokeColor);

  // icons (particles)
  const icons = pick("icons") || [];
  try {
    loadParticles(icons);
  } catch (e) {}

  // update center circle attributes (SVG attrs)
  try {
    const center = document.getElementById("wheelCenter");
    if (center) {
      const cr = pick("centerRadius");
      if (cr !== undefined) center.setAttribute("r", cr);
      const cstroke = pick("centerStroke");
      if (cstroke !== undefined) center.setAttribute("stroke", cstroke);
      const cstrokew = pick("centerStrokeWidth");
      if (cstrokew !== undefined) center.setAttribute("stroke-width", cstrokew);
    }
  } catch (e) {}
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
/**
 * loadThemes()
 *
 * Embedded themes live inside this function (edit them here).
 * Supported theme properties and what they affect:
 *
 * - name (string): human readable name shown in the selector.
 * - border (CSS color): color used for the wheel perimeter. Sets --wheel-border.
 * - borderWidth (CSS length, e.g. '15px'): thickness of the wheel border. Sets --wheel-border-width.
 * - sliceFill (CSS color): primary slice color. Sets --slice-fill.
 * - sliceAltFill (CSS color): alternating slice color. Sets --slice-alt-fill.
 * - wheelBg (CSS color): background color of the wheel SVG (optional) -> sets --wheel-bg.
 *
 * - centerFill (CSS color): fill color for the center circle. Sets --center-fill.
 * - centerRadius (number): radius (r attribute) for the center circle (SVG units, number without 'px').
 * - centerStroke (CSS color): stroke color for center circle.
 * - centerStrokeWidth (number/string): stroke-width for center circle (SVG accepts numbers/strings).
 *
 * - dotFill (CSS color): color of small dots around the wheel. Sets --dot-fill.
 * - dotActiveFill (CSS color): color for animated/active dots. Sets --dot-active-fill.
 * - dotActiveAltFill (CSS color): alternate active-dot color. Sets --dot-active-alt-fill.
 *
 * - spinButtonBg (CSS color): background color for the spin button. Sets --spin-button-bg.
 * - spinButtonColor (CSS color): text color for the spin button. Sets --spin-button-color.
 *
 * - winTextStrokeColor (CSS color): stroke color used on #winMessage text (sets --win-text-stroke-color).
 *
 * - icons (array): array of glyphs/characters used by the particle background (tsParticles characters).
 *
 * Notes:
 * - Colors should be valid CSS colors (hex, rgb, named).
 * - CSS variables are used for most values so changes are instant without reloading the SVG.
 * - centerRadius is an SVG attribute (number) while borderWidth is a CSS length (e.g. '18px').
 */
/**
 * registerThemeSelector(themes)
 * Populate the visible selector DOM with entries from `themes`.
 */
function registerThemeSelector(themes) {
  if (!visibleThemeSelector) return;
  visibleThemeSelector.innerHTML = "";
  Object.keys(themes).forEach((key) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.text = themes[key].name || key;
    visibleThemeSelector.appendChild(opt);
  });
}

/**
 * loadThemes()
 * Use the top-level THEMES object and wire up the visible selector.
 */
function loadThemes() {
  const themes = THEMES;

  // populate selector
  registerThemeSelector(themes);

  // Capture current computed CSS variable values and SVG center attributes as defaults
  try {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    const center = document.getElementById("wheelCenter");
    themeDefaults = {
      border: cs.getPropertyValue("--wheel-border").trim() || undefined,
      borderWidth:
        cs.getPropertyValue("--wheel-border-width").trim() || undefined,
      sliceFill: cs.getPropertyValue("--slice-fill").trim() || undefined,
      sliceAltFill: cs.getPropertyValue("--slice-alt-fill").trim() || undefined,
      wheelBg: cs.getPropertyValue("--wheel-bg").trim() || undefined,
      centerFill: cs.getPropertyValue("--center-fill").trim() || undefined,
      centerRadius: center ? center.getAttribute("r") || undefined : undefined,
      centerStroke: center
        ? center.getAttribute("stroke") || undefined
        : undefined,
      centerStrokeWidth: center
        ? center.getAttribute("stroke-width") || undefined
        : undefined,
      dotFill: cs.getPropertyValue("--dot-fill").trim() || undefined,
      dotActiveFill:
        cs.getPropertyValue("--dot-active-fill").trim() || undefined,
      dotActiveAltFill:
        cs.getPropertyValue("--dot-active-alt-fill").trim() || undefined,
      spinButtonBg: cs.getPropertyValue("--spin-button-bg").trim() || undefined,
      spinButtonColor:
        cs.getPropertyValue("--spin-button-color").trim() || undefined,
      winTextStrokeColor:
        cs.getPropertyValue("--win-text-stroke-color").trim() || undefined,
      icons:
        themes[DEFAULT_THEME_NAME] && themes[DEFAULT_THEME_NAME].icons
          ? themes[DEFAULT_THEME_NAME].icons.slice()
          : [],
    };
  } catch (e) {
    console.warn("Could not capture theme defaults", e);
  }

  // apply configured default theme
  const defaultTheme =
    themes[DEFAULT_THEME_NAME] || themes[Object.keys(themes)[0]];
  if (defaultTheme) {
    applyTheme(defaultTheme);
    try {
      if (visibleThemeSelector) visibleThemeSelector.value = DEFAULT_THEME_NAME;
    } catch (e) {}
  }

  if (visibleThemeSelector) {
    visibleThemeSelector.addEventListener("change", function (e) {
      const key = e.target.value;
      const selected = themes[key];
      if (selected) applyTheme(selected);
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


  // change the color of the text in the wheel
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
  .attr("id", "wheelCenter")
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
