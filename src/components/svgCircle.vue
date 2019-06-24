<template>
    <circle
      :cx="vLines[ix] / scale" :cy="hLines[iy] / scale" :r="50/scale" style="stroke:rgb(0,255,0);stroke-width:2;opacity:0.7;fill-opacity:0"
      @mousedown="dragging=true" @mousemove="dragCircle" @mouseup="dragging=false"/>
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
      dragging: false
    }
  },
  methods: {
    sendEvent () {
      // this.$emit('mousedown', true)
      this.dragging = true
    },
    dragCircle(event) {
      if (this.dragging) {
        this.$emit('mousemove', [event.pageX, event.pageY])
      }
    }
  }

}
</script>
