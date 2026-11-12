# Riyah — Horizontal-Axis Wind-Turbine Design and Performance Prediction

**Project type:** Engineering web application / final-year project
**Stack:** Python · Streamlit · BEM · XFOIL / NeuralFoil · differential evolution
**Status:** Functional application; source repository currently private

**[→ Web case study with method derivation and interactive theory](../riyah.html)** · **[→ Back to portfolio](../../README.md)**

---

## Contents

1. [Why build this](#1-why-build-this)
2. [Capabilities](#2-capabilities)
3. [Architecture](#3-architecture)
4. [Method — BEM](#4-method--bem)
5. [Corrections](#5-corrections)
6. [Airfoil-polar pipeline](#6-airfoil-polar-pipeline)
7. [Blade design](#7-blade-design)
8. [Optimisation](#8-optimisation)
9. [Validation](#9-validation)
10. [Limitations and reproducibility](#10-limitations-and-reproducibility)
11. [Roadmap](#11-roadmap)
12. [References](#12-references)

---

## 1. Why build this

Rotor aerodynamics has an awkward gap in it. **CFD** resolves the flow but is far too expensive to run
thousands of times inside a design search. **Blade-element momentum theory** is cheap enough for that
— a full C<sub>P</sub>–λ curve in a fraction of a second — but using it properly means assembling a lot
of unglamorous machinery first: polars at the right Reynolds numbers, extrapolated to angles no wind
tunnel reached, plus tip, hub and high-induction corrections.

**Riyah closes that gap.** It puts the whole chain behind one interface, so a rotor can be specified,
analysed, reshaped and optimised without leaving the tool. It is built to be used by someone who wants
an answer, not by someone who wants to write a BEM solver.

---

## 2. Capabilities

### Input and data
- Interactive definition of rotor and operating parameters (radius, blade count, hub, pitch, wind
  speed, rotational speed / tip-speed ratio, air properties)
- Airfoil data from a **local database**, **fetched sources**, or **user upload**
- Polar generation with **XFOIL**, or prediction with **NeuralFoil** where available
- **Extrapolation** of lift and drag beyond the supplied angle-of-attack range

### Analysis and design
- **BEM performance prediction** with loss corrections
- **Preliminary blade design** — chord and twist distributions
- **Three-dimensional blade visualisation**
- **Differential-evolution optimisation** of the design
- Post-processing: C<sub>P</sub>–λ and C<sub>T</sub>–λ curves, power curve, spanwise loads
- **Benchmark comparisons** against reference turbine datasets

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
  XFOIL/NeuralFoil Cl, Cd tables      + Prandtl tip/hub  spanwise loads
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

A BEM code is only as good as its C<sub>l</sub>(α, Re) and C<sub>d</sub>(α, Re) tables. Three routes are
supported because no single source is always available:

1. **Local database** — curated polars for common wind-turbine sections, reproducible between runs.
2. **Fetch or upload** — published data, or your own measured/computed tables, including section data
   from a separate CFD or wind-tunnel campaign.
3. **Generate or predict** — XFOIL at the required Reynolds number, or NeuralFoil where available for a
   fast learned estimate. This is the same batch-XFOIL instinct used in the
   [Formula Student airfoil campaign](../formula-student-aerodynamics/README.md#4-step-2a--airfoil-screening),
   applied to rotor sections.
4. **Extrapolate to ±180°** — extend the finite table so the solver never has to guess. Viterna-type
   extrapolation blends the polar at the stall angle into flat-plate behaviour at high incidence,
   where C<sub>d</sub> tends towards a bluff-body value and C<sub>l</sub> falls back towards a
   sinusoidal form.

> **Why extrapolation is a modelling choice, not a formality.** Different extrapolation models give
> visibly different answers at start-up and low tip-speed ratio, where much of the blade is stalled.
> The extrapolated region is **not validated data** — it is a physically-motivated assumption. Any
> result depending heavily on it should be reported with that caveat, which is why the model used and
> the original polar range belong in the output metadata.

---

## 7. Blade design

For preliminary design, the classical optimum-rotor result gives a starting geometry directly.
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

## 8. Optimisation

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

## 9. Validation

A design tool that has never reproduced a known answer is a random-number generator with a nice
interface. Two established reference cases were used, chosen because they test different things.

### Case A — NREL 5-MW reference turbine

A large three-bladed, pitch-regulated machine, the standard offshore reference. It tests whether the
tool reproduces a well-documented optimum in the attached-flow, high-efficiency regime.

The published definition report (Jonkman et al., NREL/TP-500-38060, Table 7-2) finds a peak power
coefficient of **0.482 at a tip-speed ratio of 7.55** and zero collective blade pitch, from
FAST/AeroDyn simulations at a fixed 8 m/s wind speed.

A value recorded during Riyah's development was a peak C<sub>P</sub> of **≈0.482 near λ ≈ 7.55** —
reproducing both the **magnitude and the location** of the published optimum.

### Case B — NREL Phase VI (UAE) rotor

A small two-bladed, stall-regulated rotor using the S809 section, measured in the NASA Ames
80 ft × 120 ft wind tunnel. This is the harder test: it exercises the **stalled regime**, where the
answer depends on post-stall polar extrapolation and the high-induction correction rather than on
clean attached-flow physics. A BEM code can match an attached-flow optimum and still be badly wrong
here.

> **How to read the benchmark.** Matching one operating point is **not** validation of the whole
> model. A defensible benchmark reports the input assumptions, polar source and Reynolds numbers,
> which corrections were active, convergence tolerance, and agreement across the **whole**
> C<sub>P</sub>–λ curve — not just at the peak. The figure quoted above is a development result
> recorded against the published reference; the versioned comparison plots belong with the project
> report.

---

## 10. Limitations and reproducibility

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

## 11. Roadmap

- **Yawed and sheared inflow** — skewed-wake correction and a proper inflow model.
- **AEP-driven optimisation** with site wind distributions and a tip-speed/noise constraint, rather
  than single-point C<sub>P</sub>.
- **Full benchmark suite** — published comparison plots across the whole C<sub>P</sub>–λ curve for both
  NREL cases, with versioned inputs.
- **Cross-fidelity check** — compare BEM against rotor CFD at selected operating points to quantify
  where the fast model drifts.
- **Public release** — packaged app, documented API, tests, and a hosted demo.

---

## 12. References

- J. Jonkman, S. Butterfield, W. Musial & G. Scott, *Definition of a 5-MW Reference Wind Turbine for
  Offshore System Development*, NREL/TP-500-38060, 2009. Table 7-2: C<sub>P,max</sub> = 0.482 at λ = 7.55.
- NREL Unsteady Aerodynamics Experiment (UAE) Phase VI — two-bladed S809 rotor, NASA Ames 80 ft × 120 ft
  wind tunnel.
- J. F. Manwell, J. G. McGowan & A. L. Rogers, *Wind Energy Explained* — BEM formulation and
  optimum-rotor design relations.
- L. A. Viterna & R. D. Corrigan, post-stall airfoil extrapolation method (as implemented in NREL
  AirfoilPrep).
- M. L. Buhl, *A New Empirical Relationship between Thrust Coefficient and Induction Factor for the
  Turbulent Windmill State*, NREL/TP-500-36834.
- R. Storn & K. Price, *Differential Evolution — A Simple and Efficient Heuristic for Global
  Optimization over Continuous Spaces*, J. Global Optim. 11 (1997) 341–359.

---

## Access

The source repository is currently **private**, so there is no public demo link yet. This page
documents the method and capabilities; the code-level reference, versioned benchmark plots and a
hosted demo will be published with the release.

To discuss the implementation or the modelling, see the [contact section](../../README.md#contact).

**[→ Web case study](../riyah.html)** · **[→ Formula Student](../formula-student-aerodynamics/README.md)** · **[→ Portfolio](../../README.md)**
