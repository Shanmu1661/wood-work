# TimberCraft - Interior Carpenter & Woodwork Contractor HTML Template

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A luxury, craft-focused website template specifically designed for **Interior Carpenters, Architectural Millwork Studios, Bespoke Cabinetmakers, and Woodwork Contractors**.

Built with semantic **HTML5**, **Tailwind CSS**, modular **CSS custom properties**, and **Vanilla ES6+ JavaScript**. Featuring complete **Dark & Light Mode**, full **Right-to-Left (RTL)** layout compatibility, **interactive Before/After sliders**, an **interactive Wood Cost & Board-Feet Estimator**, a **Filterable Portfolio Gallery with Lightbox Viewer**, and a **Multi-Step Site Survey Booking Wizard**.

---

## 🌟 Key Features

- **Craft-Focused Visual Identity**: Warm amber chestnut (`#B45309`), deep walnut (`#23150F`), golden honey oak (`#C4884D`), and polished brass accents.
- **Dark & Light Mode**: Seamless toggle with automatic OS preference detection and persistent state stored in `localStorage`.
- **Full RTL & LTR Support**: Instant direction switching (`dir="rtl"`) with icon flips, mirrored paddings, and alignment rules for Arabic, Hebrew, and Persian.
- **Non-Repetitive HD Photography**: Curated collection of master carpentry, bespoke walk-in wardrobes, floating TV media walls, solid teak pivot doors, and joinery workshops.
- **Interactive Before & After Image Slider**: Smooth touch & mouse drag comparison showcasing bare drywall transformations to completed luxury woodwork.
- **Interactive Wood Cost Estimator**: Calculates estimated budget, board-feet lumber requirement, and lead times based on wood species and room square footage.
- **Client & Contractor Dashboard**: Real-time joinery milestone tracking, timber lot verification, and a live Board-Feet (BF) joinery lumber calculator.
- **Filterable Portfolio & Lightbox**: Interactive category filtering (Wardrobes, TV Units, Doors, Paneling, Kitchens) with full-screen lightbox modal.
- **WCAG 2.1 AA Accessibility**: Semantic headings, keyboard navigation, skip-to-content links, visible focus outlines, and screen reader aria tags.
- **Production SEO Ready**: Meta descriptions, OpenGraph tags, JSON-LD LocalBusiness structured data, `robots.txt`, and XML `sitemap.xml`.

---

## 📁 File Structure

```text
woodwork-template/
├── assets/
│   ├── css/
│   │   ├── style.css             # Main woodwork design tokens, animations, components
│   │   ├── dark-mode.css         # Dark walnut theme color definitions & contrast styles
│   │   └── rtl.css               # Right-to-Left layout flips, mirrors & icon transforms
│   ├── js/
│   │   ├── main.js               # Theme toggle, RTL toggle, slider, filter, lightbox, forms
│   │   └── dashboard.js          # Project milestone tracker & lumber board-feet calculator
│   └── images/                   # Curated photography and textures
├── pages/
│   ├── index.html                # Home page with finished interiors, hero & estimator
│   ├── about.html                # Heritage story, timber ethos & master joiners
│   ├── services.html             # Wardrobes, TV units, pivot doors, paneling, kitchens
│   ├── gallery.html              # Filterable portfolio with interactive lightbox modal
│   ├── contact.html              # Contact form, Google map placeholder, workshop hours
│   ├── booking.html              # 3D Laser measurement site consultation booking wizard
│   ├── blog.html                 # Woodcraft journal & timber articles archive
│   ├── blog-single.html          # In-depth timber selection matrix article
│   ├── dashboard.html            # Client & contractor project tracker & lumber tool
│   ├── 404.html                  # Custom woodwork-themed 404 error page
│   └── coming-soon.html          # Workshop expansion pre-launch page with live countdown
├── documentation/
│   └── index.html                # Interactive developer documentation & customization guide
├── index.html                    # Root entry point & redirect to pages/index.html
├── robots.txt                    # Production search crawler rules
├── sitemap.xml                   # XML sitemap with canonical page routes
└── README.md                     # Documentation readme
```

---

## 🚀 Getting Started

No build tools or node modules installation required.

### Option 1: Double-click
Open `index.html` or `pages/index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server
Run with Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

Or with Node.js:
```bash
npx serve .
```

---

## 🎨 Color Tokens & Customization

All colors can be customized directly in `assets/css/style.css`:

```css
:root {
  --wood-primary: #b45309;        /* Warm Amber Chestnut */
  --wood-primary-hover: #92400e;  /* Deep Cedar */
  --wood-walnut: #23150f;         /* Deep Rich Walnut */
  --wood-oak: #c4884d;            /* Golden Oak */
  --wood-brass: #d4af37;          /* Artisan Hardware Brass */
  --bg-canvas: #fcfaf6;           /* Linen White */
  --bg-surface: #ffffff;
  --border-subtle: #ebdccc;
}
```

---

## 🔌 Ready Integrations

1. **Contact Form**: Formspree / Netlify Forms compatible (`data-netlify="true"`).
2. **Newsletter**: Mailchimp / ConvertKit embed ready.
3. **Maps**: Google Maps API container placeholder with styled directions card.
4. **Calendar**: Multi-step consultation scheduler with date/time pickers.
5. **Payment**: Stripe / PayPal card token reservation placeholder.

---

## 📄 License & Credits

- Typography: [Google Fonts](https://fonts.google.com/) (Cinzel, Plus Jakarta Sans)
- Icons: [Font Awesome 6 Free](https://fontawesome.com/)
- Photography: [Unsplash](https://unsplash.com/) (Free commercial license)
- License: MIT License
