<template>
  <line
    :x1="x1 / scale"
    :y1="y1 / scale"
    :x2="x2 / scale"
    :y2="y2 / scale"
    :style="style"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
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
})

const isHorizontal = computed(() => props.y1 === props.y2)

const style = computed(() => ({
  stroke: 'rgb(255,0,0)',
  strokeWidth: props.lineThickness,
  strokeLinecap: 'round',
  cursor: isHorizontal.value ? 'ns-resize' : 'ew-resize'
}))
</script>
