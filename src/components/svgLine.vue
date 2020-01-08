<template>
  <line
    :class="{ 'line-horizontal': isHorizontal, 'line-vertical': !isHorizontal }"
    :x1="x1 / scale"
    :y1="y1 / scale"
    :x2="x2 / scale"
    :y2="y2 / scale"
    :style="style"
    @mousedown="sendIndex"/>
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
    lineThickness: {
      type: [Number, String]
    }
  },
  computed: {
    isHorizontal () {
      return this.y1 === this.y2
    },
    style () {
      return `stroke:rgb(255,0,0);stroke-width:${this.lineThickness};stroke-linecap:round;cursor:${this.isHorizontal ? 'ns-resize' : 'ew-resize'}`
    }
  },
  // on mouseover, signal to add a bubble ?
  methods: {
    sendIndex () {
      this.$emit('dragging')
    }
  }
}
</script>
