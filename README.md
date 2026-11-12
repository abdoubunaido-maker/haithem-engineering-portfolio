# Haithem Benaida — Engineering Portfolio

**Aerodynamics · CFD · Wind Energy · Design Optimisation · Engineering Software**

Mechanical engineer and M2 student in Fluid Mechanics and Energy at Université Claude Bernard Lyon 1.
I build simulation-driven designs and the software that makes them usable — from a Formula Student
aero package developed from a power budget upwards, to **Riyah**, a wind-turbine design and
performance-prediction application.

**→ Live portfolio:** `https://abdoubunaido-maker.github.io/haithem-engineering-portfolio/`
**→ Print-ready CV:** [`cv.html`](cv.html)

> **Open to a research internship or PhD position** in aerodynamics, CFD, wind energy or design
> optimisation.

---

## What's here

| Project | Role / type | Methods | Headline result |
|---|---|---|---|
| [**Formula Student aero package**](projects/formula-student-aerodynamics/README.md) | Head of Aerodynamics, ENP Racing Team | Drag-power budget · XFOIL · 2D/3D CFD · PSO airfoils · lap simulation | **460 N** downforce / **296 N** drag; **C<sub>L</sub> 3.35** at C<sub>D</sub> ≈ 1.7; **−2.4%** lap time |
| [**Riyah** — HAWT design tool](projects/riyah-hawt-design/README.md) | Author, engineering web application | BEM · polar extrapolation · differential evolution | Reproduces NREL 5-MW optimum **C<sub>P</sub> ≈ 0.482 at λ ≈ 7.55** |
| [**Rocketry** — two fin studies](projects/rocketry-cad-cfd-structural/README.md) | Analyst | CAD · compressible CFD · composite FEA | Two separate models, one unreconciled stress result flagged |
| [**CFD & fluid-mechanics notes**](projects/cfd-studies/README.md) | Author | Verification · near-wall modelling · convergence | The checks behind the results above |

> **Portfolio note.** Results are **numerical simulation results** unless explicitly labelled
> otherwise. No wind-tunnel, on-track or flight-test validation is claimed. Third-party and
> team-confidential material is not republished; all figures shown are from my own analyses.

---

## 1. Formula Student — aerodynamic package

**Role:** Head of Aerodynamics, ENP Racing Team · **Report:** 53 pages, sole author, October 2026

The argument that drives the whole design: Formula Student cars are **traction-limited, not
power-limited** — the engine is at wide-open throttle only 15–20% of a lap. So downforce is worth
more than low drag, and the question becomes *how much drag can we afford?*

**Method, in order:**

1. **Drag-power budget first.** From 51.5 kW at the engine and ~12% drivetrain loss, 45.3 kW reaches
   the wheels. At 120 km/h with a baseline C<sub>D</sub>A from comparable cars,
   **28.4 kW is available for wing drag** — giving an allowable rear-wing drag area of **1.25 m²**.
   The target exists before any geometry does.
2. **Rear wing first, front wing to balance.** The rear wing is the stable primary device; the front
   wing supplies the remainder to place the centre of pressure (~40% front).
3. **Screen cheaply.** 24 airfoils pulled by Python script and run through batch XFOIL at
   Re = 3×10⁵, transition forced at 50% chord, −4° to 20°, repeated at panel counts 160→300 to prove
   panel independence. S1223 selected as a *starting point*, not a final answer.
4. **27 parametric 2D CFD runs** in ANSYS Fluent (structured mesh, inflation layers, y⁺ < 3):
   mainplane chords 350/400/450 mm, flap incidences, then slot-gap and overlap sweeps.
   Found that the mainplane carries **75–80% of the load**, α<sub>F1</sub> = 25° is the separation
   limit, and a choked slot jet was starving the second flap.
5. **Custom airfoils** via particle swarm optimisation plus Bézier refinement — S1223-derived with
   rearward-shifted camber and a thickened trailing edge for manufacturability.
6. **3D CFD** in SimScale (k–ω SST, y⁺ < 1, inlet 3c / outlet 8c / lateral 3c), then full-vehicle
   runs under identical wind-tunnel conditions.
7. **Underbody devices** — side diffusers and sealing walls, because the chassis wouldn't accept a
   full Venturi floor.
8. **Lap-time simulation** to check the trade-off actually pays.

**Results (all CFD / simulation):**

| Configuration | C<sub>L</sub> | C<sub>D</sub> | C<sub>L</sub>/C<sub>D</sub> | Lap time |
|---|---:|---:|---:|---:|
| Baseline, no aero devices | 0.005 | 0.645 | — | 86.71 s |
| Front + rear wings | 2.69 | 1.73 | 1.56 | 85.06 s |
| + side diffusers + underbody walls | **3.35** | **1.70** | **1.97** | **84.59 s** |

The underbody devices add **~25% more downforce coefficient at essentially no drag cost** — making
the lower bodywork the more efficient place to look for further gains. Total simulated gain
**2.12 s (2.4%)**, entirely from medium and fast corners; all three configurations reach the same
110 km/h straight-line ceiling despite ~2.7× the drag.

**Limitations stated up front:** non-final car geometry; diffuser and wall contributions not
separated; no ride-height/pitch/roll sensitivity study; point-mass lap model with constant tyre
friction and a generic powertrain; no physical validation. Real gains are likely smaller.

**Team context:** ENP Racing Team represented Algeria at Formula Student UK and received the
**Newcomers Award**.

**[→ Full case study](projects/formula-student-aerodynamics/README.md)** ·
**[→ Web version with figures and interactive charts](projects/formula-student.html)**

---

## 2. Riyah — wind-turbine design and performance prediction

**Type:** Engineering web application · Python + Streamlit

Rotor design has an awkward gap: CFD is too expensive to run inside a design search, while BEM is
fast enough but needs a lot of unglamorous machinery assembled first. Riyah closes that gap.

- **BEM solver** with Prandtl tip and hub losses and an empirical high-induction correction for the
  turbulent-wake state (a ≳ 0.4), where plain momentum theory becomes non-physical.
- **Airfoil-polar pipeline** — local database, fetched data or user upload; generation with XFOIL or
  prediction with NeuralFoil where available; **extrapolation to ±180°** so the solver never walks
  off the end of a table at start-up or low tip-speed ratio.
- **Preliminary blade design** — chord and twist distributions from the optimum-rotor relations,
  with 3D blade visualisation to catch geometry that won't manufacture.
- **Differential-evolution optimisation** — derivative-free search suits the non-smooth objective
  (interpolated polars, correction branch switches, stall kinks) and BEM keeps evaluations cheap.
- **Benchmarked** against the NREL 5-MW reference turbine and the NREL Phase VI (UAE) rotor. The
  5-MW definition report publishes C<sub>P,max</sub> = **0.482 at λ = 7.55**; a value recorded during
  development reproduced **≈0.482 near λ ≈ 7.55**, matching both magnitude and location.

**Honest scope:** matching one operating point is not validation of the whole model. BEM assumes
independent annuli, steady axial inflow and a rigid blade; deep-stall answers depend on the
extrapolation model chosen. The source repository is currently private, so there is no public demo
yet.

**[→ Full case study](projects/riyah-hawt-design/README.md)** ·
**[→ Web version with method derivation](projects/riyah.html)**

---

## 3. Rocketry — two independent multiphysics studies

Two **different** rocket models, each documented separately: CAD and shell idealisation →
quarter-domain compressible CFD (density-based solver, k–ω SST, energy equation, Pressure Far-Field)
→ composite-fin static structural analysis with laminates assigned in ACP Mechanical.

- **Study 1** — 3 mm wood core, 500/500/240 g/m² glass: peak equivalent stress ≈ **9.99 MPa** against
  an estimated allowable of ≈ **13.4 MPa**.
- **Study 2** — 2 mm wood core, 240 g/m² glass throughout: stress plot displays **875.42 MPa** and
  deformation **9.5887 mm**, with **no documented allowable**. These are reported as plot readings
  only, **not** as evidence of structural adequacy — the load case, units and laminate assignment
  need checking against the original model.

They are kept in separate folders because they are separate models, not design iterations.

**[→ Overview](projects/rocketry-cad-cfd-structural/README.md)** ·
[Study 1](projects/rocketry-study-01/README.md) · [Study 2](projects/rocketry-study-02/README.md) ·
[Web version](projects/rocketry.html)

---

## How I work

1. **Derive the target before opening the mesher.** Budgets and balance targets come from analysis,
   so every CFD run answers a question that was already well posed.
2. **Filter with cheap models, then spend the compute.** 24 XFOIL candidates → 27 2D runs → a handful
   of 3D configurations. Panel sweeps, y⁺ maps and force-coefficient convergence decide what advances.
3. **Automate the repetitive part.** Python drove the airfoil retrieval and batch XFOIL campaign;
   Riyah applies the same instinct to rotor design.
4. **Publish the assumption next to the number.** Reference area, reference velocity, sign
   convention, 2D vs 3D, and what the model does *not* establish.

---

## Tools and methods

`Python` · `Streamlit` · `SciPy` · `Plotly` · `MATLAB` · `ANSYS Fluent` · `SimScale` ·
`ANSYS Mechanical` · `ACP Mechanical` · `XFOIL` · `XFLR5` · `NeuralFoil` · `SolidWorks` ·
`OptimumLap` · `LaTeX` · `Git`

Methods: `BEM` · `momentum theory` · `k–ω SST` · `compressible external flow` · `composite laminates` ·
`particle swarm optimisation` · `differential evolution` · `Bézier parametrisation`

*Tools are listed against the projects that used them — not a claim of equal proficiency in all.*

---

## Repository structure

```text
.
├── index.html                      # Portfolio landing page (GitHub Pages)
├── cv.html                         # Print-ready CV → Save as PDF
├── projects/
│   ├── formula-student.html        # Case study: figures + interactive charts
│   ├── riyah.html                  # Case study: BEM derivation + interactive theory
│   ├── rocketry.html               # Case study: both studies
│   ├── cfd-notes.html              # Verification methodology
│   ├── formula-student-aerodynamics/README.md
│   ├── riyah-hawt-design/README.md
│   ├── rocketry-cad-cfd-structural/README.md
│   ├── rocketry-study-01/README.md
│   ├── rocketry-study-02/README.md
│   └── cfd-studies/README.md
├── assets/
│   ├── css/site.css                # Design system (dark/light, print styles)
│   ├── js/site.js                  # Charts, lightbox, theme — no dependencies
│   ├── formula-student/            # 38 original figures from the report
│   └── rocketry/{study-1,study-2}/ # Kept separate by source model
├── project-template/README.md
├── LINKEDIN_KIT.md                 # Profile copy: headline, about, project entries
└── SETUP.md                        # Publishing instructions
```

The site is **plain HTML/CSS/JS with no build step and no external dependencies** — it works on
GitHub Pages as-is, offline, and prints cleanly.

---

## Contact

- **GitHub:** [@abdoubunaido-maker](https://github.com/abdoubunaido-maker)
- **Location:** Lyon, France
- **LinkedIn:** *add profile URL before sharing*
- **Email:** *add a professional address if you want it public*

For a research internship, a PhD opening, or a technical discussion about any of these studies —
including where you think the modelling is wrong.
