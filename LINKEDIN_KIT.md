# LinkedIn Kit — copy, paste, personalise

Ready-to-use text for turning this portfolio into a LinkedIn profile that reads well to a **lab
recruiter, hiring manager or prospective PhD supervisor**.

Everything here is grounded in the documented projects. Replace anything in `[brackets]` before
publishing, and keep the simulation-vs-measurement distinction — it is what makes the profile
credible to a technical reader.

---

## 1. Headline (220 characters max)

Pick one. The first is the strongest for research roles.

**A — research-focused (recommended)**
```
Mechanical Engineer | Aerodynamics & CFD | M2 Fluid Mechanics & Energy, Lyon 1 | Wind-Turbine Design (BEM) | Seeking Research Internship / PhD
```

**B — motorsport/industry-facing**
```
Aerodynamics Engineer | Head of Aero, ENP Racing Team (Formula Student) | CFD: ANSYS Fluent & SimScale | Python | M2 Fluid Mechanics & Energy
```

**C — software/energy-facing**
```
Mechanical Engineer building simulation tools | Aerodynamics · CFD · Wind Energy | Python & BEM | M2 Fluid Mechanics & Energy, Lyon 1
```

---

## 2. About section (2,600 character limit)

```
I'm a mechanical engineer completing an M2 in Fluid Mechanics and Energy at Université Claude
Bernard Lyon 1. My work sits where aerodynamic modelling meets design automation: using fast,
physics-based models to explore a design space, and higher-fidelity CFD to check what the fast
models claim.

Two projects define how I work.

As Head of Aerodynamics for ENP Racing Team's Formula Student car, I developed the aero package
from first principles rather than from a shape. I started by deriving a drag-power budget — of the
45.3 kW reaching the wheels, about 28.4 kW could be spent on wing drag at 120 km/h without costing
top speed. That number sized the rear wing before any geometry existed. From there: 24 airfoils
screened with an automated Python/XFOIL campaign, 27 parametric 2D CFD runs in ANSYS Fluent, custom
sections designed with particle swarm optimisation, then 3D wing and full-vehicle CFD in SimScale
(k-omega SST, y+ < 1).

In simulation, the wings produced 460 N of downforce for 296 N of drag. Adding side diffusers and
underbody walls raised the downforce coefficient by a further 25% (to 3.35) at essentially unchanged
drag, lifting efficiency from 1.56 to 1.97. A lap-time simulation put the total gain at 2.4% — all of
it from medium and fast corners. I wrote the work up as a 53-page technical report, including what
the model does not establish: no physical validation, and a point-mass lap model with constant tyre
friction.

I also built Riyah, a Python/Streamlit application for horizontal-axis wind-turbine design and
performance prediction. It wraps blade-element momentum theory in the parts that usually stop people
using it: airfoil-polar acquisition and post-stall extrapolation, tip/hub and high-induction
corrections, blade geometry generation, 3D visualisation and differential-evolution optimisation. It
reproduces the NREL 5-MW reference optimum of Cp ≈ 0.482 at a tip-speed ratio of ≈ 7.55.

What I care about is that a result can be defended. I try to publish the assumption next to the
number — reference area, sign convention, mesh resolution, and the limits of the model — because a
reader who disagrees with an assumption can still use the result.

I'm looking for a research internship or PhD position in aerodynamics, CFD, wind energy or design
optimisation.

Portfolio: https://github.com/abdoubunaido-maker/haithem-engineering-portfolio
[Add your live GitHub Pages URL once deployed]
```

---

## 3. Experience entry

**Title:** Head of Aerodynamics
**Organisation:** ENP Racing Team (Formula Student)
**Location:** Algiers, Algeria · **Dates:** `[add months/years]`

```
Led aerodynamic development for the team's Formula Student car and authored the 53-page
aerodynamics technical report.

• Derived a power-based drag budget (28.4 kW of 45.3 kW at the wheels) and a prescribed
  centre-of-pressure target before geometry design, so every CFD run answered a defined question.
• Automated screening of 24 candidate airfoils in XFOIL using Python, with panel-count sweeps
  (N = 160–300) to verify panel independence.
• Ran 27 parametric 2D CFD cases in ANSYS Fluent (structured mesh, y+ < 3) across mainplane chord,
  flap incidence, slot gap and overlap; identified that the mainplane carries 75–80% of the load.
• Designed custom airfoils using particle swarm optimisation and Bézier refinement, derived from
  S1223 with rearward-shifted camber and a thickened trailing edge for manufacturability.
• Ran 3D wing and full-vehicle CFD in SimScale (k-omega SST, y+ < 1): 460 N downforce for 296 N drag;
  CL 3.35 at CD ≈ 1.7 with side diffusers and underbody walls.
• Quantified the design trade-off with OptimumLap lap-time simulation: 2.12 s (2.4%) gain on the FSG
  2012 endurance layout, with the gain concentrated in medium and fast corners.
• Designed two rib-and-mount rear-wing structural concepts against rulebook deflection limits.

The team represented Algeria at Formula Student UK and received the Newcomers Award.
All results are simulation results; no wind-tunnel or on-track validation was carried out.
```

---

## 4. Projects section

LinkedIn's **Projects** section lets you attach a URL to each entry — link each one to the matching
case-study page.

### Formula Student Aerodynamics — ENP Racing Team
**URL:** `[Pages URL]/projects/formula-student.html`
```
Design and CFD evaluation of a downforce-driven aero package for a low-speed, corner-dominated race
car. The car is traction-limited (wide-open throttle only 15–20% of a lap), so the study prioritises
downforce and pays for it in drag — after deriving how much drag is affordable.

Chain: rulebook constraints → drag-power budget → 24-airfoil XFOIL screening → 27 parametric 2D
Fluent runs → PSO-designed custom airfoils → 3D SimScale wing and full-vehicle CFD → side diffusers
and underbody walls → lap-time simulation.

Results (simulation): 460 N downforce / 296 N drag with wings; CL 3.35 at CD ≈ 1.7 with underbody
devices (efficiency 1.56 → 1.97); 2.4% simulated lap-time gain. Documented limitations include
non-final geometry, unseparated underbody contributions, and a constant-friction point-mass lap model.
```

### Riyah — Wind-Turbine Design and Performance Prediction
**URL:** `[Pages URL]/projects/riyah.html`
```
A Python/Streamlit application for horizontal-axis wind-turbine aerodynamic design and performance
prediction, built on blade-element momentum theory.

• Airfoil-polar pipeline: local database, fetched data or user upload; XFOIL generation or NeuralFoil
  prediction; extrapolation to ±180° so the solver never runs off the end of a table.
• Loss corrections: Prandtl tip and hub losses, plus an empirical high-induction correction for the
  turbulent-wake state.
• Preliminary blade design (chord and twist distributions), 3D blade visualisation, and
  differential-evolution optimisation over a non-smooth objective.
• Benchmarked against the NREL 5-MW reference turbine and the NREL Phase VI rotor; reproduces the
  published 5-MW optimum of Cp ≈ 0.482 at tip-speed ratio ≈ 7.55.
```

### Rocketry — Composite Fin Multiphysics Studies
**URL:** `[Pages URL]/projects/rocketry.html`
```
Two independent rocket models taken through CAD and shell idealisation, quarter-domain compressible
external-flow CFD (ANSYS Fluent, density-based solver, k-omega SST, energy equation, Pressure
Far-Field), and composite-fin static structural analysis with glass-fibre/wood-core laminates assigned
in ACP Mechanical.

The two studies are documented separately because they are different configurations, not design
iterations. One stress result does not reconcile with its material system and is flagged as unresolved
rather than presented as a passing design — the load case, units and laminate assignment need checking
against the original model.
```

---

## 5. Education entries

**Université Claude Bernard Lyon 1** — Master 2, Fluid Mechanics and Energy · `[dates]`
```
Graduate study in fluid mechanics, turbulence, energetics and numerical methods.
```

**École Nationale Polytechnique (ENP), Algiers** — Mechanical Engineering · `[dates]`
```
Project work in aerodynamics, composite structures and multiphysics simulation.
Head of Aerodynamics, ENP Racing Team (Formula Student).
```

---

## 6. Skills to add

Add these, then pin the top three. Order matters more than count.

**Pin these three:** `Computational Fluid Dynamics (CFD)` · `Aerodynamics` · `ANSYS Fluent`

**Then:** Aerodynamic Design · Wind Energy · Wind Turbines · Blade Element Momentum Theory ·
Python · Streamlit · SciPy · MATLAB · SimScale · ANSYS Mechanical · Composite Materials ·
ANSYS ACP · SolidWorks · XFOIL · XFLR5 · Finite Element Analysis · Turbulence Modeling ·
Boundary Layer Theory · Design Optimization · Particle Swarm Optimization · Numerical Methods ·
Data Visualization · LaTeX · Git · Technical Writing · Vehicle Dynamics · Motorsport

Ask two or three teammates or supervisors to endorse the pinned skills — endorsements from people
who worked on the project carry weight.

---

## 7. Featured section

Add these in order, so the first thing a visitor sees is the strongest work:

1. **The portfolio site** — `[Pages URL]` (title: "Engineering Portfolio — Aerodynamics, CFD & Wind Energy")
2. **Formula Student case study** — `[Pages URL]/projects/formula-student.html`
3. **Riyah case study** — `[Pages URL]/projects/riyah.html`
4. **The launch post** below, once published.

Use a figure as the thumbnail — the full-car pressure contour or the CAD side view both read well at
small size.

---

## 8. Launch post

See [`LINKEDIN_LAUNCH_POST.md`](LINKEDIN_LAUNCH_POST.md) for the full text.

---

## 9. Follow-up posts (one project at a time)

Posting each project separately gives you several weeks of material and reaches different audiences.

**Post A — the drag budget idea** (broad appeal, no jargon)
```
Before designing a single wing for our Formula Student car, I worked out how much drag we could
afford to add.

Of the 45.3 kW reaching the wheels, about 28.4 kW could go to aerodynamic drag at 120 km/h without
costing top speed. That is a surprisingly large allowance — and it changed the whole design direction.

Formula Student cars are traction-limited, not power-limited: the engine is at full throttle only
15–20% of a lap. So downforce is worth more than low drag. The budget told us how aggressive we could
be, before any geometry existed.

The final package produced 460 N of downforce for 296 N of drag in CFD, and a lap-time simulation
showed a 2.4% gain — all of it in medium and fast corners, with no loss of top speed.

These are simulation results, not track measurements, and I've written up the limitations alongside
them. Full method here: [link]

#aerodynamics #CFD #FormulaStudent #engineering
```

**Post B — the free downforce finding** (technical, specific)
```
The most efficient downforce on our Formula Student car didn't come from the wings.

Adding the front and rear wings took the downforce coefficient from ~0 to 2.69, but drag went from
0.645 to 1.73. Then we added side diffusers and underbody walls: the downforce coefficient rose to
3.35 — about 25% more — while drag stayed at ~1.70.

Efficiency went from 1.56 to 1.97. In lap-time terms the wings gained 1.65 s and the underbody devices
another 0.47 s, meaning the underbody work delivered more gain per unit of added downforce.

The lesson I took: once the wings are done, the floor is where the cheap downforce is. Caveat — we
didn't separate the diffuser and wall contributions, or test ride-height sensitivity. That's next.

Method and figures: [link]

#aerodynamics #CFD #groundeffect #FormulaStudent
```

**Post C — Riyah** (software + energy audience)
```
I built a wind-turbine design tool because the useful model was too awkward to use.

CFD is too expensive to run inside a design search. Blade-element momentum theory is fast enough —
but using it properly means assembling polars at the right Reynolds numbers, extrapolating them past
stall, and adding tip, hub and high-induction corrections. That setup work is what stops people using
BEM.

Riyah wraps the whole chain in a Streamlit app: polar acquisition (database, upload, XFOIL or
NeuralFoil), ±180° extrapolation, loss-corrected BEM, chord and twist design, a 3D blade view, and
differential-evolution optimisation.

As a check, it reproduces the NREL 5-MW reference turbine's published optimum: Cp ≈ 0.482 at a
tip-speed ratio of ≈ 7.55. Matching one point isn't full validation, and the write-up says so.

Details: [link]

#windenergy #python #BEM #engineeringsoftware
```

---

## 10. Outreach templates

### To a professor / lab — research internship or PhD interest

**Subject:** M2 Fluid Mechanics & Energy — internship/PhD interest in `[specific topic]`

```
Dear Professor `[Name]`,

I'm a mechanical engineer completing an M2 in Fluid Mechanics and Energy at Université Claude
Bernard Lyon 1. I'm writing about `[the specific paper or project of theirs]`, which connects closely
to work I've been doing on `[the shared method or problem — be specific]`.

Briefly, my background:
• As Head of Aerodynamics for a Formula Student team, I developed an aero package from a derived
  drag-power budget through XFOIL screening, 27 parametric 2D CFD cases, PSO-designed custom airfoils
  and 3D full-vehicle CFD, and documented it in a 53-page report.
• I built Riyah, a Python/Streamlit blade-element momentum application for wind-turbine design, with
  polar extrapolation, loss corrections and differential-evolution optimisation, benchmarked against
  the NREL 5-MW reference turbine.

Portfolio with methods, figures and stated limitations: `[URL]`

I'm looking for `[a research internship of X months from DATE / a PhD position]`. If your group has an
opening, I'd welcome the chance to discuss how I could contribute — particularly on `[a concrete
angle: e.g. surrogate-assisted rotor optimisation, or CFD verification of BEM predictions]`.

My CV is attached. Thank you for your time.

Best regards,
Haithem Abd Allah Benaida
`[email]` · `[phone]` · `[LinkedIn]`
```

**Why this works:** it names their work, states a concrete methodological overlap, gives two
verifiable pieces of evidence, and makes a specific ask. Avoid sending the same text to everyone —
the first paragraph must be genuinely specific to the recipient.

### To a recruiter / hiring manager — shorter

```
Hello `[Name]`,

I'm a mechanical engineer finishing an M2 in Fluid Mechanics and Energy at Lyon 1, with hands-on
aerodynamic development experience: I led aerodynamics for a Formula Student team (XFOIL, ANSYS
Fluent, SimScale, custom airfoil optimisation) and built a Python wind-turbine design application
around blade-element momentum theory.

I saw `[role]` at `[company]` and think the `[specific requirement]` part maps directly to that work.
My portfolio documents the methods and results, including limitations: `[URL]`

Would you be open to a short conversation?

Best regards,
Haithem Benaida · `[email]`
```

---

## 11. Pre-publish checklist

- [ ] Deploy GitHub Pages and replace every `[Pages URL]` in this file and the README.
- [ ] Add LinkedIn URL and professional email to `README.md`, `index.html` and `cv.html`.
- [ ] Fill the highlighted fields in `cv.html`, then Print → Save as PDF for applications.
- [ ] Add exact education and role dates to `cv.html` and the LinkedIn entries.
- [ ] Add languages and availability to the CV.
- [ ] Confirm with ENP Racing Team that the figures and results are cleared for public sharing.
- [ ] Make the Riyah repository public (or keep the "private" note) and add the demo link if you have one.
- [ ] Set a custom Open Graph thumbnail if you want a specific preview image on LinkedIn.
- [ ] Pin the portfolio repository on your GitHub profile.
- [ ] Ask 2–3 teammates or supervisors to endorse your top three skills.
