# Rocket Study 1 — CAD, Compressible CFD, and Composite-Fin Structural Analysis

**Source report:** `rocketry simulation reports (1).docx` (12 pages)  
**Tools:** SolidWorks · ANSYS Fluent · ANSYS Workbench / Mechanical · ACP Mechanical

> This is a separate rocket simulation from [Rocket Study 2](../rocketry-study-02/README.md). Its model, fin stack-up, plots, and results belong to this report only.

## 1. CAD and structural-model preparation

The report describes a 3D rocket model containing the nose cone, cylindrical body, and fin assembly. For the fin structural analysis, the fin and root were represented with midsurfaces for a shell-based model. An external enclosure was created for the CFD model, and Boolean subtraction was used to obtain the fluid domain. The rocket's geometric symmetry was used to simulate one quarter of the domain.

![Fin CAD geometry](../../assets/rocketry/study-1/cad-fin-geometry.png)

*Fin geometry shown in the first report.*

![Finite-element mesh](../../assets/rocketry/study-1/fin-mesh.png)

*Mesh used for the fin structural analysis.*

## 2. Fin material stack-up

The structural report specifies a **3 mm wood core**, with three glass-fibre layers on each side. The first two glass-fibre layers are listed as **500 g/m²** and the third as **240 g/m²**; the layer orientations are given as 0°, 45°, and 90°. Material properties were taken from the relevant fibre technical datasheets and assigned through ACP Mechanical.

![Composite setup](../../assets/rocketry/study-1/composite-layup-setup.png)

*Material/layup setup associated with Study 1.*

## 3. Static structural analysis

A static structural analysis was performed in ANSYS Workbench. The fin root was constrained to represent attachment to the rocket body, and aerodynamic loads supplied by the flight-dynamics team were applied to the fin surfaces. The report says the mesh was refined in areas expected to have higher stresses, including the fin root and edges.

The report's stress plot shows a peak equivalent (von Mises) stress of approximately **9.99 MPa**. The report compares this with an estimated allowable stress of about **13.4 MPa** and describes the lay-up as adequate for the applied load case. This statement is specific to Study 1's model and assumptions; it should not be transferred to Study 2.

![Study 1 fin stress contour](../../assets/rocketry/study-1/fin-stress-contour.png)

*Equivalent-stress plot from Study 1; displayed maximum is approximately 9.99 MPa.*

## 4. Compressible external-flow CFD

The flow simulation represents the rocket at the selected maximum-velocity condition during ascent. The report describes the following setup:

- Density-based solver for compressible external aerodynamics.
- k–ω SST turbulence model.
- Energy equation enabled.
- Pressure Far-Field boundary condition using the selected freestream Mach number, static pressure, and static temperature.
- Quarter-domain model with symmetry boundary conditions.
- Convergence monitoring using residuals and a drag-coefficient report.

The stated residual target is 1×10⁻⁵ for continuity and energy, with a stable drag-coefficient plateau also used as a convergence indicator. Review the plots and model setup before making stronger claims about convergence or physical accuracy.

![Study 1 CFD domain](../../assets/rocketry/study-1/cfd-domain.png)

*External CFD domain from Study 1.*

![Pressure Far-Field setup](../../assets/rocketry/study-1/pressure-far-field-setup.png)

*Pressure Far-Field settings shown in the report.*

![Residual history](../../assets/rocketry/study-1/cfd-residual-history.png)

*Solver residual history from Study 1.*

### CFD post-processing figures

The following figures are taken from Study 1's own report and are kept separate from Study 2's plots.

![CFD result 1](../../assets/rocketry/study-1/cfd-result-01.png)

![CFD result 2](../../assets/rocketry/study-1/cfd-result-02.png)

![CFD result 3](../../assets/rocketry/study-1/cfd-result-03.png)

![CFD result 4](../../assets/rocketry/study-1/cfd-result-04.png)

![CFD result 5](../../assets/rocketry/study-1/cfd-result-05.png)

![CFD result 6](../../assets/rocketry/study-1/cfd-result-06.png)

## Scope and limitations

This page documents the methods and reported figures; it does not claim experimental or flight-test validation. Structural adequacy depends on the exact load case, material characterization, laminate definition, boundary conditions, and failure criteria. CFD conclusions depend on geometry, boundary conditions, mesh, turbulence modelling, and convergence.

[Back to Rocketry overview](../rocketry-cad-cfd-structural/README.md) · [Back to portfolio](../../README.md)
