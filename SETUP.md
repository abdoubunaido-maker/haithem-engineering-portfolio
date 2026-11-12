# Publishing this portfolio

Repository: <https://github.com/abdoubunaido-maker/haithem-engineering-portfolio>

The site is **plain HTML, CSS and JavaScript with no build step and no external dependencies**. It
runs on GitHub Pages as-is, works offline, and prints cleanly. Nothing to install.

---

## 1. Current state — nothing left to fill in

The site is complete and deployed. `cv.html` matches the content of `Haithem_Benaida_Resume.pdf`:
contact details, education dates, technical skills, languages and availability are all filled in, and
there are **no placeholders** left anywhere in the site.

Positioning used consistently across the site, the CV and the LinkedIn copy:

> **6-month research end-of-studies internship (stage de fin d'études / PFE) from April 2027, with
> possible continuation into a PhD.**

Riyah's validation is quoted as **C<sub>P</sub> RMSE 0.028 (MEXICO)** and **0.038 (NREL UAE Phase VI)**
against experimental data, with the app **deployed on Streamlit Community Cloud**. If you later want
the app URL public, add it in two places: `projects/riyah.html` → Access callout, and
`projects/riyah-hawt-design/README.md` → Access.

To confirm no placeholder has crept back in:

```bash
grep -rn "TODO\|to-add\|to add\|Pages URL\|class=\"fill\"" --include="*.html" --include="*.md" .
```

---

## 2. Preview locally

From the repository root:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>. Any static file server works — there is nothing to compile.

---

## 3. Deploy with GitHub Pages — already enabled

GitHub Pages is enabled on this repository using **Deploy from a branch**, folder `/ (root)`, with
HTTPS enforced. The live site is:

```
https://abdoubunaido-maker.github.io/haithem-engineering-portfolio/
```

Keep `index.html`, `projects/`, `assets/` and `cv.html` at the repository root. The live URL is already
written into `README.md`, `LINKEDIN_KIT.md` and `LINKEDIN_LAUNCH_POST.md`.

### ⚠ Check which branch Pages publishes from

**The publishing branch must be `main`.** At the time of writing it is set to **`mainwww`**, so merging
a pull request into `main` updates the repository but **does not update the live site**.

`main` and `mainwww` currently hold identical content (`mainwww` is the merge commit of PR #1; `main`
is the commit it merged), which is why the site still looks correct and the mismatch is easy to miss.

**To fix — one setting, in the browser:**

1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, keep **Deploy from a branch**.
3. Change the branch dropdown from `mainwww` to **`main`**, keep folder `/ (root)`, and **Save**.
4. Wait for the build to finish, then hard-refresh the site (`Ctrl/Cmd + Shift + R`).

After that, **merging into `main` deploys automatically** — usually within a minute. The `mainwww`
branch can then be deleted.

To check the current setting at any time:

```bash
gh api repos/abdoubunaido-maker/haithem-engineering-portfolio/pages --jq '.source'
```

This toggle needs repository-admin rights in the browser; a sandboxed or scoped token typically gets
`403 Resource not accessible by integration` on the Pages settings API.

**No Jekyll configuration is needed.** The site does not use Jekyll templates, and `.nojekyll` is
included so GitHub Pages serves every file and folder verbatim.

---

## 4. Export the CV as a PDF

1. Open `cv.html` locally or on the deployed site.
2. Click **Print / Save as PDF**, or press `Ctrl/Cmd + P`.
3. Choose **Save as PDF**, enable **Background graphics** if you want the accent colours, and save.

Print styles switch the page to a light, ink-friendly layout and strip the navigation and buttons.
The CV content matches `Haithem_Benaida_Resume.pdf`; that PDF is **not** committed to this repository.

---

## 5. Share on LinkedIn

- Work through [`LINKEDIN_KIT.md`](LINKEDIN_KIT.md): headline, About, Experience, Projects, Skills,
  Featured, plus outreach templates for labs and recruiters.
- Publish [`LINKEDIN_LAUNCH_POST.md`](LINKEDIN_LAUNCH_POST.md), attaching a figure.
- Add the site to your **Featured** section and **Contact info**.
- Pin the repository on your GitHub profile.

---

## 6. Adding a new project

1. Copy `project-template/README.md` into a new folder under `projects/`.
2. Put figures in `assets/<project>/` with descriptive filenames.
3. Record your **personal contribution**, assumptions, numerical settings, units, limitations and
   sources. Distinguish simulation from measurement.
4. For a web case-study page, copy the structure of `projects/formula-student.html`:
   - link `../assets/css/site.css` and `../assets/js/site.js`
   - use `.report` + `.toc` for the sidebar layout
   - wrap images in `<figure class="figure"><div class="figure-media">…</div><figcaption>` so they
     get the click-to-zoom lightbox automatically
   - give each section an `id` and add it to the `.toc` list for scroll-spy
5. Add a card to `index.html` and a row to the table in `README.md`.

---

## 7. Housekeeping

- **Never commit** API keys, `.env` files, Streamlit secrets or confidential team material.
  `.gitignore` already covers the common cases.
- **Solver output stays out of Git** (`*.cas.h5`, `*.dat.h5`, `*.trn`, `*.out` are ignored). Keep large
  meshes and result files in external storage and link to them.
- **Figures:** only publish images you created or have permission to share. The Formula Student
  figures here are all from the author's own analyses; third-party images from the report's literature
  review were deliberately excluded.
- **Rocketry figures** are separated by source model under `assets/rocketry/study-1/` and `study-2/`.
  Do not mix them — they are different configurations.
