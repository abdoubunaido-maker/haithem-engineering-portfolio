# Riyah — Horizontal-Axis Wind-Turbine Design and Performance Prediction

**Project type:** Engineering web application / final-year project
**Stack:** Python · Streamlit · BEM · panel method / XFOIL / NeuralFoil / SU2 · differential evolution
**Status:** Deployed on Streamlit Community Cloud; also runs locally

**[→ Web case study with method derivation and interactive theory](../riyah.html)** · **[→ Back to portfolio](../../README.md)**

---

## Contents

1. [Why build this](#1-why-build-this)
2. [Capabilities](#2-capabilities)
3. [Architecture](#3-architecture)
4. [Method — BEM](#4-method--bem)
5. [Corrections](#5-corrections)
6. [Airfoil-polar pipeline](#6-airfoil-polar-pipeline)
7. [CFD polar generation with SU2](#7-cfd-polar-generation-with-su2)
8. [Blade design](#8-blade-design)
9. [Optimisation](#9-optimisation)
10. [Validation](#10-validation)
11. [Limitations and reproducibility](#11-limitations-and-reproducibility)
12. [Roadmap](#12-roadmap)
13. [References](#13-references)

---

## 1. Why build this

Rotor aerodynamics has an awkward gap in it. **CFD** resolves the flow but is far too expensive to run
thousands of times inside a design search. **Blade-element momentum theory** is cheap enough for that
— a full C<sub>P</sub>–λ curve in a fraction of a second — but using it properly means assembling a lot
of unglamorous machinery first: polars at the right Reynolds numbers, extrapolated to angles no wind
tunnel reached, plus tip, hub and high-induction corrections.

**Riyah closes that gap.** It puts the whole chain behind one interface, so a rotor can be specified,
analysed, reshaped and optimised without leaving the tool. It is built to be used by someone who wants
an answer, not by someone who wants to write a BEM solver. It ships with built-in validation against
**MEXICO** and **NREL UAE Phase VI** experimental data (C<sub>P</sub> RMSE **0.028** and **0.038**), and
is **deployed on Streamlit Community Cloud**.

---

## 2. Capabilities

### Input and data
- Interactive definition of rotor and operating parameters (radius, blade count, hub, pitch, wind
  speed, rotational speed / tip-speed ratio, air properties)
- Airfoil data from a **local database**, **fetched sources**, or **user upload**
- Polar generation via four interchangeable routes: a **panel method**, **XFOIL**, **NeuralFoil** prediction, or **parametric SU2 RANS CFD with automated meshing**
- **Viterna–Corrigan extrapolation** of lift and drag to ±180°

### Analysis and design
- **BEM performance prediction** with loss corrections
- **Schmitz blade design** — chord and twist distributions
- **Three-dimensional blade visualisation**
- **Differential-evolution optimisation** of the design
- Post-processing: C<sub>P</sub>–λ and C<sub>T</sub>–λ curves, power curve, spanwise loads
- **Built-in validation cases** against the MEXICO and NREL UAE Phase VI experimental datasets

---

## 3. Architecture

The application follows the dependency chain of the physics. Polars are resolved and made complete
**before** the solver runs, because a BEM iteration that walks off the end of a polar table is the most
common source of silent nonsense in rotor codes. The optimiser sits outside the solver and treats it
as a black box.

```text
  ROTOR INPUTS ─────┐
  R, B, hub, pitch  │
  U∞, Ω/λ, ρ, ν     │
                    ▼
  AIRFOIL DATA ──► POLAR PREP ──────► BEM SOLVER ──────► OUTPUTS
  database         Re interpolation   per-element        C_P–λ, C_T–λ
  fetch / upload   ±180° extrapol.    iteration on a,a′  power curve
  panel/XFOIL/NeuralFoil/SU2        + Prandtl tip/hub  spanwise loads
                                      + high-induction        │
                                      + drag in wake          ▼
                                          ▲              BLADE VIEW
                                          │              chord & twist
                        DIFFERENTIAL EVOLUTION ◄────────  3D render
                        chord / twist / λ design
                        objective + constraints
```

*The optimiser closes the loop on the objective; each evaluation is cheap because the solver is BEM
rather than CFD.*

---

## 4. Method — BEM

BEM equates two independent expressions for the load on an annular ring of the rotor: the momentum
the ring extracts from the flow, and the aerodynamic force the blade sections in that ring actually
generate. Solving them together gives the induction factors, and everything else follows.

### Geometry of a blade element

At radius *r*, the section sees a relative velocity combining the axially retarded wind and the
tangentially accelerated rotation:

```
W = sqrt[ (U∞(1 − a))² + (Ωr(1 + a′))² ]                              (1)

φ = arctan[ U∞(1 − a) / (Ωr(1 + a′)) ]                                (2)

α = φ − (θ_pitch + θ_twist)                                           (3)
```

The angle of attack α indexes the polar — and it is why the polars must cover the full range. At
start-up or low tip-speed ratio, α at the inboard stations runs far past stall, well outside any
measured table.

### The two load expressions

**Momentum side**, for an annulus of width d*r* with total loss factor *F*:

```
dT = 4π r ρ U∞² a(1 − a) F dr                                         (4)
dQ = 4π r³ ρ U∞ Ω a′(1 − a) F dr                                      (5)
```

**Blade-element side**, for *B* blades of chord *c*:

```
dT = ½ B ρ W² c (C_l cos φ + C_d sin φ) dr                            (6)
dQ = ½ B ρ W² c (C_l sin φ − C_d cos φ) r dr                          (7)
```

Note that drag **adds** to thrust in (6) but **subtracts** from torque in (7). This is why neglecting
C<sub>d</sub> inflates predicted power, and why polar quality matters as much as the solver.

Integrating along the span and non-dimensionalising:

```
C_P = QΩ / (½ρ A U∞³)      C_T = T / (½ρ A U∞²)      λ = ΩR / U∞       (8)
```

---

## 5. Corrections

| Correction | Physical reason | Form |
|---|---|---|
| **Prandtl tip loss** | A finite blade count sheds tip vortices; annuli are not independent and loading must fall to zero at the tip | `F_tip = (2/π)·arccos[exp(−B(R−r)/(2r sinφ))]` |
| **Hub loss** | The same argument at the root, where the blade meets the hub | `F_hub = (2/π)·arccos[exp(−B(r−r_hub)/(2r sinφ))]` |
| **High induction** | Above a ≈ 0.4 momentum theory predicts a reversed wake and becomes non-physical (turbulent-wake state) | Empirical C<sub>T</sub>–a relation (Glauert / Buhl type) |
| **Post-stall polars** | Measured or computed polars stop near stall; the solver still needs values at high α | Viterna-type extrapolation to ±180° |

Total loss factor `F = F_tip · F_hub`. Without the loss factors an ideal BEM code over-predicts power
near the tip and approaches the Betz limit too closely.

### The theory underneath

For a ideal actuator disk, one-dimensional momentum theory gives the exact results

```
C_P = 4a(1 − a)²          C_T = 4a(1 − a)                             (9)
```

Power peaks at **a = 1/3**, giving the **Betz limit C<sub>P</sub> = 16/27 ≈ 0.593**, while thrust keeps
climbing towards a = 0.5. That tension — between extracting energy and loading the structure — is the
real design problem, and it is why maximum C<sub>P</sub> is rarely the only objective. Past a ≈ 0.4 the
simple theory breaks down, which is exactly where the empirical correction takes over.

*[→ Try the interactive version of this curve](../riyah.html#method)*

---

## 6. Airfoil-polar pipeline

A BEM code is only as good as its C<sub>l</sub>(α, Re) and C<sub>d</sub>(α, Re) tables. Four routes are
supported because no single source is always available:

1. **Local database** — curated polars for common wind-turbine sections, reproducible between runs.
2. **Fetch or upload** — published data, or your own measured/computed tables, including section data
   from a separate CFD or wind-tunnel campaign.
3. **Generate or predict** — four interchangeable routes spanning three fidelity levels: a built-in
   **panel method**, **XFOIL** at the required Reynolds number, **NeuralFoil** for a fast learned
   estimate, or **parametric RANS CFD in SU2** with automated meshing
   ([section 7](#7-cfd-polar-generation-with-su2)). This is the same batch-XFOIL instinct used in the
   [Formula Student airfoil campaign](../formula-student-aerodynamics/README.md#4-step-2a--airfoil-screening),
   applied to rotor sections and extended one fidelity level higher.
4. **Extrapolate to ±180°** — extend the finite table so the solver never has to guess. **Viterna–Corrigan**
   extrapolation blends the polar at the stall angle into flat-plate behaviour at high incidence,
   where C<sub>d</sub> tends towards a bluff-body value and C<sub>l</sub> falls back towards a
   sinusoidal form.

> **Why extrapolation is a modelling choice, not a formality.** Different extrapolation models give
> visibly different answers at start-up and low tip-speed ratio, where much of the blade is stalled.
> The extrapolated region is **not validated data** — it is a physically-motivated assumption. Any
> result depending heavily on it should be reported with that caveat, which is why the model used and
> the original polar range belong in the output metadata.

---

## 7. CFD polar generation with SU2

XFOIL and NeuralFoil are fast because they are cheap models: a viscous–inviscid panel formulation and a
learned surrogate of it. Both are excellent in attached flow and both degrade where rotor sections
spend their off-design life — near and beyond stall, where the boundary layer separates and the
integral formulation stops describing the flow well.

The fourth route replaces the model with a field solution. A **parametric SU2 pipeline** sweeps the
section through incidence, solving RANS at each point and assembling the forces into the same
C<sub>l</sub>(α), C<sub>d</sub>(α) table format the BEM solver already consumes. The important part is
not that SU2 can do this — it is that the **meshing is automated**, so a polar is produced by one
command rather than by hand-building a case per angle of attack.

> **Why the automation is the contribution.** Running one CFD case is a solved problem. Running a
> *sweep* of them unattended is an engineering problem: geometry regenerated per incidence, a mesh
> that comes out valid every time without manual repair, cases written, solved, checked for
> convergence and parsed — and a single diverged point must not silently poison the polar. That
> plumbing is what turns a solver into a design tool.

### The pipeline

1. **Parametrise the section and the sweep** — airfoil coordinates, target Reynolds number, and the
   incidence list. Each incidence is an independent case, so the sweep is restartable and individual
   points can be re-run without redoing the polar.
2. **Generate the mesh automatically** — domain and discretisation built programmatically per case,
   with boundary-layer refinement at the wall. This removes the manual step that normally makes CFD
   polars impractical, and keeps discretisation consistent across the sweep so differences between
   points are physics rather than meshing luck.
3. **Write the case and solve** — emit the SU2 configuration per incidence (freestream, angle of
   attack, solver and convergence settings) and run it, driven from Python rather than a GUI.
4. **Check convergence, then extract forces** — read residual history and the force breakdown, and
   treat a non-converged case as a failed point rather than a number. Separated cases near stall are
   exactly where a solver can stall out or oscillate.
5. **Assemble the polar and hand it to the solver** — collect converged points into the shared table
   format, then through the identical Viterna–Corrigan ±180° extrapolation into BEM. Because the
   interface is shared, a CFD polar and an XFOIL polar are drop-in replacements, which is what makes a
   like-for-like fidelity comparison possible.

### The four routes compared

| Route | Model | Cost per polar | Where it earns its place |
|---|---|---|---|
| **Panel method** | Inviscid, built in | ~instant | Sanity checks and first geometry passes, no external dependency |
| **NeuralFoil** | Learned surrogate | ~instant | Large sweeps inside an optimisation loop |
| **XFOIL** | Viscous–inviscid integral | seconds | The workhorse in attached flow at the correct Reynolds number |
| **SU2 RANS** | Field solution, automated mesh | orders of magnitude higher | Separated flow near stall, and an independent check on the cheap models |

Costs are relative orders of magnitude, not measured timings. RANS is not "more correct" by default —
it trades an integral boundary-layer model for a turbulence model, and inherits that model's
weaknesses in strong separation.

### What this buys, and what it does not

**Buys:** a cross-fidelity check inside one tool (same section through XFOIL and RANS, polars
overlaid, disagreement visible instead of assumed away); sections outside the cheap models' comfort
zone, such as thick rotor roots and near-stall incidence; repeatability, since one command reproduces
a whole polar with consistent discretisation; and a drop-in interface into BEM.

**Does not establish:** RANS answers depend on the **turbulence model**, and two-equation models are
weakest in exactly the separated regime this route targets. An automated mesh is not automatically a
**good** mesh — near-wall resolution and grid sensitivity still have to be demonstrated per section.
Steady RANS does not capture **unsteady separation** or vortex shedding past stall. And none of this
is experimental validation; the experimental anchor remains
[MEXICO and NREL UAE Phase VI](#10-validation).

> **Verification status — stated plainly.** This section documents the **capability and pipeline
> architecture**. Per-section solver settings, turbulence model, near-wall resolution,
> grid-convergence study and XFOIL-versus-RANS polar comparisons belong with the project report and
> are not published here yet. No accuracy claim is made for this route until those exist — a CFD
> pipeline whose grid sensitivity has not been checked is a way of producing numbers, not yet a way
> of producing evidence.

---

## 8. Blade design

For preliminary design, the **Schmitz** optimum-rotor result gives a starting geometry directly.
Choosing a design tip-speed ratio and design angle of attack fixes the inflow angle at every station,
and from it the chord:

```
λ_r = λ (r/R)                                                         (10)
φ_r = (2/3) arctan(1/λ_r)                                             (11)
c_r = (8π r / (B C_l)) (1 − cos φ_r)                                  (12)
θ_twist,r = φ_r − α_design                                            (13)
```

This produces the familiar tapered, twisted blade — wide and heavily twisted at the root, narrow and
nearly flat at the tip. It is a **starting point**: it ignores losses and assumes a single design
C<sub>l</sub>. The loss-corrected solver then evaluates what the geometry actually delivers, and the
optimiser refines it.

The 3D blade view exists for a practical reason. Chord and twist tables hide problems a rendered blade
shows immediately — a root chord that will not fit the hub, a twist distribution too aggressive to
manufacture, or a non-monotonic taper that came out of an unconstrained search.

---

## 9. Optimisation

The rotor design objective is **not smooth**. Polars are interpolated tables, the high-induction
correction switches branch, stall onset introduces kinks, and the loss factors are transcendental.
Gradient methods struggle with that landscape and are easily trapped by the starting guess.

**Differential evolution** is a population-based, derivative-free search: it mutates candidates by
scaled differences between population members, crosses them over, and keeps improvements. It handles
multimodal, non-smooth objectives and box constraints naturally — exactly the shape of this problem —
and each evaluation is cheap because the solver is BEM.

| Element | Typical formulation |
|---|---|
| Design variables | Chord and twist at spanwise control stations; design tip-speed ratio; pitch setting |
| Objective | Maximise C<sub>P</sub> at the design λ, or maximise annual energy production over a wind-speed distribution |
| Constraints | Chord bounds and smoothness, maximum tip speed (noise), manufacturable twist, root fitting |
| Evaluation | Loss-corrected BEM — fast enough for thousands of candidate evaluations |

For a Weibull wind distribution f(v), `AEP = 8760·∫P(v)f(v)dv` — which rewards a **broad** C<sub>P</sub>–λ
curve rather than a tall narrow peak, and usually gives a different blade from a single-point
C<sub>P</sub> optimisation.

---

## 10. Validation

A design tool that has never reproduced a measured answer is a random-number generator with a nice
interface. Riyah ships with **built-in validation cases** against two published experimental
campaigns, chosen because they test different things. The comparison is scored as an **RMSE across
the C<sub>P</sub> curve**, not a single matched operating point.

| Case | Rotor | Regime tested | C<sub>P</sub> RMSE |
|---|---|---|---:|
| **MEXICO** | Instrumented three-bladed model rotor | Largely attached flow | **0.028** |
| **NREL UAE Phase VI** | Two-bladed, stall-regulated, S809 section | Stalled flow | **0.038** |

### Case A — MEXICO rotor

*Model rotor EXperiments In COntrolled conditions* — an instrumented three-bladed model rotor measured
in a large wind tunnel, with pressure and load data across a range of operating conditions. A
well-characterised case that tests whether the solver, loss corrections and polar pipeline reproduce
measured rotor performance in the regime where BEM is expected to work well.

### Case B — NREL UAE Phase VI rotor

A two-bladed, stall-regulated rotor using the S809 section, measured in the NASA Ames 80 ft × 120 ft
wind tunnel. This is the harder test: it exercises the **stalled regime**, where the answer depends on
post-stall polar extrapolation and the high-induction correction rather than on clean attached-flow
physics. A BEM code can look excellent in attached flow and still be badly wrong here.

> **Why RMSE rather than a matched peak.** Quoting a single reproduced optimum proves very little — a
> model can be tuned to hit one point. An RMSE over the whole power-coefficient curve against
> measurement tests the *shape* of the prediction. The higher error on Phase VI (0.038 vs 0.028) is
> the expected signature of stalled flow being harder to predict than attached flow.

> **How to read the benchmark.** These are comparisons against **published experimental datasets**,
> not measurements taken with Riyah. A defensible benchmark also reports the polar source and
> Reynolds numbers, which corrections were active, and the convergence tolerance — the versioned
> comparison plots and input files belong with the project report.

---

## 11. Limitations and reproducibility

### Inherent model limitations

- Annuli are treated as independent — **no radial flow**.
- Steady, uniform, axial inflow: no yaw, shear, tower shadow or turbulence without extra models.
- **No dynamic stall** or unsteady aerodynamics.
- Tip and hub corrections are empirical approximations, not resolved vortex physics.
- Deep-stall behaviour depends on the **extrapolation model chosen**.
- Rigid blade — no aeroelastic deflection changing the effective geometry.

### Reproducibility practice

- **Version the polar data alongside the results** — polars change the answer more than solver
  settings do.
- Record which corrections and extrapolation model were active.
- State units and reference area explicitly on every coefficient.
- Report convergence tolerance and element count, and check element-count sensitivity.
- Keep benchmark inputs as fixed, re-runnable cases.

---

## 12. Roadmap

- **Yawed and sheared inflow** — skewed-wake correction and a proper inflow model.
- **AEP-driven optimisation** with site wind distributions and a tip-speed/noise constraint, rather
  than single-point C<sub>P</sub>.
- **Published benchmark plots** — the MEXICO and Phase VI comparison curves with versioned inputs,
  alongside the RMSE figures.
- **Published cross-fidelity comparisons** — the SU2 route already generates RANS polars; what is
  still missing is the published XFOIL-versus-RANS overlay with a grid-convergence study, and a
  rotor-level CFD comparison at selected operating points.
- **Documentation and tests** — a documented module API and a regression suite around the built-in
  validation cases.

---

## 13. References

- MEXICO — *Model rotor EXperiments In COntrolled conditions*; J. G. Schepers et al., instrumented
  three-bladed model-rotor measurement campaign.
- NREL Unsteady Aerodynamics Experiment (UAE) Phase VI — two-bladed S809 rotor, NASA Ames 80 ft × 120 ft
  wind tunnel; D. Simms et al., NREL/TP-500-29494.
- J. F. Manwell, J. G. McGowan & A. L. Rogers, *Wind Energy Explained* — BEM formulation and
  the Schmitz optimum-rotor design relations.
- L. A. Viterna & R. D. Corrigan, post-stall airfoil extrapolation method (as implemented in NREL
  AirfoilPrep).
- M. L. Buhl, *A New Empirical Relationship between Thrust Coefficient and Induction Factor for the
  Turbulent Windmill State*, NREL/TP-500-36834.
- R. Storn & K. Price, *Differential Evolution — A Simple and Efficient Heuristic for Global
  Optimization over Continuous Spaces*, J. Global Optim. 11 (1997) 341–359.

---

## Access

Riyah is **deployed on Streamlit Community Cloud** and also runs locally as a standard Streamlit
application. The source repository is not public, so this page documents the method and capabilities
rather than the code.

For a walkthrough of the running app or a discussion of the modelling, see the
[contact section](../../README.md#contact).

**[→ Web case study](../riyah.html)** · **[→ Formula Student](../formula-student-aerodynamics/README.md)** · **[→ Portfolio](../../README.md)**
