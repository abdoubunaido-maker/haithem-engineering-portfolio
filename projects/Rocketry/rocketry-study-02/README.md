# Rocket Study 2 — CAD, Compressible CFD, and Composite-Fin Structural Analysis

**Source report:** `rocketry simulation reports (2).docx` (8 pages)  
**Tools:** SolidWorks · ANSYS Fluent · ANSYS Workbench / Mechanical · ACP Mechanical

> This is a separate rocket simulation from [Rocket Study 1](../rocketry-study-01/README.md). Do not mix its material stack-up or result plots with Study 1.

## 1. CAD and model preparation

The report covers a rocket with a nose cone, cylindrical body, and fin assembly. For the structural model, the fin faces and root were simplified using midsurfaces for shell-based analysis. The CFD workflow used an external enclosure and Boolean subtraction to create the fluid domain, with one quarter of the geometry simulated using symmetry boundary conditions.

![Fin geometry](../../assets/rocketry/study-2/cad-fin-geometry.png)

*Fin geometry shown in the second report.*

![Fin mesh](../../assets/rocketry/study-2/fin-mesh.png)

*Structural mesh from Study 2.*

## 2. Fin material stack-up

The report describes a **2 mm wood core** with three glass-fibre layers on each side, oriented at 0°, 45°, and 90°. The stated glass-fibre areal density is **240 g/m²**. This stack-up is different from the 3 mm core and mixed 500/240 g/m² layers described in Study 1.

![Composite material setup](../../assets/rocketry/study-2/composite-layup-setup.png)

*Material/layup setup associated with Study 2.*

## 3. Static structural analysis

The report describes a static structural analysis in ANSYS Workbench with aerodynamic loading applied to the fin surfaces and constraints at the root to represent attachment to the rocket body. The analysis produced equivalent-stress and total-deformation contour plots.

The stress plot displays a maximum equivalent stress of **875.42 MPa**, while the total-deformation plot displays a maximum of **9.5887 mm**. The report text available with these figures does not provide a clearly documented allowable stress or a discussion establishing whether the plotted stress is acceptable. These values are therefore presented as plot readings only, **not as proof of structural adequacy**. The load case, units, material properties, laminate assignment, constraints, and displayed stress quantity should be checked against the original ANSYS model before drawing a safety conclusion.

![Study 2 fin stress contour](../../assets/rocketry/study-2/fin-stress-contour.png)

*Equivalent-stress contour from Study 2; the figure displays 875.42 MPa maximum.*

![Study 2 fin deformation contour](../../assets/rocketry/study-2/fin-deformation-contour.png)

*Total-deformation contour from Study 2; the figure displays 9.5887 mm maximum.*

## 4. Compressible external-flow CFD

The second report separately documents a rocket external-flow simulation at its selected maximum-speed ascent condition. The reported numerical setup includes:

- Density-based solver for compressible flow.
- k–ω SST turbulence model.
- Energy equation enabled.
- Pressure Far-Field boundary condition, with the freestream Mach number and atmospheric pressure/temperature specified for the selected flight condition.
- A quarter-domain approach using symmetry planes.
- Residual history and drag-coefficient monitoring to assess convergence.

The report specifies a residual target of 1×10⁻⁵ for continuity and energy equations and looks for a stable drag coefficient. These details describe the setup in Study 2's report; the result figures below are not shared with Study 1.

![Study 2 CFD domain](../../assets/rocketry/study-2/cfd-domain.png)

*External CFD domain from Study 2.*

![Pressure Far-Field setup](../../assets/rocketry/study-2/pressure-far-field-setup.png)

*Pressure Far-Field settings shown in the second report.*

![Residual history](../../assets/rocketry/study-2/cfd-residual-history.png)

*Residual history from Study 2.*

### CFD post-processing figures

![Study 2 CFD result 1](../../assets/rocketry/study-2/cfd-result-01.png)

![Study 2 CFD result 2](../../assets/rocketry/study-2/cfd-result-02.png)

![Study 2 CFD result 3](../../assets/rocketry/study-2/cfd-result-03.png)

## Scope and limitations

These are numerical results from Study 2, not experimental or flight-test validation. In particular, the stress and deformation figures should not be interpreted as an acceptable design conclusion without checking the material/layup data, load and boundary conditions, and appropriate failure criterion.

[Back to Rocketry overview](../rocketry-cad-cfd-structural/README.md) · [Back to portfolio](../../README.md)
