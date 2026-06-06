---
name: senangwebs-frame
description: Touch-friendly responsive carousel/slider with smooth transitions, multi-item view, autoplay, and breakpoints.
version: 1.2.5
package: senangwebs-frame
---

# SenangWebs Frame (SWF)

## Quick Reference

- **Purpose**: Responsive slider/carousel with touch navigation and autoplay
- **Source entry**: `src/js/swf.js`
- **Published entries**: `dist/swf.js` and `dist/swf.css`
- **Dependencies**: none
- **Scripts**: `npm run build`, `npm run dev`, `npm run test`

## Workflow

Start in `C:\wamp64\www\sw-libraries\senangwebs-frame`. Read `README.md`, `package.json`, and touched source files. Match existing patterns and the `swf-` CSS prefix.

## HTML Data Attributes

| Attribute | Values | Description |
|---|---|---|
| `data-swf` | flag | Slider container |
| `data-swf-items` | flag | Container for slider items and configuration |
| `data-swf-item` | flag | A slide |
| `data-swf-controls` | flag | Container where default arrows are generated |
| `data-swf-prev` | flag | Custom previous button |
| `data-swf-next` | flag | Custom next button |
| `data-swf-indicators` | flag | Container where indicator buttons are generated |
| `data-swf-autoplay` | `true`/`false` | Enable autoplay |
| `data-swf-autoplay-delay` | ms | Autoplay interval |
| `data-swf-animation-speed` | ms | Slide transition duration |
| `data-swf-infinite` | `true`/`false` | Rewind at the first and last positions |
| `data-swf-infinity-loop` | `true`/`false` | Use cloned slides for seamless looping |
| `data-swf-start-index` | number | Initial zero-based slide index |
| `data-swf-responsive` | JSON | Responsive breakpoint configuration |

## JavaScript API

```js
const slider = new SWF(element, options);
// options: autoplay, autoplayDelay, animationSpeed, infinite,
// infinityLoop, startIndex, responsive
```

### Events

- `swf:change` - fired after a slide transition with `{ index, slide }`

### Methods

- `next()`, `prev()`, `goToSlide(index)`
- `startAutoplay()`, `pauseAutoplay()`
- `destroy()`

## Focus Areas

- Multi-slide layout calculation at each breakpoint
- Touch/swipe gesture detection with threshold
- Autoplay pause during touch and document visibility changes
- Infinite loop: seamless clone approach vs rewind approach
- Responsive breakpoints: dynamic item count and spacing per width
- Package entry-point compatibility for npm and browser bundlers

## Implementation Guidance

- Preserve backward compatibility for all attributes and event names
- Test touch behavior on actual mobile devices
- Verify breakpoint transitions without layout jumps
- Ensure infinite loop does not create duplicate DOM indefinitely
- Keep `package.json` entry fields aligned with generated files in `dist`

## Validation

```bash
npm run build
npm test
npm pack --dry-run
```
