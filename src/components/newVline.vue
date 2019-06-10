<template>
  <div>
    <label>
      Add new vertical line
    </label>
    <input
      v-model.number="x"
      type="number" />
    <input
      type="button"
      value="Add"
      @click="addLine()" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      x: undefined
    }
  },
  methods: {
    addLine () {
      if (this.x >= 0) {
        this.$emit('newLine', this.x)
      }
    }
  }
}
</script>
