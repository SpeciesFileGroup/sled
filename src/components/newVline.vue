<template>
  <div>
  Add new vertical line
  <input v-model.number="x" type="number" />
  <input type="button" value="Add" :click="addLine()" />
</div>
</template>
<script>
  export default {
    props: {
      //
    },
    data() { return {
        x: undefined
      }
    },
    methods: {
      addLine() {
        this.$emit("newLine", this.x)
      }
    }
  }
</script>
