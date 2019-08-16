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
    }
  }
}
</script>
