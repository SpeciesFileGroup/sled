<template>
  <div id="sled_test">
    <h1>SLED test page</h1>
    <div class="line-inputs">
      <new-hline @newLine="addNewHline($event)" />
      <new-vline  @newLine="addNewVline($event)" />
    </div>
    <div class="cells">
      <table
    </div>
  </div>
</template>
<script>

import NewHline from './components/newHline'
import NewVline from './components/newVline'

export default {
  components: {
    NewHline,
    NewVline
  },
  data () {
    return {
      width: 1000, // horizontal extent of image in pixels
      height: 750, // vertical extent of image
      hlines: [0], // y pixel coord of line
      vlines: [0], // x pixel coord of line
      cells: [] // pixel coord of upper left, lower right - derived, e.g.[[0, 0], [100, 150]]
    }
  },
  methods: {
    addNewHline (y) {
      hlines.push(y)
    },
    addNewVline (x) {
      vlines.push(x)
    }
  }
}
</script>
