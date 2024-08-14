<template>
  <div>
    <label>
      {{ label }}
    </label>
    <input
      type="number"
      v-model.number="inputValue"
      @keypress.enter="addLine"
    />
    <button
      type="button"
      @click="addLine()"
    >
      Add
    </button>
    <button
      type="button"
      @click="reset"
    >
      Reset
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['newLine', 'reset'])

const inputValue = ref()

function addLine() {
  if (inputValue.value >= 0) {
    emit('newLine', inputValue.value)
  }
}

function reset() {
  inputValue.value = undefined
  emit('reset')
}
</script>
