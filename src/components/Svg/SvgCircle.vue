<template>
  <circle
    :cx="vBubble"
    :cy="hBubble"
    :r="10"
    :style="style"
    @mousedown="sendIndex"
  />
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
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
    default: 'black'
  }
})

const emit = defineEmits(['dragging'])

function sendIndex() {
  emit('dragging', [props.ix, props.iy])
}

const vBubble = computed(() =>
  props.ix < 0
    ? (0.7 * props.vLines[0] + 0.3 * props.vLines[props.vLines.length - 1]) /
      props.scale
    : props.vLines[props.ix] / props.scale
)

const hBubble = computed(() =>
  props.iy < 0
    ? (0.7 * props.hLines[0] + 0.3 * props.hLines[props.hLines.length - 1]) /
      props.scale
    : props.hLines[props.iy] / props.scale
)

const style = computed(() => ({
  stroke: props.strokeColor,
  strokeWidth: 2,
  strokeOpacity: 0.7,
  fillOpacity: 0,
  zIndex: 3
}))
</script>
