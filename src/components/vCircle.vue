<template>
  <circle
    :cx="vLines[ix]/scale" :cy="0.3*(hLines[hLines.length-1] - hLines[0])/scale" :r="50/scale" style="stroke:rgb(0,0,0);stroke-width:2;opacity:0.7;fill-opacity:0"
    @mousedown="dragging=true" @mousemove="dragCircle($event)" @mouseup="endDrag"/>
</template>
<script>
  export default {
    props: {
      hLines: {
        type: Array,
        required: true
      },
      vLines: {
        type: Array,
        required: true
      },
      scale: {
        type: Number,
        default: 1
      },
      ix: {
        type: Number,
        default: 0
      },
      iy: {
        type: Number,
        default: 0
      }
    },
    data()  {
      return {
        dragging: false,
      }
    },
    methods: {
      sendEvent () {
        // this.$emit('mousedown', true)
        this.dragging = true
      },
      dragCircle(event) {
        if (this.dragging) {
          let dx = event.layerX * this.scale - this.vLines[this.ix]
          let dy = event.layerY * this.scale - this.hLines[this.iy]
          this.$emit('mousemove', [dx, dy, this.ix])
        }
      },
      endDrag() {
        this.dragging = false
      }
    }

  }
</script>
