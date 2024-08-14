<template>
  <svg
    ref="rootRef"
    :width="imageWidth / scale"
    :height="imageHeight / scale"
    :style="{ zIndex: 2, position: 'absolute' }"
  >
    <image
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width="imageWidth / scale"
      :height="imageHeight / scale"
      :xlink:href="imageData"
    />
    <template v-if="hLines.length > 1 && vLines.length > 1">
      <SvgLine
        v-for="(item, index) in hLines"
        :key="generateRandomKey(index)"
        :x1="vLines[0]"
        :y1="hLines[index]"
        :x2="vLines[vLines.length - 1]"
        :y2="hLines[index]"
        :scale="scale"
        :line-thickness="lineThickness"
        @mousedown="
          () => {
            dragging = true
            dragIndex = [-1, index]
          }
        "
      />
      <SvgLine
        v-for="(item, index) in vLines"
        :key="generateRandomKey(index)"
        :x1="vLines[index]"
        :y1="hLines[0]"
        :x2="vLines[index]"
        :y2="hLines[hLines.length - 1]"
        :scale="scale"
        :line-thickness="lineThickness"
        :index="index"
        :dragging="dragging"
        @mousedown="
          () => {
            dragging = true
            dragIndex = [index, -1]
          }
        "
        @mousemove="deltas = $event"
      />
      <SvgCircle
        :ix="0"
        :iy="0"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        stroke-color="red"
        style="cursor: move"
        @dragging="
          (index) => {
            dragging = true
            draggingCorner = 'dragUL'
            dragIndex = index
          }
        "
      />
      <SvgCircle
        :ix="vLines.length - 1"
        :iy="hLines.length - 1"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        stroke-color="red"
        style="cursor: nwse-resize"
        @dragging="
          (index) => {
            dragging = true
            draggingCorner = 'dragLR'
            dragIndex = index
          }
        "
      />
    </template>
  </svg>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SvgLine from './SvgLine.vue'
import SvgCircle from './SvgCircle.vue'

const props = defineProps({
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

  lineThickness: {
    type: Number
  }
})

const emit = defineEmits([
  'circleUL',
  'circleLR',
  'dragUL',
  'dragLR',
  'dragVline',
  'dragHline'
])

const hBubble = ref([0, 0, -1])
const vBubble = ref([0, 0, -1])
const dragging = ref(false)
const deltas = ref()
const dragIndex = ref([])
const draggingCorner = ref()
const rootRef = ref()

function resetDragging() {
  dragging.value = false
  draggingCorner.value = undefined
}

function generateRandomKey(index = 0) {
  return Math.random().toString(16).substr(2, 8) + index
}

function mouseMove({ clientX, clientY }) {
  if (dragging.value) {
    const rect = rootRef.value?.getBoundingClientRect()
    const [x, y] = dragIndex.value
    const dx =
      clientX - rect.left - props.vLines[dragIndex.value[0]] / props.scale
    const dy =
      clientY - rect.top - props.hLines[dragIndex.value[1]] / props.scale

    if (draggingCorner.value) {
      emit(draggingCorner.value, [dx, dy])
    } else {
      // dragging either vertical or horzontal line
      if (dragIndex.value[0] >= 0) {
        // so only one of the indices is semipositive
        emit('dragVline', [dx, dy, dragIndex.value[0]])
      } else {
        emit('dragHline', [dx, dy, dragIndex.value[1]])
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('mouseup', resetDragging)
  window.addEventListener('mousemove', mouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', resetDragging)
  window.removeEventListener('mousemove', mouseMove)
})
</script>
