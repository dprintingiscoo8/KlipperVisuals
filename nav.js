// Shared navigation bar for KlipperVisuals.
// Injected into every page via <script src="nav.js"></script>.
// Edit the link list or styles here once to update all pages.
(function () {
  var LINKS = [
    ["nonlinear_pa_explorer.html", "Pressure advance"],
    ["input_shaper_response.html", "Input shapers"],
    ["two_mode_shaper.html", "Two-mode"],
    ["smoother_vs_shaper.html", "Smoothers"],
    ["extruder_smoother_fit.html", "Extruder fit"],
    ["resonance_excitation.html", "Resonance test"],
    ["shaper_estimation_method.html", "Estimation"]
  ];
  var WIDTH = "1040px"; // must match .wrap max-width on the pages

  var cur = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (cur === "") cur = "index.html";

  var css = [
    ".kv-nav{position:sticky;top:0;z-index:20;background:var(--surface-0);border-bottom:.5px solid var(--border);}",
    ".kv-nav-inner{max-width:" + WIDTH + ";margin:0 auto;padding:.62rem 1.25rem;display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;font-size:14px;line-height:1.4;}",
    ".kv-nav a{text-decoration:none;}",
    ".kv-nav .brand{font-weight:500;color:var(--text-primary);margin-right:auto;padding-bottom:3px;border-bottom:2px solid transparent;}",
    ".kv-nav .links{display:flex;flex-wrap:wrap;gap:12px 16px;}",
    ".kv-nav .links a{color:var(--text-secondary);padding-bottom:3px;border-bottom:2px solid transparent;}",
    ".kv-nav .links a:hover{color:var(--text-primary);}",
    ".kv-nav a.current{color:var(--blue);border-bottom-color:var(--blue);}"
  ].join("");
  var st = document.createElement("style");
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  var brandCur = cur === "index.html" ? " current" : "";
  var h = '<div class="kv-nav-inner"><a class="brand' + brandCur + '" href="index.html">KlipperVisuals</a><nav class="links">';
  for (var i = 0; i < LINKS.length; i++) {
    var isCur = cur === LINKS[i][0].toLowerCase();
    h += "<a" + (isCur ? ' class="current" aria-current="page"' : "") + ' href="' + LINKS[i][0] + '">' + LINKS[i][1] + "</a>";
  }
  h += "</nav></div>";

  function mount() {
    var header = document.createElement("header");
    header.className = "kv-nav";
    header.innerHTML = h;
    document.body.insertBefore(header, document.body.firstChild);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
