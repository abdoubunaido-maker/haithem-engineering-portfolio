# CFD and Fluid-Mechanics Studies

**[→ Web version: verification methodology and notes](../cfd-notes.html)** · **[→ Back to portfolio](../../README.md)**

This section collects smaller numerical studies, derivations, and engineering notes that do not warrant a standalone repository yet.

The web version documents the checks already applied in the projects — near-wall/y⁺ targets, iterative
versus discretisation convergence, domain sizing, turbulence-model choice, and how force coefficients
should be reported so they can be reused.

## Planned topics

- Boundary-layer scaling and governing-equation simplification
- Turbulence-model selection and near-wall treatment
- Mesh strategy and mesh-independence checks
- Pressure and skin-friction distributions
- CFD domain sizing and boundary-condition sensitivity
- Aerodynamic trade-offs and interpretation of force coefficients

## Template for each study

For each new study, record:

1. **Question:** What physical or design question is being investigated?
2. **Model:** Geometry, assumptions, governing equations, and turbulence/physical models.
3. **Numerical setup:** Domain, boundary conditions, mesh, solver settings, and convergence criteria.
4. **Results:** Figures with units, reference values, and clearly described axes.
5. **Verification:** Mesh sensitivity, conservation checks, or comparison against theory/experiment where applicable.
6. **Limitations:** What the model does not establish.

The aim is to make the reasoning and setup understandable—not to present a colourful contour plot without its assumptions.
