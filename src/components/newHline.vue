<template>
  <div>
    <label>
      Add new horizontal line
    </label>
    <input
      v-model.number="y"
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
      y: undefined
    }
  },
  methods: {
    addLine () {
      if (this.y) {
        this.$emit('newLine', this.y)
      }
    }
  }
}
</script>
