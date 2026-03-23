# Victoria Quant Lab

A static website for **Victoria Quant Lab** — an independent quantitative trading research platform focused on systematic trading, market microstructure, and algorithmic investment strategies.

## Pages

| Page | Description |
|---|---|
| `index.html` | Home — overview of the lab's mission and core offerings |
| `about.html` | About — background on the lab and its research philosophy |
| `research.html` | Research — in-depth papers on market microstructure, volatility modelling, and statistical arbitrage |
| `indicators.html` | Indicators — proprietary technical indicators published on TradingView |
| `marketplace.html` | Marketplace — coming soon; premium trading tools and expert advisors |
| `contact.html` | Contact — get in touch with the lab |

## Tech Stack

- **HTML5 / CSS3** — semantic markup and custom styling (`css/style.css`)
- **JavaScript** — interactive UI logic (`js/script.js`) and 3D background scene (`js/threeScene.js`)
- **[Three.js](https://threejs.org/)** — WebGL 3D canvas background
- **[particles.js](https://vincentgarreau.com/particles.js/)** — animated particle background
- **[GSAP](https://greensock.com/gsap/)** — scroll-triggered animations

## Getting Started

No build step is required. Simply open `index.html` in your browser, or serve the project with any static file server:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Project Structure

```
victoria/
├── css/
│   └── style.css        # Global styles
├── js/
│   ├── script.js        # Main UI / navigation logic
│   └── threeScene.js    # Three.js 3D scene
├── index.html           # Home page
├── about.html           # About page
├── research.html        # Research page
├── indicators.html      # Indicators page
├── marketplace.html     # Marketplace page
└── contact.html         # Contact page
```

## License

All rights reserved © Victoria Quant Lab.
