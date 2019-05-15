<template><div>
  Add new horizontal line
  <input v-model.number="y" type="number" />
  <input type="button" value="Add" :click="addLine()" />
</div>
</template>
<script>
  export default {
    props: {
      //
    },
    data() { return {
        y: undefined
      }
    },
    methods: {
      addLine() {
        this.$emit("newLine", this.y)
      }
    }
  }
</script>
