# Rocketry — CAD Modelling, Compressible CFD, and Fin Structural Analysis

**Project focus:** rocket geometry, external aerodynamics during ascent, and structural assessment of composite fins  
**Tools:** SolidWorks · ANSYS Fluent · ANSYS Workbench / Mechanical · ACP Mechanical

## Overview

This project brought together three parts of a rocket-design workflow: CAD modelling of the vehicle and fin geometry, a compressible external-flow simulation at the selected maximum-speed flight condition, and a structural analysis of the fins under aerodynamic loading.

The goal was to study the flow around the complete rocket configuration and assess how the fin structure responds to the aerodynamic forces supplied by the flight-dynamics team.

## 1. CAD modelling and geometry preparation

Using SolidWorks, I prepared the rocket geometry, including the nose cone, cylindrical body, and fin assembly. For the structural model, I extracted the fin and root midsurfaces so the composite structure could be represented with shell surfaces instead of modelling every layer as a separate solid.

For CFD, I created an external flow enclosure and obtained the fluid region through a Boolean subtraction. The rocket tip was slightly rounded in the simulation geometry to avoid excessively sharp mesh elements. Exploiting geometric symmetry also made it possible to simulate one quarter of the domain with symmetry boundary conditions.

![Rocket fin midsurface model](../../assets/rocketry/rocket-fin-midsurface.png)

*Fin geometry prepared as a midsurface for shell-based structural modelling.*

## 2. CFD analysis of the rocket

The external-flow simulation represented the rocket at the selected maximum-velocity condition during ascent. The setup was built in ANSYS Fluent with the following choices:

- **Flow regime:** compressible external aerodynamics.
- **Solver:** density-based.
- **Turbulence model:** k–ω SST.
- **Energy equation:** enabled to account for compressibility and temperature variations.
- **Far-field boundary:** Pressure Far-Field, with freestream Mach number, static pressure, and static temperature specified for the chosen flight condition.
- **Domain strategy:** quarter-model with symmetry boundary conditions.

The convergence workflow described in the report monitored residual histories and a drag-coefficient report on the rocket body. The report specifies a residual target of \(10^{-5}\) for continuity and energy, alongside a stable drag-coefficient plateau. The plotted residual history should be reviewed before making a definitive claim that every residual target was reached.

![External CFD domain](../../assets/rocketry/rocket-cfd-domain.png)

*External flow enclosure and rocket geometry used in the CFD setup.*

![Rocket velocity contour](../../assets/rocketry/rocket-cfd-velocity-contour.png)

*Example velocity-field post-processing view from ANSYS Fluent.*

![CFD residual history](../../assets/rocketry/rocket-cfd-residual-history.png)

*Residuals monitored during the reported solution process.*

## 3. Structural analysis of the fins

The fin structure was analysed in ANSYS Workbench / Mechanical using a shell-based model. The material layup was defined in ACP Mechanical, with layer material data taken from the technical datasheets referenced in the report. Aerodynamic loads were applied to the fin surfaces, while boundary conditions at the fin root represented its attachment to the rocket body.

The finite-element mesh was refined around areas expected to experience higher stress, particularly the fin root and edges.

![Rocket fin structural mesh](../../assets/rocketry/rocket-fin-mesh.png)

*Finite-element mesh prepared for the shell-based fin analysis.*

The reported outputs included equivalent stress and total deformation, used to inspect load transfer through the fin and identify regions requiring attention.

## Notes on results and validation

The two saved report versions provided for this portfolio differ in their recorded composite layup details and in the reported peak stress. For that reason, this public summary describes the modelling workflow but **does not state a single numerical stress result or safety margin**. Before publishing a quantitative conclusion, the load case, material data, layup, boundary conditions, and result scope should be reconciled against the final model version.

The CFD report also describes residual and drag-monitoring criteria; the plotted histories should be checked before claiming that all numerical convergence targets were achieved. These are numerical analyses, not experimental or flight-test validation.

## Skills demonstrated

- 3D CAD preparation and simulation-oriented geometry simplification
- External-domain construction and symmetry modelling
- Compressible-flow CFD setup in ANSYS Fluent
- Turbulence and energy-model selection
- Shell modelling for composite structures
- Layered-material assignment in ACP Mechanical
- Finite-element meshing, boundary conditions, and results interpretation
- Reviewing numerical evidence and identifying items that require verification

## Next additions

- Add a clean overall rocket CAD render, if approved for public sharing.
- Add a documented mesh-sensitivity study and fuller solver-convergence evidence.
- Resolve the differences between the two structural report versions before publishing the final stress and deformation values.

[Back to the main portfolio](../../README.md)
