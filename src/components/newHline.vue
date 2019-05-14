<template><div>
  Add new horizontal line
  <input type="number"  onchange="setValue" />
  <input type="button" value="Add" onclick="addLine" />
</div>
</template>
<script>
  export default {
    props: {
      //
    },
    data() { return {
        y: 0
      }
    },
    methods: {
      setValue(){
        this.y = $event
      },
      addLine() {
        this.$emit("newLine", this.y)
      }
    }
  }
</script>
