<template>
  <line :x1="x1 / scale" :y1="y1 / scale" :x2="x2 / scale" :y2="y2 / scale" style="stroke:rgb(255,0,0);stroke-width:4" />
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
  }
}
</script>
