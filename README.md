# Bhavya Sharma · Clinic Website Portfolio

A one-page portfolio for a web designer who builds websites for clinics.
Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Highlights

- Scroll-driven 3D browser mockup built with CSS 3D transforms (no WebGL)
- Mockup moves beside the hero, recedes at the Problem section, then lands front-facing in My Work
- In My Work, the mockup previews each clinic website as you scroll, and clicking it opens the site
- Separate, lighter behaviour on phones; respects `prefers-reduced-motion`
- Dark blue and purple theme, fully responsive

## Files

```
index.html     page markup
style.css      all styles, including the 3D stage
app.js         scroll engine (poses, interpolation, project preview, click-through)
mittra.png     screenshot, Mittra Clinic        <- add this file
delhi.png      screenshot, Delhi Clinic         <- add this file
randhawa4.jpg  screenshot, Randhawa Clinic      <- add this file
```

The three screenshots are not included in this download. Put them in the same
folder as `index.html` with exactly those names. Without them the page still
works: the 3D window shows the dark demo page instead of the previews.

## Run locally

Open `index.html` in a browser. Or, for a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Put it on GitHub

```bash
cd bhavya-portfolio
git init
git add .
git commit -m "Initial commit: clinic portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/bhavya-portfolio.git
git push -u origin main
```

Create the empty repository on github.com first (New repository, no README, no
.gitignore), then run the commands above with your own username.

## Host it free on GitHub Pages

1. Repo, then Settings, then Pages
2. Source: "Deploy from a branch", Branch: `main`, Folder: `/ (root)`
3. Save. Your site appears at `https://YOUR-USERNAME.github.io/bhavya-portfolio/`

## Editing

- Contact details: search `9350002593` and `bhavya.webdesign@gmail.com` in `index.html`
- Add or change a project: edit the three cards in `index.html` and the `PROJ` list at the top of `app.js`
- Colours: the variables at the top of `style.css`

## Contact

WhatsApp / call: +91 93500 02593 · bhavya.webdesign@gmail.com
