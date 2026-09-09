# SenangWebs Frame (SWF)

SenangWebs Frame (SWF) is a lightweight, touch-friendly JavaScript slider library that provides a modern, responsive carousel experience with smooth transitions and intuitive navigation. With minimal setup, you can transform your content into an engaging slider with support for multiple items per view, autoplay, and responsive breakpoints.

## Features

- Easy to integrate with existing projects
- Responsive slider with smooth transitions
- Support for multiple slides per view
- Configurable spacing between slides
- Touch-friendly swipe navigation with vertical-scroll passthrough and cancel handling
- Autoplay with customizable delay, a built-in pause control, and hover/focus/visibility suspension
- Infinite loop option (rewind)
- Seamless infinite loop option
- Customizable via data attributes or JavaScript
- Built-in navigation controls and indicators
- Responsive breakpoints support
- Accessible markup: carousel/slide roles, offscreen slides removed from the tab order, reduced-motion support
- No external dependencies
- Works on all modern browsers

## Installation

### Using npm

```bash
npm install senangwebs-frame
```

Import the JavaScript entry point and stylesheet through your bundler:

```javascript
import SWF from 'senangwebs-frame';
import 'senangwebs-frame/dist/swf.css';

const slider = new SWF(document.querySelector('[data-swf]'));
```

CommonJS consumers can load the constructor with:

```javascript
const SWF = require('senangwebs-frame');
```

> Note: importing the module sets `window.SWF` and auto-initializes every
> `[data-swf]` slider in the document. Constructing `SWF` requires a DOM;
> server-side rendering is not supported.

### Using a CDN

You can include SenangWebs Frame directly in your HTML file using unpkg. Pin to a specific version for production:

```html
<link rel="stylesheet" href="https://unpkg.com/senangwebs-frame@latest/dist/swf.css">
<script src="https://unpkg.com/senangwebs-frame@latest/dist/swf.js"></script>
```

## Usage

1. Include the SWF CSS and JavaScript files in your HTML:

```html
<!-- If installed via npm -->
<link rel="stylesheet" href="path/to/swf.css">
<script src="path/to/swf.js"></script>
```

2. Create your slider structure using data attributes:

```html
<div data-swf>
    <div data-swf-items data-swf-autoplay="true" data-swf-infinite="true">
        <div data-swf-item>Slide 1</div>
        <div data-swf-item>Slide 2</div>
        <div data-swf-item>Slide 3</div>
    </div>
    <div data-swf-indicators></div>
    <div data-swf-controls></div>
</div>
```

The browser bundle automatically initializes every `[data-swf]` slider when the page loads. Automatic initialization is isolated per slider: a broken configuration logs an error and does not prevent other sliders on the page from initializing.

## Configuration Options

Configure your slider using either data attributes or JavaScript initialization:

### Data Attributes

- `data-swf`: Marks the container element as a slider
- `data-swf-items`: Container for slider items
- `data-swf-item`: Marks an element as a slider item
- `data-swf-controls`: Container for navigation arrows
- `data-swf-prev` / `data-swf-next`: Custom previous/next buttons (use `type="button"`)
- `data-swf-pause`: Custom autoplay pause/play toggle button
- `data-swf-indicators`: Container for slide indicators
- `data-swf-autoplay="true|false"`: Enable/disable autoplay
- `data-swf-infinite="true|false"`: Enable/disable infinite loop (rewinds to start)
- `data-swf-infinity-loop="true|false"`: Enable/disable seamless infinite loop
- `data-swf-autoplay-delay="3000"`: Set autoplay delay in milliseconds
- `data-swf-animation-speed="300"`: Set transition speed in milliseconds
- `data-swf-start-index="0"`: Set initial slide index
- `data-swf-responsive`: Set responsive breakpoints configuration (JSON string)

### JavaScript Initialization

```javascript
const element = document.querySelector('[data-swf]');

const slider = new SWF(element, {
    autoplay: false,
    infinite: true,
    infinityLoop: false,
    autoplayDelay: 3000,
    animationSpeed: 300,
    startIndex: 0,
    responsive: [
        {
            breakpoint: 1024,
            slidesPerView: 3,
            spacing: 16
        },
        {
            breakpoint: 768,
            slidesPerView: 2,
            spacing: 12
        },
        {
            breakpoint: 480,
            slidesPerView: 1,
            spacing: 8
        }
    ]
});
```

Calling `new SWF(element, options)` replaces any existing SWF instance on that element (the old instance is destroyed cleanly, including its listeners, timers, and generated DOM).

Invalid initialization fails with a thrown `Error` before any DOM changes:

- A missing element, missing `[data-swf-items]` container, or zero `[data-swf-item]` slides throws. `new SWF(null)` is not supported — pass an element or a configuration object.
- Invalid `data-swf-responsive` entries (non-objects, missing/invalid `breakpoint`, `slidesPerView`, or `spacing`) are dropped with a console warning; the default configuration is used if nothing valid remains. The caller's array is never mutated.
- `autoplayDelay`, `animationSpeed`, and non-finite `startIndex` values are normalized to safe ranges.

### JavaScript Methods

- `next()`: Move to the next slide
- `prev()`: Move to the previous slide
- `goToSlide(index)`: Move to a specific zero-based slide index. Indexes are normalized to integers; seamless loop mode accepts any integer (wrapped modulo the slide count), rewind mode wraps at the ends, and finite mode clamps. Returns `true` if a transition started.
- `startAutoplay()`: Request autoplay (explicit user intent)
- `pauseAutoplay()`: Stop autoplay (explicit user intent — survives tab visibility changes and touch interactions)
- `destroy()`: Stop autoplay, remove all listeners, timers, generated DOM, and clones, then restore the original inline styles of the wrapper, container, track, and slides. Safe to call multiple times.

## Features in Detail

### Navigation

- **Touch Controls:**
  - Swipe left/right to navigate (distance-based: drag past 20% of a slide to advance)
  - Vertical scrolling is passed through; diagonal gestures are detected and released
  - Interrupted/canceled gestures (`touchcancel`) always snap the track back into place
- **Button Controls:**
  - Previous/Next buttons (all generated buttons are `type="button"` and never submit enclosing forms)
  - Indicator dots for direct slide access (one per valid position; rebuilt when the layout changes)
- **Autoplay:**
  - Automatic slide progression with a generated pause/play control (or provide your own via `data-swf-pause`)
  - Suspends during touch interaction, keyboard focus, pointer hover, and while the document is hidden; resumes automatically when all suspensions clear
  - A deliberate `pauseAutoplay()` call is preserved across lifecycle events
  - Stops at the final position of finite (non-looping) carousels

### Responsive Design

- Breakpoint-based configuration
- Adjustable slides per view
- Configurable spacing between slides
- Geometry is recalculated whenever the container's measured width changes — not only when the breakpoint changes. Carousels inside sidebars, tabs, or resizable layouts stay in sync.
- Breakpoints compare against `window.innerWidth` and behave as maximum widths: the largest configured entry applies above all listed breakpoints.

### Box Model

SWF's stylesheet applies `box-sizing: border-box` to slides and the track, so slide padding and borders are included in the measured slide width. If you replace the stylesheet with your own, keep `border-box` on `[data-swf-item]` or avoid horizontal padding/borders on slides.

### Seamless Loop Notes

Seamless looping (`infinityLoop`) clones every slide (three copies total). Clones are visual-only: they are `aria-hidden`, `inert`, and stripped of `id`, `name`, and label references so they cannot corrupt form behavior or keyboard navigation. With more than one slide per view, positions near the end may visually include cloned slides; clones are non-interactive by design. For fully interactive looping with multiple slides per view, prefer the rewind mode (`infinite`).

### Accessibility

- The carousel container exposes `role="region"` with `aria-roledescription="carousel"`; slides expose `role="group"` with `aria-roledescription="slide"` and "Slide X of Y" labels (existing author attributes are preserved).
- Offscreen original slides are `inert` and `aria-hidden`, so keyboard focus cannot land on hidden content.
- The active indicator is marked with `aria-current="true"`.
- Autoplay is suspended while a user hovers or focuses the carousel, and a pause/play control is provided whenever autoplay is enabled.
- `prefers-reduced-motion: reduce` disables transition animation.
- Indicator buttons have an enlarged hit area (16px) while keeping a small visual dot.

### Events

The slider emits a `swf:change` event on `[data-swf-items]` after a slide transition completes, providing the current index (always a valid original slide) and slide element:

```javascript
slider.container.addEventListener('swf:change', (e) => {
    console.log('Current slide:', e.detail.index);
    console.log('Slide element:', e.detail.slide);
});
```

The event fires only when the logical index actually changes. Resize-driven index clamping does not emit `swf:change`.

## Browser Support

SenangWebs Frame works on all modern browsers, including:

- Chrome
- Firefox
- Safari
- Edge
- Opera

It requires `ResizeObserver` (all evergreen browsers since 2020). Without it, the library falls back to window `resize` events with a console warning.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

A Node.js version of **20.9.0 or newer** is required for building (the CSS minimizer depends on it).

Validate source and package entry points before submitting:

```bash
npm run build
npm test
npm pack --dry-run
```

Publishing runs the build and package verification automatically via the `prepack` hook, so committed artifacts can never go stale.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to all contributors who have helped improve this library

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/a-hakim/senangwebs-frame/issues).
