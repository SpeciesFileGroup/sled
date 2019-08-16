# SLED

Sled is a UI for grid-based user-driven image segmentation.  Applications in processing of natural history specimen collections.

## Running locally

```bash
npm install

npm run serve
```

Navigate to `http://localhost:8080/` in your browser.

## Installation

With NPM

```bash
npm install @sfg/sled
```

## For Vue.js 2.0

### Import component

```javascript
import SledComponent from '@sfg/sled'

export default {
  components: {
    SledComponent
  }
}
```

### Typical use
```html
<sled-component
  :vertical-lines="vlines"
  :horizontal-lines="hlines"
  :image-width="width"
  :image-height="height"
  :line-weight="lineWeigth"
  :scale="scaleForScreen"
  :file-image="fileImage"
  @onComputeCells="saveCells"/>
```

### Events

#### onComputedCells
Event is triggered each time when vertical and horizontal lines are added and computed to create the cells. Contains information of computed cells.

### Props

#### fileImage
Type: `String`<br>
Required: `false`<br>
Default: ''

#### image-width
Type: `Number`<br>
Required: `true`<br>

#### image-height
Type: `Number`<br>
Required: `true`<br>

#### vertical-lines
Type: `Array`<br>
Required: `false`<br>
Default: `[]`

#### horizontal-lines
Type: `Array`<br>
Required: `false`<br>
Default: `[]`

#### line-weight
Type: `Number`<br>
Required: `false`<br>
Default: `4`

#### scale
Type: `Number`<br>
Required: `false`<br>
Default: `1`