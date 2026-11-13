# LinkedIn launch post

The live portfolio URL is already filled in below. Attach one figure — the full-car pressure
contour or the CAD side view both read well as a thumbnail.

---

## Main version

```
I've put my engineering work in one place — methods, results, and the limitations next to them.

The portfolio covers three things I've spent the last while on:

🏎️ Formula Student aerodynamics (Head of Aero, ENP Racing Team)
I developed the aero package from a derived drag-power budget rather than from a shape: of the
45.3 kW reaching the wheels, about 28.4 kW could be spent on wing drag at 120 km/h without costing
top speed. That number sized the rear wing before any geometry existed. Then 24 airfoils screened
with an automated Python/XFOIL campaign, 27 parametric 2D CFD runs in ANSYS Fluent, custom sections
designed with particle swarm optimisation, and 3D full-vehicle CFD in SimScale.

In simulation: 460 N of downforce for 296 N of drag. Adding side diffusers and underbody walls raised
the downforce coefficient a further 25% at essentially unchanged drag — efficiency went from 1.56 to
1.97. A lap-time simulation put the total gain at 2.4%, all of it in medium and fast corners.
Written up as a 53-page technical report.

🌬️ Riyah — a wind-turbine design tool
A Python/Streamlit application built on blade-element momentum theory, with the parts that usually
make BEM awkward to use handled for you: four polar routes (panel method, XFOIL, NeuralFoil, and a
parametric SU2 RANS pipeline with automated meshing), Viterna-Corrigan post-stall extrapolation to
±180°, tip/hub and high-induction corrections, Schmitz chord and twist design, a 3D blade view, and
differential-evolution optimisation. The SU2 route is the part I enjoyed most: automating the mesh
and the sweep so a RANS polar comes out of one command, with convergence checked before any point is
accepted. It ships with
built-in validation against experimental data: a power-coefficient RMSE of 0.028 against the MEXICO
rotor and 0.038 against the NREL UAE Phase VI rotor. Deployed on Streamlit Community Cloud.

🚀 Rocketry — two composite-fin studies
CAD, quarter-domain compressible CFD, and composite-fin structural analysis in ANSYS ACP. Kept
separate because they're different models — and one stress result that doesn't reconcile is flagged
as unresolved rather than presented as a pass.

The thing I tried to be consistent about: publishing the assumption next to the number. These are
simulation results, not track or wind-tunnel measurements, and each page says what the model does
not establish. I'd rather a reader disagree with a stated assumption than trust an inflated claim.

I'm currently looking for a 6-month research end-of-studies internship (stage de fin d'études / PFE)
starting April 2027, in aerodynamics, CFD, wind energy or design optimisation — with the possibility
of continuing into a PhD. If that overlaps with your group, I'd be glad to talk.

Portfolio: https://abdoubunaido-maker.github.io/haithem-engineering-portfolio/

Feedback and technical criticism genuinely welcome.

#aerodynamics #CFD #windenergy #FormulaStudent #python #engineering #PFE #internship
```

---

## Short version

```
I've documented my engineering projects in one portfolio — with the methods and limitations, not just
the results.

• Formula Student aero package (Head of Aero, ENP Racing Team): drag-power budget → 24 airfoils
  screened in XFOIL → 27 2D CFD runs → PSO custom airfoils → 3D full-vehicle CFD. In simulation,
  460 N downforce for 296 N drag, and a 2.4% lap-time gain.
• Riyah: a Python/Streamlit wind-turbine design app built on blade-element momentum theory, with a
  parametric SU2 RANS polar pipeline (automated meshing) alongside XFOIL and NeuralFoil. Validated
  against MEXICO and NREL UAE Phase VI experiments (Cp RMSE 0.028 and 0.038). Live on Streamlit
  Community Cloud.
• Two rocketry studies: compressible CFD and composite-fin structural analysis in ANSYS ACP.

All simulation results, with the assumptions and limits stated next to them.

Seeking a 6-month research end-of-studies internship (PFE) from April 2027 in aerodynamics, CFD, wind
energy or design optimisation, with possible continuation into a PhD.

https://abdoubunaido-maker.github.io/haithem-engineering-portfolio/

#aerodynamics #CFD #windenergy #engineering
```

---

## Posting notes

- **Attach a figure.** Posts with an image get substantially more attention than link-only posts.
  Use `assets/formula-student/car-wings-pressure-3d.png` or `underbody-devices.png`.
- **Put the link in the post, not just the comments** — for a portfolio you want the click.
- **First two lines matter most.** LinkedIn truncates after roughly 200 characters, so the opening
  has to earn the "see more".
- **Reply to every technical comment.** Discussion is what extends a post's reach, and a substantive
  reply to a criticism reads better to a recruiter than the original post.
- **Then post the individual projects** over the following weeks — see
  [`LINKEDIN_KIT.md`](LINKEDIN_KIT.md) section 9 for three ready-written follow-ups.
