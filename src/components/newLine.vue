<template>
  <div>
    <label>
      {{ label }}
    </label>
    <input
      v-model.number="value"
      type="number" />
    <button
      type="button"
      @click="addLine()">
      Add
    </button>
    <button
      type="button"
      @click="reset">
      Reset
    </button>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  },

  emits: [
    'newLine',
    'reset'
  ],

  data () {
    return {
      value: undefined
    }
  },
  methods: {
    addLine () {
      if (this.value >= 0) {
        this.$emit('newLine', this.value)
      }
    },

    reset () {
      this.value = undefined
      this.$emit('reset')
    }
  }
}
</script>
