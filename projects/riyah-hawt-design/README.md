# Riyah — Horizontal-Axis Wind-Turbine Design and Performance Prediction

**Project type:** Engineering web application / final-year project  
**Core methods:** Blade Element Momentum (BEM), airfoil polars, performance prediction, optimization

## Overview

Riyah is a web application built to make horizontal-axis wind-turbine (HAWT) aerodynamic analysis and preliminary blade design accessible through an interactive workflow. It brings together turbine inputs, airfoil data, BEM-based calculations, design exploration, and result visualization.

## Main features

- Interactive Streamlit interface for defining turbine and operating parameters
- Airfoil data workflow using a local database, fetched data, or user uploads
- Airfoil-polar generation or prediction workflows involving XFOIL and NeuralFoil, where available
- Models for extending lift and drag behaviour beyond the supplied polar range
- Blade-design and post-processing features
- Three-dimensional blade visualization
- Optimization workflow using differential evolution
- Benchmark comparisons against reference turbine datasets

## Modelling approach

The application uses Blade Element Momentum (BEM) as the foundation for rotor performance prediction. The overall workflow depends on airfoil aerodynamic data and includes corrections or extrapolation approaches where the polar data does not cover the full range required by a blade element calculation.

A useful public project page should document, for each benchmark, the input assumptions, model settings, convergence criteria, and how the comparison is made. A close match at one operating point alone should not be presented as complete validation.

## Validation work

The project included comparisons with reference cases such as **NREL Phase VI** and the **NREL 5-MW reference turbine**. A value recorded during development for the NREL 5-MW case was a peak power coefficient around **0.482** near a tip-speed ratio of **7.55**; the final public report should show the exact conditions, source, and model version associated with that result.

## Technologies

- Python
- Streamlit
- BEM-based aerodynamic modelling
- XFOIL / NeuralFoil workflows
- Differential evolution optimization
- 3D visualization and post-processing

## Screenshots and demo

Add screenshots to this folder and link them here. If a public demo is available, add its URL below.

- **Live demo:** [Add URL if available]
- **Source code:** [Add repository URL if this project is maintained separately]
- **Report:** [Add public report URL if permitted]

## What I plan to document

- BEM equations and implementation assumptions
- Airfoil-data sources and polar-generation workflow
- Extrapolation model and limitations
- Optimization objective and design constraints
- Benchmark setup and comparison plots
- Installation instructions and known limitations

## Reproducibility note

Numerical results depend on the implementation, inputs, polar data, and correction models. Include versioned inputs and clear units when sharing result tables or plots.
