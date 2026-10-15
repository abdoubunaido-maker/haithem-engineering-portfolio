# Rocketry — Two Separate Rocket Simulation Studies

This section documents **two different rocket models**, each with its own CAD preparation, compressible-flow CFD setup, and composite-fin structural analysis. Their fin geometry, lay-up descriptions, plots, and numerical results are intentionally kept separate because the two source reports describe different configurations.

## Study 1 — 3 mm wood core; glass-fibre layers of 500/240 g/m²

Source: `rocketry simulation reports (1).docx` (12 pages)

This report describes a 3 mm wood core and three glass-fibre layers on each side, with the first two layers listed as 500 g/m² and the third as 240 g/m². Its written discussion reports a peak equivalent fin stress of approximately **9.99 MPa**, compared with an estimated allowable stress of about **13.4 MPa** for that study's applied load case.

**[Open Rocket Study 1 documentation →](../rocketry-study-01/README.md)**

## Study 2 — 2 mm wood core; 240 g/m² glass fibre

Source: `rocketry simulation reports (2).docx` (8 pages)

This report describes a 2 mm wood core with three glass-fibre layers on each side, all listed at 240 g/m². Its stress contour displays a maximum equivalent stress of **875.42 MPa**, and its deformation contour displays **9.5887 mm**. The report does not provide an allowable-stress comparison in the extracted discussion, so those plot readings should not be treated as proof of structural adequacy.

**[Open Rocket Study 2 documentation →](../rocketry-study-02/README.md)**

## Important comparison note

The figures above come from two different rocket models and should not be compared as if they were repeated runs of the same configuration. They also differ in documented fin stack-ups. Any direct engineering comparison requires reviewing each model's load case, material properties, laminate definition, boundary conditions, units, solver outputs, and applicable failure criteria.

## Common methods documented in the reports

- CAD geometry preparation of the rocket body and fin assembly.
- Shell-based fin modelling using midsurfaces for structural simulation.
- External CFD-domain construction and quarter-model symmetry.
- Compressible external-flow analysis in ANSYS Fluent with a density-based solver, k–ω SST turbulence model, energy equation, and Pressure Far-Field boundary condition.
- Residual and drag-coefficient monitoring as part of convergence assessment.
- Static structural analysis in ANSYS Workbench / Mechanical and composite layer assignment through ACP Mechanical.

[Back to main portfolio](../../README.md)
