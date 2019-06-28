<template>
  <line :x1="x1 / scale" :y1="y1 / scale" :x2="x2 / scale" :y2="y2 / scale" style="stroke:rgb(255,0,0);stroke-width:4" @mouseover="showBubble" @mouseout="removeBubble"/>
</template>

<script>
export default {
  props: {
    x1: {
      type: [Number, String],
      required: true
    },
    x2: {
      type: [Number, String],
      required: true
    },
    y1: {
      type: [Number, String],
      required: true
    },
    y2: {
      type: [Number, String],
      required: true
    },
    scale: {
      type: [Number, String],
      required: true
    }
  },
  // on mouseover, signal to add a bubble ?
  methods: {
    showBubble() {
      if (this.x1 == this.x2) {
        this.$emit('vBubble', [this.x2, 0.3 * (this.y2 - this.y1), 1])
      }
      if (this.y1 == this.y2)
      this.$emit('hBubble', [0.3 * (this.x2 - this.x1), this.y2, 1])
    },
    removeBubble() {
      this.$emit('removeBubble')
    }
  }
}
</script>
