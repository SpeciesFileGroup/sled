<template>
  <svg id="svg_layer" :width="imageWidth" :height="imageHeight">
    <image
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width="imageWidth/scale"
      :height="imageHeight/scale"
      :xlink:href="imageData" />
    <template v-if="(hLines.length > 1) && (vLines.length > 1)">
      <svg-line
        v-for="(item, index) in hLines"
        :x1="vLines[0]"
        :y1="hLines[index]"
        :x2="vLines[vLines.length - 1]"
        :y2="hLines[index]"
        :scale="scale"
        @mouseover="showHbubble($event)"
      />
      <svg-line
        v-for="(item, index) in vLines"
        :x1="vLines[index]"
        :y1="hLines[0]"
        :x2="vLines[index]"
        :y2="hLines[hLines.length - 1]"
        :scale="scale"
      />
      <svg-circle
        :ix="0"
        :iy="0"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        @mousemove="dragUL($event)"
      />
      <svg-circle
        :ix="vLines.length - 1"
        :iy="hLines.length - 1"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        @mousemove="dragLR($event)"
      />
      <h-circle
        v-if="hBubbleLine >= 0"
        :ix="0"
        :iy="0"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        @mousemove="dragHline($event)"
      />
    </template>
  </svg>
</template>

<script>

import SvgLine from './svgLine'
import SvgCircle from './svgCircle'
import hCircle from './hCircle'

export default {
  components: {
    SvgLine,
    SvgCircle
  },
  props: {
    imageData: {
      type: String,
      required: true
    },
    imageWidth: {
      type: Number,
      required: true
    },
    imageHeight: {
      type: Number,
      required: true
    },
    scale: {
      type: Number,
      default: 1
    },
    hLines: {
      type: Array,
      required: true
    },
    vLines: {
      type: Array,
      required: true
    },
   },
  data () {
    return {
      vBubbleLine: -1,
      hBubbleLine: -1,
    }
  },
  methods: {
    sendEventUL() {
      this.$emit('circleUL', true)
    },
    sendEventLR() {
      this.$emit('circleLR', true)
    },
    dragUL(deltas) {
      this.$emit('dragUL', deltas)
    },
    dragLR(deltas) {
      this.$emit('dragLR', deltas)
    },
    showHbubble(location) {
      this.hBubbleLine = 1
    },
    showVbubble(location) {
      this.vBubbleLine = 1
    },
    dragHline(deltas) {
      this.$emit('dragHline', deltas)
    },
    dragVline(deltas) {
      this.$emit('dragVline', deltas)
    }
  }
}
</script>
