# SenangWebs Frame (SWF)

SenangWebs Frame (SWF) is a lightweight, touch-friendly JavaScript slider library that provides a modern, responsive carousel experience with smooth transitions and intuitive navigation. With minimal setup, you can transform your content into an engaging slider with support for multiple items per view, autoplay, and responsive breakpoints.

## Features

- Easy to integrate with existing projects
- Responsive slider with smooth transitions
- Support for multiple slides per view
- Configurable spacing between slides
- Touch-friendly swipe navigation
- Autoplay with customizable delay
- Infinite loop option (rewind)
- Seamless infinite loop option
- Customizable via data attributes or JavaScript
- Built-in navigation controls and indicators
- Responsive breakpoints support
- No external dependencies
- Efficient performance
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

### Using a CDN

You can include SenangWebs Frame directly in your HTML file using unpkg:

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

<!-- Or if using unpkg -->
<link rel="stylesheet" href="https://unpkg.com/senangwebs-frame@latest/dist/swf.css">
<script src="https://unpkg.com/senangwebs-frame@latest/dist/swf.js"></script>
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

The browser bundle automatically initializes every `[data-swf]` slider when the page loads.

## Configuration Options

Configure your slider using either data attributes or JavaScript initialization:

### Data Attributes

- `data-swf`: Marks the container element as a slider
- `data-swf-items`: Container for slider items
- `data-swf-item`: Marks an element as a slider item
- `data-swf-controls`: Container for navigation arrows
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

Calling `new SWF(element, options)` replaces any existing SWF instance on that element.

### JavaScript Methods

- `next()`: Move to the next slide
- `prev()`: Move to the previous slide
- `goToSlide(index)`: Move to a specific zero-based slide index
- `startAutoplay()`: Start autoplay
- `pauseAutoplay()`: Pause autoplay
- `destroy()`: Stop autoplay, disconnect the resize observer, and reset slider styles and clones

## Features in Detail

### Navigation

- **Touch Controls:**
  - Swipe left/right to navigate
  - Touch sensitivity with momentum scrolling
- **Button Controls:**
  - Previous/Next buttons
  - Indicator dots for direct slide access
- **Autoplay:**
  - Automatic slide progression
  - Pauses during touch interaction and while the document is hidden
  - Customizable delay

### Responsive Design

- Breakpoint-based configuration
- Adjustable slides per view
- Configurable spacing between slides
- Smooth transitions between breakpoints

### Events

The slider emits a `swf:change` event when slides change, providing the current index and slide element:

```javascript
slider.container.addEventListener('swf:change', (e) => {
    console.log('Current slide:', e.detail.index);
    console.log('Slide element:', e.detail.slide);
});
```

## Browser Support

SenangWebs Frame works on all modern browsers, including:

- Chrome
- Firefox
- Safari
- Edge
- Opera

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Validate source and package entry points before submitting:

```bash
npm run build
npm test
npm pack --dry-run
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to all contributors who have helped improve this library

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
