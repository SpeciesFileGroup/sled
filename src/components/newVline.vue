<template>
  <div>
  Add new vertical line
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
        x: 0
      }
    },
    methods: {
      setValue(){
        this.x = $event
      },
      addLine() {
        this.$emit("newLine", this.x)
      }
    }
  }
</script>
