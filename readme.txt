ZACKY TRAVIS — PORTFOLIO SITE README
Updated: March 17, 2026

OVERVIEW
- Single-page portfolio for filmmaker, video director, and graphic designer Zacky Travis.
- Sections: Intro, About & Expertise, Experience/Education timelines, Recent Works, Gallery (reels + lightbox), Events, Projects, and Contact.
- Built with vanilla HTML/CSS/JS. Dependencies: Anime.js, Swiper, MoveTo, Prism, Basic Lightbox, MailtoUI (see js/vendor files).

RUNNING THE SITE
- Open `index.html` directly in a browser, or serve locally for best font/CORS behavior: `python -m http.server 8080` from the project root, then visit http://localhost:8080.
- All assets are local in `/css`, `/js`, and `/images`; no build step is required.

UPDATING CONTENT
- Branding: Hero title, meta tags, and social links live near the top of `index.html`.
- About & Expertise: Update the bio paragraph and skills list in `#about`. The hero portrait is `images/flowers.jpg` (swap file to change).
- Experience/Education: Timeline items are in the `#about` section under `.about-timelines`.
- Works Grid: Edit image paths and copy inside `#works` (`images/photography.jpg`, `images/bunju.jpg`, etc.).
- Gallery: Cards live in the `#gallery` section; lightbox data is defined in `js/main.js` (`galleryImages` array). If you add/remove images, update both the array and thumbnail list inside the `#lightboxGallery` markup.
- Events & Projects: Cards live under `#occasions` and `#projects` respectively; update copy and background images inline.
- Contact: Social/CTA links and the email action are in the `#contact` section.

ASSETS
- All custom photos and videos are in `/images` (subfolders for avatars/icons/portfolio). Keep filenames consistent with the references in HTML/JS.
- For best gallery quality, use 16:9 images or video poster frames at 1400px+ width; the CSS now preserves that ratio.

LICENSE & CREDITS
- This site is built on top of the Luther template by StyleShout. The original free-use license requires keeping the StyleShout credit link unless an attribution removal fee has been paid (see https://www.styleshout.com/attribution-free/).
- Fonts: Public Sans & DM Serif Display (Google Fonts). Icons: Font Awesome. Third-party scripts listed above.

CONTACT
- For content tweaks or new sections, update `index.html` and `css/styles.css` directly. No compilation is needed.
