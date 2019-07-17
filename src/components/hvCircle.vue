<template>
  <circle
    :cx="vBubble"
    :cy="hBubble"
    :r="50/scale"
    :style="style"
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
      },
      strokeColor: {
        type: String,
        default: "black"
      },
    },
    methods: {
      sendIndex () {
        this.$emit('dragging', [this.ix, this.iy])
      },
    },
    computed: {
      vBubble () {
        if(this.ix < 0) {
          return (0.7*this.vLines[0] + 0.3*this.vLines[this.vLines.length-1])/this.scale
        }
        else {
          return this.vLines[this.ix]/this.scale
        }
      },
      hBubble () {
        if(this.iy < 0) {
          return (0.7*this.hLines[0] + 0.3*this.hLines[this.hLines.length-1])/this.scale
        }
        else {
          return this.hLines[this.iy]/this.scale
        }
      },
      style () {
        return "stroke:" + this.strokeColor + ";stroke-width:2;stroke-opacity=0.7;fill-opacity:0"
      }
  }

  }
</script>
