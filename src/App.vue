<template>
  <div id="sled_test">
    <h1>SLED test page</h1>
    <input type="file" v-on:change="getImage"/>
    <div class="image-inputs">
      <br>
      <label>Set image divisor</label>
      <input
        type="number"
        v-model.number="scale"/>
      <br>
      <label>Set line thickness</label>
      <input
        type="number"
        v-model.number="lineWeigth"/>
    </div>
    <div class="line-inputs">
      <div>
        <new-vline @newLine="addNewVline"/>
        <input
          type="button"
          value="RESET"
          @click="resetVlines()"/>
      </div>
      <div>
        <new-hline @newLine="addNewHline"/>
        <input
          type="button"
          value="RESET"
          @click="resetHlines()"/>
      </div>
      <div>
        <input type="button" value="Equalize cells" @click="$refs.sled.equalizeLines()" />
      </div>
    </div>
    <div class="cells">
      <table>
        <thead>
        <tr>
          <th>
            Move grid X: 
            <input type="button" value="-100" size="4" v-on:click="$refs.sled.moveX(-100)"/>
            <input type="button" value="-25" size="4" v-on:click="$refs.sled.moveX(-25)"/>
            <input type="button" value="-1" size="4" v-on:click="$refs.sled.moveX(-1)"/>
            <input type="button" value="+1" size="4" v-on:click="$refs.sled.moveX(1)"/>
            <input type="button" value="+25" size="4" v-on:click="$refs.sled.moveX(25)"/>
            <input type="button" value="+100" size="4" v-on:click="$refs.sled.moveX(100)"/>
            <br>
            Move grid Y:
            <input type="button" value="-100" v-on:click="$refs.sled.moveY(-100)"/>
            <input type="button" value="-25" v-on:click="$refs.sled.moveY(-25)"/>
            <input type="button" value="-1" v-on:click="$refs.sled.moveY(-1)"/>
            <input type="button" value="+1" v-on:click="$refs.sled.moveY(1)"/>
            <input type="button" value="+25" v-on:click="$refs.sled.moveY(25)"/>
            <input type="button" value="+100" v-on:click="$refs.sled.moveY(100)"/>
          </th>
          <th
            v-for="(vline, index) in vLinesInOrder"
            :key="index">
            <input type="button" value="-100" v-on:click="$refs.sled.moveV(index, -100)"/>
            <input type="button" value="-25" v-on:click="$refs.sled.moveV(index, -25)"/>
            <input type="button" value="-1" v-on:click="$refs.sled.moveV(index, -1)"/>
            <input type="button" value="X" v-on:click="removeColumn(index)"/>
            {{ vline }}
            <input type="button" value="+1" v-on:click="$refs.sled.moveV(index, 1)"/>
            <input type="button" value="+25" v-on:click="$refs.sled.moveV(index, 25)"/>
            <input type="button" value="+100" v-on:click="$refs.sled.moveV(index, 100)"/>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(hline, hindex) in hLinesInOrder"
          :key="hindex">
          <td>
            <input type="button" value="-100" v-on:click="$refs.sled.moveH(hindex, -100)"/>
            <input type="button" value="-25" v-on:click="$refs.sled.moveH(hindex, -25)"/>
            <input type="button" value="-1" v-on:click="$refs.sled.moveH(hindex, -1)"/>
            <input type="button" value="X" v-on:click="removeRow(hindex)"/>
            {{ hline }}
            <input type="button" value="+1" v-on:click="$refs.sled.moveH(hindex, 1)"/>
            <input type="button" value="+25" v-on:click="$refs.sled.moveH(hindex, 25)"/>
            <input type="button" value="+100" v-on:click="$refs.sled.moveH(hindex, 100)"/>
          </td>
          <td
            v-for="(vline, vindex) in vlines"
            :key="vindex">
            <template v-if="(vindex < vlines.length - 1) && (cells[(vlines.length - 1)*hindex + vindex])">
            {{ cells[(vlines.length - 1)*hindex + vindex] }}
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <sled-component
      ref="sled"
      :vertical-lines="vlines"
      :horizontal-lines="hlines"
      :image-width="width"
      :image-height="height"
      :line-weight="lineWeigth"
      :scale="scale"
      :file-image="fileImage"
      @onComputeCells="cells = $event"/>
  </div>
</template>

<script>

import SledComponent from './components/sled.vue'
import newHline from './components/newHline'
import newVline from './components/newVline'

export default {
  components: {
    SledComponent,
    newHline,
    newVline
  },
  name: 'sled',
  data () {
    return {
      width: 0, // horizontal extent of image in pixels
      height: 0, // vertical extent of image
      scale: 7.70,
      vlines: [34, 400],
      hlines: [100, 500],
      lineWeigth: 4,
      fileImage: undefined,
      cells: []
    }
  },
  computed: {
    vLinesInOrder () {
      return this.vlines
    },
    hLinesInOrder () {
      return this.hlines
    }
  },
  methods: {
    getImage (event) {
      let files = event.target.files
      let that = this
      // FileReader support
      if (FileReader && files && files.length) {
        let fileReader = new FileReader()
        fileReader.onload = (image) => {
          let newImage = new Image()
          newImage.src = fileReader.result
          newImage.onload = function () {
            that.width = newImage.width
            that.height = newImage.height
            that.fileImage = fileReader.result
          }
        }
        fileReader.readAsDataURL(files[0])
      }
    },
    addNewHline (y) {
      this.hlines.push(y)
    },
    resetHlines () {
      this.hlines = []
    },
    addNewVline (x) {
      this.vlines.push(x)
    },
    resetVlines () {
      this.vlines = []
    },
    removeRow (index) {
      this.$delete(this.hlines, index)
    },
    removeColumn (index) {
      this.$delete(this.vlines, index)
    }
  }
}
</script>
<style lang="scss">
  input {
    font-size: 8px;
  }
  th {
    width: 400px;
    font-size: 10px;
  }
  td {
    width: 400px;
    font-size: 10px;
    border: 1px solid gray;
  }
  #svg_container {
    display: flex;
    max-width: 100%;
    position: relative;
  }
  #image {
    height: 100%;
    width: 100%;
    position: relative;
  }
  #svg_layer {
    z-index: 2;
    position: absolute;
  }
</style>
