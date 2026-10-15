# Haithem Benaida | Engineering Portfolio

**Fluid Mechanics · Aerodynamics · CFD · Renewable Energy · Engineering Software**

I’m a mechanical engineer and M2 student in Fluid Mechanics and Energy at Université Claude Bernard Lyon 1. I enjoy turning fluid-mechanics theory into engineering tools and designs—from aerodynamic development for a Formula Student car to a web application for horizontal-axis wind-turbine analysis.

This repository is a curated record of selected projects, methods, and technical work. It is a work in progress; I’ll keep adding validated results, design iterations, and documentation as projects evolve.

> **Portfolio note:** simulation results are identified as numerical results and should not be read as experimental or on-track validation unless explicitly stated.

## Featured projects

### 1. Formula Student — Aerodynamic package
**Role:** Head of Aerodynamics, ENP Racing Team  
**Focus:** aerodynamic concept development, airfoil selection, multi-element wings, CFD, vehicle balance, and composite-part manufacturing.

- Developed and assessed a multi-element rear wing and a matching front-wing concept.
- Used XFOIL/XFLR5 for airfoil and preliminary aerodynamic studies, ANSYS Fluent for 2D analyses, and SimScale for 3D vehicle-level simulations.
- Examined lift/downforce, drag, pressure distribution, separation, and front-to-rear aerodynamic balance.
- Contributed to bodywork and composite-part manufacturing decisions.
- ENP Racing Team represented Algeria at Formula Student UK and received the Newcomers Award.

**Project notes:** [Open the project page](projects/formula-student-aerodynamics/README.md)

### 2. Riyah — Horizontal-axis wind-turbine design and performance tool
**Focus:** Blade Element Momentum (BEM), airfoil polars, optimization, visualization, and validation.

- Built a Streamlit application for predicting and exploring horizontal-axis wind-turbine performance.
- Integrated airfoil-polar workflows and models for extending aerodynamic data beyond available angles of attack.
- Added blade-design and post-processing workflows, a 3D blade view, and optimization tools.
- Compared predictions against reference turbine data, including NREL Phase VI and the NREL 5-MW reference turbine.

**Project notes:** [Open the project page](projects/riyah-hawt-design/README.md)


### 3. Rocketry — Two separate rocket simulation studies
Two distinct rocket models, each documented separately for CAD preparation, compressible external-flow CFD, and composite-fin structural analysis. Their material layups and results are not combined.

- **Study 1:** 3 mm wood core with glass-fibre layers listed at 500 and 240 g/m²; its report discusses a peak fin stress of about 9.99 MPa against an estimated 13.4 MPa allowable stress.
- **Study 2:** 2 mm wood core with 240 g/m² glass-fibre layers; its stress plot displays 875.42 MPa and its deformation plot displays 9.5887 mm, without a documented allowable-stress comparison in the report text.
- Both reports describe SolidWorks geometry preparation, quarter-domain CFD in ANSYS Fluent, and composite-fin structural simulation in ANSYS Workbench / ACP Mechanical.

**Project notes:** [Rocketry overview](projects/rocketry-cad-cfd-structural/README.md) · [Study 1](projects/rocketry-study-01/README.md) · [Study 2](projects/rocketry-study-02/README.md)

### 4. CFD and fluid-mechanics studies
A growing collection of technical studies, numerical setups, and explanations related to fluid mechanics, turbulence modelling, boundary layers, and engineering simulation.

**Project notes:** [Open the studies page](projects/cfd-studies/README.md)

## Technical interests

- External aerodynamics and aerodynamic design
- Computational Fluid Dynamics (CFD)
- Boundary-layer flows and turbulence modelling
- Rotor and wind-turbine aerodynamics
- Numerical methods and engineering software
- Design validation and engineering trade-offs

## Tools and methods

`Python` · `Streamlit` · `ANSYS Fluent` · `ANSYS Mechanical` · `ACP Mechanical` · `SimScale` · `XFOIL` · `XFLR5` · `SolidWorks` · `BEM` · `Differential evolution`

Tools are listed in relation to projects documented here; this is not a claim of equal proficiency in every tool.

## Repository structure

```text
.
├── README.md
├── index.html                 # GitHub Pages homepage
├── projects/
│   ├── formula-student-aerodynamics/
│   ├── riyah-hawt-design/
│   ├── rocketry-cad-cfd-structural/
│   ├── rocketry-study-01/
│   ├── rocketry-study-02/
│   └── cfd-studies/
├── project-template/
└── assets/
    └── rocketry/
        ├── study-1/
        └── study-2/
```

## Contact and links

- **LinkedIn:** Add your profile URL before sharing
- **GitHub:** [@abdoubunaido-maker](https://github.com/abdoubunaido-maker)
- **Email:** Add a professional contact address before sharing
- **Location:** Lyon, France

## Using this portfolio

Each project page explains the objective, approach, tools, results, limitations, and available deliverables. Where possible, I’ll add figures, plots, short demonstrations, and links to source code or reports.

If a project depends on private team material, third-party software, or unpublished data, only material that I am permitted to share will be uploaded.
