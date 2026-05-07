# Dhruv Patel — Cybersecurity Portfolio

A dark, terminal-aesthetic portfolio with 3D Three.js globe, skill matrix, project showcase, and a Buy vs Rent calculator.

---

## 📁 File Structure

```
dhruv-portfolio/
├── index.html              ← Home page (3D globe hero)
├── assets/
│   ├── style.css           ← All styles
│   ├── globe.js            ← Three.js 3D globe animation
│   └── nav.js              ← Mobile nav toggle
├── pages/
│   ├── skills.html         ← Animated skill bars by category
│   ├── projects.html       ← Project cards
│   ├── tools.html          ← Tools index
│   ├── calculator.html     ← Buy vs Rent calculator
│   └── contact.html        ← Contact form
└── README.md
```

---

## 🚀 HOW TO HOST ON GITHUB PAGES (Step-by-Step)

### Step 1 — Create a GitHub Account
Go to https://github.com and sign up (free).

### Step 2 — Create a New Repository
1. Click the **+** icon → **New repository**
2. Name it exactly: `dhruvpatel.github.io`
   - Replace `dhruvpatel` with your actual GitHub username
   - This special name tells GitHub to serve it as your main site
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload Your Files
**Option A — GitHub Website (easiest, no install needed):**
1. Open your new repository on GitHub
2. Click **Add file** → **Upload files**
3. Drag ALL your portfolio files (index.html, assets/, pages/) into the upload area
4. Scroll down, click **Commit changes**

**Option B — Git command line:**
```bash
# From inside your dhruv-portfolio folder:
git init
git add .
git commit -m "Initial portfolio launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** tab
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Set branch to **main**, folder to **/ (root)**
5. Click **Save**

### Step 5 — Visit Your Site
After 1–2 minutes, your site will be live at:
`https://YOUR_USERNAME.github.io`

---

## 🌐 CONNECTING YOUR CUSTOM DOMAIN (via Cloudflare — Free)

### Step 1 — Add a CNAME file to your repo
Create a file called `CNAME` (no extension) in the root of your repo with just your domain:
```
yourdomain.com
```

### Step 2 — Set up Cloudflare (free account)
1. Go to https://cloudflare.com → Sign up free
2. Add your domain → Follow the nameserver instructions from your domain registrar
3. Once active, go to **DNS** in Cloudflare

### Step 3 — Add DNS Records in Cloudflare
Add these **A records** (for apex domain, e.g. yourdomain.com):
```
Type: A   Name: @   Content: 185.199.108.153
Type: A   Name: @   Content: 185.199.109.153
Type: A   Name: @   Content: 185.199.110.153
Type: A   Name: @   Content: 185.199.111.153
```
Add this **CNAME record** (for www):
```
Type: CNAME   Name: www   Content: YOUR_USERNAME.github.io
```

### Step 4 — Enable HTTPS in GitHub Pages
1. Go to repo → Settings → Pages
2. Under **Custom domain**, enter `yourdomain.com` → Save
3. Check **Enforce HTTPS** (takes ~10 min to activate)

Cloudflare also gives you free: SSL, CDN, DDoS protection, analytics — perfect for a cybersecurity engineer's portfolio!

---

## ✏️ CUSTOMIZING YOUR PORTFOLIO

### Update your name/info
- `index.html` — Hero name, title, stats bar, about section
- `pages/contact.html` — Email, LinkedIn, GitHub URLs
- `pages/skills.html` — Adjust skill percentages in the JS `data` object
- `pages/projects.html` — Replace placeholder projects with your real ones

### Add a contact form backend (free)
Sign up at https://formspree.io, get your form endpoint, then in `contact.html` replace `handleSubmit` with:
```javascript
async function handleSubmit(btn) {
  const form = document.querySelector('.contact-form');
  const data = { name: form.querySelector('[type=text]').value, ... };
  await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  btn.textContent = '✓ SENT';
}
```

### Add more tool pages
Copy `pages/calculator.html` as a starting template for new tools. Link them from `pages/tools.html`.

---

## 🛠️ Tech Stack
- **HTML5 / CSS3 / Vanilla JavaScript** — No framework, zero dependencies beyond fonts
- **Three.js r128** — Loaded from CDN, powers the 3D globe
- **Google Fonts** — Share Tech Mono + Rajdhani

## 💰 Running Cost
| Item | Cost |
|------|------|
| GitHub Pages hosting | $0/month |
| Cloudflare CDN + SSL | $0/month |
| Domain renewal | ~$10–15/year |
| **Total** | **~$10–15/year** |
