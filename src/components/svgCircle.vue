<template>
  <div>
  {{ makeCircle(ix,iy) }}
  </div>
</template>
<script>
  export default {
    props: {
      hLines: Array,
      vLines: Array,
      scale:  8,
      ix: 0,
      iy: 0,
      svgElement: undefined,
    },
    methods: {
      makeCircle(ix, iy) {
        if((this.vLines[ix] >= 0) && (this.hLines[iy]) >= 0) {
          document.getElementById('svg_layer').innerHTML +=
            '<circle cx=' + this.vLines[ix]/ this.scale +' cy=' + this.hLines[iy]/ this.scale + ' r=' + 50/this.scale + ' style="stroke:rgb(0,255,0);stroke-width:2;opacity:0.7;fill-opacity:0" />'
        }
      },
    }
  }
</script>
