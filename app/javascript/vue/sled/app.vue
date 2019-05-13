<template>
  <div id="sled_test">
    <hi>SLED test page</hi>
    <div class="line-inputs">
      <new-hline />
      <new-vline />
    </div>
  </div>
</template>
<script>
  import "./components/newHline"
  import "./components/newVline"
  export default {
    components: {
    newHline,
    newVline
  },
    data: {

    },
    methods: {
      addNewHline() {
        //
      },
      addNewVline() {
        //
      },
    }
  }
</script>
