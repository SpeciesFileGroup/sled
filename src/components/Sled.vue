<template>
  <div
    ref="rootRef"
    :style="{
      display: 'block',
      position: 'relative',
      height: `${height}px`
    }"
  >
    <SvgComponent
      v-if="fileImage"
      :image-width="width"
      :image-height="height"
      :image-data="fileImage"
      :h-lines="hLines"
      :v-lines="vLines"
      :scale="scale"
      :line-thickness="lineWeight"
      @dragUL="moveGrid"
      @dragLR="stretchGrid"
      @dragHline="moveHline"
      @dragVline="moveVline"
    />
    <CellComponent
      v-for="(cell, index) in cells"
      :key="index"
      :locked="locked"
      :metadata="metadataAssignment"
      :scale="scale"
      v-model="cells[index]"
      @onChange="updateCell(index, $event)"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import SvgComponent from './Svg/SvgComponent.vue'
import CellComponent from './Cell.vue'

defineOptions({
  name: 'Sled'
})

const props = defineProps({
  metadataAssignment: {
    type: Object,
    default: () => ({})
  },

  imageWidth: {
    type: Number,
    required: true
  },

  imageHeight: {
    type: Number,
    required: true
  },

  fileImage: {
    type: String
  },

  lineWeight: {
    type: [Number, String],
    default: 4
  },

  autosize: {
    type: Boolean,
    default: true
  },

  locked: {
    type: Boolean,
    default: false
  }
})

const vLines = defineModel('verticalLines', {
  type: Array,
  required: true
})

const hLines = defineModel('horizontalLines', {
  type: Array,
  required: true
})

const emit = defineEmits(['onComputeCells', 'resize'])

const width = ref(0) // horizontal extent of image in pixels
const height = ref(0) // vertical extent of image
const cells = ref([]) // pixel coord of upper left, lower right - derived, e.g.[[0, 0], [100, 150]]
const oldWidth = ref(0)
const oldHeight = ref(0)
const observeContainer = ref(undefined)
const scale = ref(1)
const rootRef = ref(null)

const rows = computed(() => hLines.value.length - 1)
const columns = computed(() => vLines.value.length - 1)

watch([() => hLines.value.length, () => vLines.value.length], () => {
  sortLines()
})

watch(
  [hLines, vLines],
  () => {
    computeCells()
  },
  { deep: true }
)

watch(
  () => props.imageHeight,
  (newVal) => {
    height.value = newVal
    resizeImage()
  },
  { immediate: true }
)

watch(
  () => props.imageWidth,
  (newVal) => {
    width.value = newVal
    resizeImage()
  },
  { immediate: true }
)

watch(
  () => props.fileImage,
  (newVal) => {
    oldWidth.value = width.value
    oldHeight.value = height.value
    resizeImage()
  }
)

watch(
  () => props.autosize,
  (newVal) => {
    if (newVal) {
      observeContainer.value = new ResizeObserver(resizeSled)
      observeContainer.value.observe(rootRef.value)
    } else {
      observeContainer.value.disconnect()
    }
    scale.value = scaleForScreen()
  }
)

onMounted(() => {
  computeCells()
  if (props.autosize) {
    observeContainer.value = new ResizeObserver(resizeSled)
    observeContainer.value.observe(rootRef.value)
  }
})

onBeforeUnmount(() => {
  observeContainer.value.disconnect()
})

function updateCell(index, cell) {
  cells.value[index] = cell
  emit('onComputeCells', cells.value)
}

function isFirstLineOutsideCorner(lines, offset) {
  const [first] = lines

  return first + offset < 0
}

function moveX(offset) {
  if (!isFirstLineOutsideCorner(vLines.value, offset)) {
    for (let i = 0; i < vLines.value.length; i++) {
      moveV(i, offset)
    }

    sortLines()
  }
}

function moveY(offset) {
  if (!isFirstLineOutsideCorner(hLines.value, offset)) {
    for (let i = 0; i < hLines.value.length; i++) {
      moveH(i, offset)
    }

    sortLines()
  }
}

function moveV(index, offset) {
  // move a single vertical line by x-offset
  const value = Math.round(vLines.value[index] + offset)
  if (value < 0 || value > props.imageWidth) return
  vLines.value[index] = value

  sortLines()
}

function moveH(index, offset) {
  // move a single horizontal line by y-offset
  const value = Math.round(hLines.value[index] + offset)
  if (value < 0 || value > props.imageHeight) return
  hLines.value[index] = value

  sortLines()
}

function resizeImage() {
  // if image size changes, recompute lines and cells
  if (oldWidth.value > 1) {
    // a previous presumably valid width
    const hScale = width.value / oldWidth.value
    const n = vLines.value.length
    let h = 0

    for (h = 0; h < n; h++) {
      vLines.value[h] = Math.round(vLines.value[h] * hScale)
    }
  }
  if (oldHeight.value > 1) {
    // a previous presumably valid height
    const vScale = height.value / oldHeight.value
    const m = hLines.value.length
    let v = 0

    for (v = 0; v < m; v++) {
      hLines.value[v] = Math.round(hLines.value[v] * vScale)
    }
  }
  oldWidth.value = width.value
  oldHeight.value = height.value
  computeCells()
}

function equalizeLines() {
  if (hLines.value.length > 1 && vLines.value.length > 1) {
    // compute intersections
    cells.value = []
    const hSize = (hLines.value[rows.value] - hLines.value[0]) / rows.value
    const vSize =
      (vLines.value[columns.value] - vLines.value[0]) / columns.value

    for (let j = 0; j < rows.value; j++) {
      hLines.value[j] = Math.round(hLines.value[0] + j * hSize)
    }
    for (let i = 0; i < columns.value; i++) {
      vLines.value[i] = Math.round(vLines.value[0] + i * vSize)
    }

    computeCells()
  }
}

function computeCells() {
  if (hLines.value.length > 0 && vLines.value.length > 0) {
    let ul, lr // upper left, lower right corners of cell
    let cellIndex = -1

    for (let j = 0; j < rows.value; j++) {
      for (let i = 0; i < columns.value; i++) {
        cellIndex = columns.value * j + i

        ul = { x: vLines.value[i], y: hLines.value[j] }
        lr = { x: vLines.value[i + 1], y: hLines.value[j + 1] }

        const { metadata = null, textfield } = cells.value[cellIndex] || {}

        cells.value[cellIndex] = {
          index: cellIndex,
          upperCorner: ul,
          lowerCorner: lr,
          row: j,
          column: i,
          metadata,
          textfield
        }
      }
    }

    cells.value = cellIndex === -1 ? [] : cells.value.slice(0, cellIndex + 1)

    emit('onComputeCells', cells.value)
  }
}

function generateJSON() {
  return JSON.stringify(cells.value)
}

function sortLines() {
  vLines.value = vLines.value.toSorted((a, b) => a - b)
  hLines.value = hLines.value.toSorted((a, b) => a - b)
}

function stretchGrid(deltas) {
  const [dx, dy] = deltas
  const lastVLine = vLines.value.at(-1)
  const lastHLine = hLines.value.at(-1)

  if (lastVLine + dx > props.imageWidth || lastHLine + dy > props.imageHeight) {
    return
  }

  for (let h = 1; h < vLines.value.length; h++) {
    const value = Math.round(vLines.value[h] + (h * dx) / columns.value)

    if (value > 0 && value <= props.imageWidth) {
      vLines.value[h] = Math.round(vLines.value[h] + (h * dx) / columns.value)
    }
  }

  for (let v = 1; v < hLines.value.length; v++) {
    const value = Math.round(hLines.value[v] + (v * dy) / rows.value)

    if (value > 0 && value <= props.imageHeight) {
      hLines.value[v] = Math.round(hLines.value[v] + (v * dy) / rows.value)
    }
  }

  sortLines()
}

function moveGrid(deltas) {
  const [dx, dy] = deltas

  moveX(dx)
  moveY(dy)
}

function moveHline(deltas) {
  const dy = deltas[1]
  const iy = deltas[2]

  moveH(iy, dy) // effect line change through common function
}

function moveVline(deltas) {
  const dx = deltas[0]
  const ix = deltas[2]

  moveV(ix, dx)
}

function scaleForScreen() {
  if (props.autosize) {
    const rect = rootRef.value.getBoundingClientRect()
    const scaleHeight =
      rect.height < height.value ? height.value / rect.height : 1
    const scaleWidth = rect.width < width.value ? width.value / rect.width : 1
    return scaleHeight > scaleWidth ? scaleHeight : scaleWidth
  } else {
    return 1
  }
}

function resizeSled(mutationsList, observer) {
  const rect = rootRef.value.getBoundingClientRect()

  scale.value = scaleForScreen()
  emit('resize', {
    ...rect,
    scale: scale.value
  })
}

defineExpose({
  moveX,
  moveY,
  moveH,
  moveV,
  equalizeLines
})
</script>
