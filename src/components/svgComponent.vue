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
        :index="index"
        @hBubble="showHbubble($event)"
        @vBubble="showVbubble($event)"
        @removeBubble="removeBubble"
      />
      <svg-line
        v-for="(item, index) in vLines"
        :x1="vLines[index]"
        :y1="hLines[0]"
        :x2="vLines[index]"
        :y2="hLines[hLines.length - 1]"
        :scale="scale"
        :index="index"
        @hBubble="showHbubble($event)"
        @vBubble="showVbubble($event)"
        @removeBubble="removeBubble"
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
      <h-circle v-if="hBubble[2]>=0"
        :ix="0"
        :iy="hBubble[2]"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        @mousemove="dragHline($event)"
      />
      <v-circle v-if="vBubble[2]>=0"
        :ix="vBubble[2]"
        :iy="0"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        @mousemove="dragVline($event)"
      />
    </template>
  </svg>
</template>

<script>

import SvgLine from './svgLine'
import SvgCircle from './svgCircle'
import hCircle from './hCircle'
import vCircle from './vCircle'

export default {
  components: {
    SvgLine,
    SvgCircle,
    hCircle,
    vCircle
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
      hBubble: [0, 0, -1],
      vBubble: [0, 0, -1]     // x, y, line index
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
    dragHline(deltas) {
      this.$emit('dragHline', deltas)
    },
    dragVline(deltas) {
      this.$emit('dragVline', deltas)
    },
    showHbubble(location) {
      this.hBubble = location     // set the drag bubble for this line
      this.vBubble = [0, 0, -1]
    },
    showVbubble(location) {
      this.vBubble = location
      this.hBubble = [0, 0, -1]   // clear the other axis bubble
    },
    removeBubble() {              // clear both axes' bubbles
      this.vBubble = [0, 0, -1]
      this.hBubble = [0, 0, -1]
    },
  }
}
</script>
