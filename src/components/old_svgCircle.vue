<template>
    <circle
      :cx="vLines[ix] / scale" :cy="hLines[iy] / scale" :r="50/scale" style="stroke:rgb(255,0,0);stroke-width:2;opacity:0.7;fill-opacity:0"
      @mousedown="sendIndex"/>
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
  methods: {
    sendIndex () {
      this.$emit('dragging', [this.ix, this.iy])
    }
  }

}
</script>
