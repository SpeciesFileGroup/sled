<template>
  <line :x1="x1 / scale" :y1="y1 / scale" :x2="x2 / scale" :y2="y2 / scale" :index="index" :style="style" @mouseover="showBubble" @mouseout="removeBubble"/>
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
    },
    index: {
      type: [Number, String],
      required: true
    },
    dragging: {
      type: Boolean,
      required: true
    },
    lineThickness: {
      type: [Number, String]
    }
  },
  // on mouseover, signal to add a bubble ?
  methods: {
    showBubble() {
      if (this.x1 == this.x2) {
        this.$emit('vBubble', [this.x2, 0.7 * (this.y2 - this.y1), this.index])
      }
      if (this.y1 == this.y2)
      this.$emit('hBubble', [0.7 * (this.x2 - this.x1), this.y2, this.index])
    },
    removeBubble() {
      let that = this
      setTimeout(function() {
        if(this.dragging) {that.$emit('removeBubble')}      // should be !this.dragging to remove bubble
      }, 3000)
    },
  },
  computed: {
    style(){
      if(this.lineThickness == "") {this.lineThickness = 1}
      return "stroke:rgb(255,0,0);stroke-width:" + this.lineThickness
    }
  }
}
</script>
