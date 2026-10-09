# Design rules

- Use `#f8f7f4` as the global site background colour. Define it once as `--site-background` in `src/app/globals.css` and use `var(--site-background)` for shared page backgrounds and their paper-texture overlays.
- Use `#004B4B` for all teal on the site. Define it once as `--brand-teal` in `src/app/globals.css` and use `var(--brand-teal)` for teal text, backgrounds, borders, icons, logo tints, and focus indicators. Do not introduce other teal shades.
- Keep shared visual styles in `src/app/globals.css`, rather than individual page files.
- Compress raster images before adding or updating them on the site, and convert them to WebP only if they are not already in WebP format. Avoid unnecessary re-encoding of existing WebP images. Resize images to appropriate display dimensions, preserve visual quality and transparency where needed, and update image references to use the optimised `.webp` files. Keep vector assets such as SVGs in their original format.

## Visual direction

- Aim for warm editorial luxury: a refined, inviting artisan bakery with softly romantic details.
- Use cream, ivory, and oatmeal surfaces, dark neutral text, and restrained muted gold accents. Keep the existing brand teal `#004B4B` exactly as specified above, including when interpreting reference images.
- Use Fraunces at weight 900 for headings, paired with clean sans-serif body text. Use small, widely spaced uppercase text for navigation, labels, and calls to action; reserve handwritten lettering for branding.
- Use generous whitespace, orderly grids, and balanced section spacing. Center collection headings; left-align hero and story copy.
- Do not add decorative underlines or short accent rules beneath headings, even when a photo or design reference includes them. Omit them when translating references into the site. This does not prohibit functional link underlines, active navigation indicators, or focus indicators.
- Prefer softly lit cake photography with warm neutral backgrounds, linen, ceramics, and flowers. Keep image crops and lighting consistent across each collection.
- Use delicate botanical line illustrations sparingly, particularly in promotional banners. Keep motion subtle, with gentle fades and small image hover zooms.

## Boxes and section panels

- Use simple rectangular boxes with square corners, flat surfaces, and little or no shadow.
- Separate sections through cream and oatmeal background changes, whitespace, or thin neutral borders.
- Build story panels as adjoining rectangular text and image halves on desktop, stacking them on smaller screens.
- Use a full-width brand teal enquiry banner with light text, restrained botanical decoration, and a muted gold rectangular call-to-action button.
- Style buttons as compact square-cornered rectangles with uppercase, letter-spaced labels. Use solid brand teal for primary actions and transparent or cream surfaces with thin borders for secondary actions.
- Give every teal-filled call-to-action button the shared `rough texture.webp` background with a translucent `var(--brand-teal)` overlay, matching the home hero button. On hover-capable devices, fade it to 80% opacity like the home hero button while keeping its light text; disable the transition for reduced motion. Keep this treatment in `src/app/globals.css` and leave outlined and muted gold buttons distinct.

## Cards

- Category cards use straight-edged rectangular photographs above a pale cream caption panel. Center a serif category title and a small uppercase shop link with an arrow beneath it.
- Use rectangular category cards rather than octagonal image masks or decorative gold image frames.
- Product cards use a consistent square or near-square image crop, followed by a centered compact sans-serif product name, price, and small outlined rectangular add-to-cart button.
- Keep cards flat and understated: no rounded corners, heavy shadows, floating effects, or thick borders. Let photography provide the visual emphasis.
- Align image heights, caption spacing, and action positions within each grid. Use even gutters and reduce the column count responsively without crowding the content.

## Responsive workflow and desktop preservation

- Use the `mobile-responsive` skill when creating, editing, or reviewing the site's responsive UI.
- Preserve the existing desktop appearance and behavior at 1024px and above unless the user explicitly requests desktop changes. Capture desktop baselines before editing and compare afterward. Responsive work must not silently change desktop typography, spacing, imagery, navigation, or section order.
- Inspect in this order: page shell, navigation, text and forms, overflow, then individual components. Check all affected routes, including the home page, shop, product details, bespoke cakes, about, and contact.
- Use the existing shared CSS system in `src/app/globals.css`; do not introduce a second styling system or scatter responsive styles into page files. Prefer mobile-first base styles with min-width enhancements. When adapting existing desktop styles, scoped small-screen overrides are acceptable to preserve the desktop exactly.
- Use 1024px as the desktop navigation boundary. Reuse existing content breakpoints where practical; add a breakpoint only when the content needs it. Test the widths immediately around changed breakpoints.
- Use `min-height: 100svh` or `100dvh` where a viewport-height shell is needed. Avoid fixed viewport heights for variable-length content.

## Mobile visual direction

- Make mobile feel like a carefully composed version of the same bakery: warm paper surfaces, exact brand teal, restrained gold, elegant serif headings, square corners, and generous breathing room. Avoid introducing app-like floating panels or unrelated decoration.
- Stack hero copy and photography on narrow screens, keeping the heading and primary action easy to find. Preserve useful cake crops with explicit aspect ratios and object positioning; do not distort photographs or let controls obscure the subject.
- Stack adjoining story panels with a logical reading order. Reduce section padding thoughtfully, with consistent side gutters of roughly 20–24px on phones.
- Use one-column category cards when two columns would make their photography or captions cramped. Product grids may retain two columns when names, prices, and actions remain readable; fall back to one column when needed. Keep image crops, caption spacing, and action alignment consistent.
- Stack enquiry copy and its button on phones. Keep botanical decoration subtle and contained within the banner.
- Keep carousel controls within the image area, reachable and clearly visible at 320px. Retain pause/play controls, keyboard access, and reduced-motion behavior.

## Navigation and shopping controls

- Use DM Sans at weight 600 (SemiBold) and `var(--brand-teal)` for desktop and mobile navigation text.

- Below 1024px, replace the desktop navigation with an accessible hamburger disclosure or dialog. Hide the desktop link row and show the mobile toggle; at 1024px and above restore the existing desktop navigation unchanged.
- Preserve every navigation destination and the active-page indicator. Use a real button with an accessible name, `aria-expanded`, and `aria-controls`. Closed links must not remain keyboard-focusable. Escape closes the menu and returns focus to its toggle; selecting a destination closes it. Dialog menus additionally require focus containment and appropriate scroll handling.
- Keep the logo and menu toggle comfortably spaced. Do not squeeze the full desktop navigation into wrapped rows, or remove working actions merely to fit the header.
- Category tabs and other horizontal menus may scroll inside their own container when necessary; they must never widen the page. Keep the selected item and keyboard focus visible, with a clear visual cue that more items are available.
- On phones, give shop search a full row and let sorting use its own row when needed. Preserve filtering, sorting, product options, and ordering behavior.
- If pagination is added, keep previous/next controls accessible on mobile and hide excess page-number buttons when space is limited.

## Readability, forms, and touch

- Use 16px body and reading copy for new UI. On existing pages, improve mobile reading copy to 16px while retaining established desktop sizes unless desktop typography changes are requested.
- Make mobile subheadings, labels, and controls comfortably readable; they may be larger than their desktop equivalents. Page titles may scale down on phones using `clamp()`. Preserve the serif/sans-serif hierarchy and avoid oversized headings that dominate the screen.
- Inputs, textareas, and selects must use at least 16px text on phones. Stack form columns when needed, retain visible labels, and allow validation messages and long addresses to wrap.
- Provide touch targets of at least 44 × 44px for menu buttons, carousel controls, links acting as controls, and other actions. Use padding or a non-overlapping hit area to enlarge small icons, especially for coarse pointers. Keep visible keyboard focus in `var(--brand-teal)`.
- Keep checkbox/radio controls easy to tap through suitably sized controls and associated labels. Do not shrink SVG icons, logos, or fixed controls to accommodate text.
- Constrain reading width on the text element itself, using character-based limits where helpful. Do not hide cramped heading groups by arbitrarily narrowing their wrapper.

## Overflow and component layouts

- Fix horizontal page overflow at its source; do not mask layout defects with global `overflow-x: hidden`. Use `min-width: 0` on shrinking flex/grid children and `minmax(0, 1fr)` for fluid grid tracks.
- Use fluid widths with sensible maximums, keep media within its container, and wrap long strings. Prefer `width: 100%` over `100vw` for full-width sections. Clip decorative elements only within their owning section.
- Collapse multi-column panels instead of squeezing their content. Use container queries when a reusable component's layout depends on its available space, with the query container directly around that component; use viewport queries for the page shell and navigation.
- When divider-separated grids change column count, reset edge padding and dividers. On a single-column layout, replace vertical dividers with thin neutral horizontal separators where useful.
- If tables are added, put them in their own keyboard-accessible horizontal scrolling region, keep table headings on one line, and preserve alignment with the surrounding content.
- Keep balanced grid rows and consistent gaps. Preserve this project's square image and panel corners at every breakpoint; do not introduce responsive rounded corners.

## Responsive verification

- Check 320, 375, 414, 768, 1024, 1280, and 1440px widths, plus phone landscape and both sides of altered breakpoints. Confirm no page-level horizontal scrolling, accidental clipping, overlap, or cramped controls.
- Exercise the mobile menu with touch-sized clicks and keyboard input, including Escape and focus return. Check category navigation, search, sorting, product selectors, carousel controls, and contact-form validation where affected.
- Inspect representative screenshots at phone, tablet, and desktop widths. Compare desktop against the baseline; desktop changes require explicit user direction.
- Run the relevant existing checks and report what was verified, any remaining limitations, and the files changed. Do not claim device/browser verification that was not performed.
