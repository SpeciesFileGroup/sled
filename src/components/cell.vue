<template>
  <div :style="style">
    <span
      v-if="cell?.textfield"
      class="cell-textfield"
      :style="TEXTFIELD_STYLE"
      v-html="cell.textfield"
    />
    <select
      v-if="!checked"
      class="cell-select"
      v-model="cell.metadata"
      :disabled="locked"
      :style="SELECTOR_STYLE"
      @change="emit('onChange', cell)"
    >
      <option value="none">None</option>
      <option
        v-for="(value, key) in metadata"
        :key="key"
        :value="key"
      >
        {{ value }}
      </option>
    </select>
    <input
      type="checkbox"
      class="cell-checkbox"
      :disabled="locked"
      :style="INPUT_STYLE"
      v-model="checked"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const MARGIN_VALUE = 5

const INPUT_STYLE = {
  position: 'absolute',
  right: '10px',
  bottom: '10px'
}

const TEXTFIELD_STYLE = {
  position: 'absolute',
  top: '4px',
  backgroundColor: '#FFF',
  borderRadius: '3px',
  padding: '4px',
  opacity: 0.9
}

const SELECTOR_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },

  metadata: {
    type: Object,
    default: undefined
  },

  scale: {
    type: Number,
    default: 1
  },

  locked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'onChange'])

const cell = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const checked = computed({
  get() {
    return !cell.value.metadata
  },
  set(isCheck) {
    cell.value.metadata = isCheck ? null : cell.value.metadata || 'none'
  }
})

const style = computed(() => {
  const { upperCorner, lowerCorner } = cell.value

  return {
    position: 'absolute',
    top: `${upperCorner.y / props.scale + MARGIN_VALUE}px`,
    left: `${upperCorner.x / props.scale + MARGIN_VALUE}px`,
    width: `${
      (lowerCorner.x - upperCorner.x) / props.scale - MARGIN_VALUE * 2
    }px`,
    height: `${
      (lowerCorner.y - upperCorner.y) / props.scale - MARGIN_VALUE * 2
    }px`,
    zIndex: 2
  }
})
</script>
