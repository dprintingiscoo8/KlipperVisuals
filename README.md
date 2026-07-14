# KlipperVisuals

Interactive, browser-based visualizations of the motion-control internals of
[Klipper](https://www.klipper3d.org/) and [Kalico](https://github.com/KalicoCrew/kalico) —
**pressure advance**, **input shaping**, and **resonance compensation**.

Each page reproduces the actual firmware math in JavaScript, so you can drag a
slider and watch how a parameter — or an algorithm choice — changes the result.

<p>
  <a href="https://hannott.github.io/KlipperVisuals/">
    <img alt="Live site" src="https://img.shields.io/badge/live-hannott.github.io%2FKlipperVisuals-2a78d6?style=for-the-badge">
  </a>
  <img alt="No build step" src="https://img.shields.io/badge/build-none%20(static%20HTML)-1d9e75?style=for-the-badge">
  <img alt="Charts" src="https://img.shields.io/badge/charts-Chart.js-eda100?style=for-the-badge">
</p>

## ▶ Live site

**https://hannott.github.io/KlipperVisuals/**

## Visualizations

| Page | What it shows |
| --- | --- |
| **[Pressure advance](https://hannott.github.io/KlipperVisuals/nonlinear_pa_explorer.html)** | The `tanh` and `recipr` nonlinear pressure-advance models — advance vs velocity, extruder flow rate, and acceleration demand over a test move, with the firmware's parabolic extruder smoother and a time-offset control. |
| **[Input shaper response](https://hannott.github.io/KlipperVisuals/input_shaper_response.html)** | Residual-vibration curves for every input shaper (ZV, MZV, ZVD, EI, 2hump/3hump EI), plus an impulse view and a damping-ratio sweep. Highlights the `3hump_ei` coefficient fix. |
| **[Smoothers vs shapers](https://hannott.github.io/KlipperVisuals/smoother_vs_shaper.html)** | Kalico's polynomial input smoothers vs classic impulse shapers, on shared vibration-reduction axes and in the time domain. |
| **[Extruder smoother kernel fit](https://hannott.github.io/KlipperVisuals/extruder_smoother_fit.html)** | The polynomial kernel that keeps pressure advance synchronized with input shaping, fitted before vs after the `extruder_smoother.py` rework, per shaper. |
| **[Resonance test excitation](https://hannott.github.io/KlipperVisuals/resonance_excitation.html)** | The motion `TEST_RESONANCES` generates — frequency sweep, per-cycle acceleration, and the optional sweeping oscillation — with the enforced accel/velocity limits derived from the real sequence vs the fixed formula. |
| **[Shaper estimation](https://hannott.github.io/KlipperVisuals/shaper_estimation_method.html)** | How `SHAPER_CALIBRATE` scores a shaper: the old finite-difference of the step response vs an analytic velocity with kink-exact evaluation and a parabola-refined minimum. |

Every chart has an interactive legend — click a series to hide or show it.

## How it works

- Each page is a **single self-contained HTML file** — no framework, no build
  step, no bundler. Styling adapts to light and dark mode.
- The physics and algorithms are **ported directly from the firmware source**
  (`klippy/chelper/kin_extruder.c`, `klippy/extras/shaper_defs.py`,
  `extruder_smoother.py`, `shaper_calibrate.py`, `resonance_tester.py`), with
  the exact formulas noted in each page's footer.
- Charts are rendered with [Chart.js](https://www.chartjs.org/) loaded from a
  CDN, so an internet connection is required to view them.

## A note on accuracy

Several pages contrast **proposed fixes** to the shaper pipeline against the
current upstream Kalico (`bleeding-edge-v2`) behaviour — for example the
`3hump_ei` coefficient bug and the resonance-test limit derivation. These are
labelled *fixed* / *upstream* (or equivalent) on each page. The pressure-advance
page models a custom nonlinear-PA implementation (`tanh`/`recipr`) that is not
part of mainline Klipper or upstream Kalico.

The visualizations are a faithful reproduction of the math but are **not the
firmware itself** — treat them as an intuition-building and teaching aid, not a
substitute for on-machine calibration.

## Running locally

The pages are static files. Clone the repo and open any `.html` directly, or
serve the folder:

```bash
git clone https://github.com/Hannott/KlipperVisuals.git
cd KlipperVisuals
python -m http.server 8000
# then open http://localhost:8000/
```

## Attribution

Reproduces algorithms from [Klipper](https://github.com/Klipper3d/klipper)
(© Kevin O'Connor and contributors) and
[Kalico](https://github.com/KalicoCrew/kalico), both licensed under the GNU
GPLv3. Input-shaper and pressure-advance math are the work of Dmitry Butyugin
and the Klipper/Kalico projects.
