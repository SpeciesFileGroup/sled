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

import NewHline from './components/newHline'
import NewVline from './components/newVline'

export default {
  components: {
    NewHline,
    NewVline
  },
  data () {
    return {}
  },
  methods: {
    addNewHline () {
      //
    },
    addNewVline () {
      //
    }
  }
}
</script>
