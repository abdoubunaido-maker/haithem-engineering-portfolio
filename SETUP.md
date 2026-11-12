# Publishing this portfolio

Repository: <https://github.com/abdoubunaido-maker/haithem-engineering-portfolio>

The site is **plain HTML, CSS and JavaScript with no build step and no external dependencies**. It
runs on GitHub Pages as-is, works offline, and prints cleanly. Nothing to install.

---

## 1. Personalise before going public

These are the only things left to fill in. Everything else is complete.

| What | Where |
|---|---|
| LinkedIn profile URL | `README.md` → Contact · `index.html` → contact section · `cv.html` → header |
| Professional email (optional) | same three places · `cv.html` header |
| Phone (optional, CV only) | `cv.html` → `.cv-contact` block |
| Exact education dates | `cv.html` → Education entries · `index.html` → Background timeline |
| Languages and availability | `cv.html` → Additional section |
| Riyah demo / repo URL | `projects/riyah.html` → Access callout · `projects/riyah-hawt-design/README.md` → Access |

In `cv.html` the fields to complete are **highlighted in amber** and listed in a notice at the top.
That notice, the highlighting and the navigation all disappear automatically when you print.

Search for `TODO` and `to-add` / `to add` to find every placeholder:

```bash
grep -rn "TODO\|to-add\|to add\|Pages URL" --include="*.html" --include="*.md" .
```

---

## 2. Preview locally

From the repository root:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>. Any static file server works — there is nothing to compile.

---

## 3. Deploy with GitHub Pages

1. Push the repository contents to `main` (keep `index.html`, `projects/`, `assets/`, `cv.html` at the
   repository root).
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main`, folder `/ (root)`, and save.
5. GitHub shows the URL in that section once deployment finishes — usually under a minute:

   ```
   https://abdoubunaido-maker.github.io/haithem-engineering-portfolio/
   ```

6. Replace `[Pages URL]` / `[URL]` in `LINKEDIN_KIT.md` and `LINKEDIN_LAUNCH_POST.md` with that address,
   and confirm the link in `README.md` matches.

**No Jekyll configuration is needed.** The site does not use Jekyll templates, and `.nojekyll` is
included so GitHub Pages serves every file and folder verbatim.

---

## 4. Export the CV as a PDF

1. Open `cv.html` locally or on the deployed site.
2. Fill in the highlighted fields in the file first (they are not editable in the browser).
3. Click **Print / Save as PDF**, or press `Ctrl/Cmd + P`.
4. Choose **Save as PDF**, enable **Background graphics** if you want the accent colours, and save.

Print styles switch the page to a light, single-column, ink-friendly layout and strip the navigation,
the setup notice and the placeholder highlighting.

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
