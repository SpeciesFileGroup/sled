<template>
  <div id="sled_test">
    <h1>SLED test page</h1>

      <input type="file" v-on:change="getImage"/>
      <div class="image-inputs">
        <br>
        <label>Width</label>
        <input
          type="number"
          disabled="true"
          v-model.number="width"/>
        <br>
        <label>Height</label>
        <input
          type="number"
          disabled="true"
          v-model.number="height"/>
      </div>
      <br>
      <label>
        Autosize
        <input
          v-model="autosize"
          type="checkbox">
      </label>
      <br>
      <label>Set image divisor</label>
      <input
        type="number"
        v-model.number="scale"/>
      <br>
      <label>Set line thickness</label>
      <input
        type="number"
        v-model.number="lineWeight"/>

    <div class="line-inputs">
      <div>
        <new-line
          label="Add new vertical line"
          @reset="resetVlines"
          @newLine="addNewVline"/>
      </div>
      <div>
        <new-line
          label="Add new horizontal line"
          @reset="resetHlines"
          @newLine="addNewHline"/>
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
    <div class="test">
    <sled-component
      class="test"
      ref="sled"
      :vertical-lines="vlines"
      :horizontal-lines="hlines"
      :image-width="width"
      :image-height="height"
      :line-weight="lineWeight"
      :autosize="autosize"
      :file-image="fileImage"
      :metadata-assignment="metadata"
      @onComputeCells="cells = $event"/>
    </div>
  </div>
</template>

<script>

import SledComponent from './components/sled.vue'
import NewLine from './components/newLine'

export default {
  name: 'sled',

  components: {
    SledComponent,
    NewLine
  },

  data () {
    return {
      width: 0, // horizontal extent of image in pixels
      height: 0, // vertical extent of image
      scale: 1,
      vlines: [],
      hlines: [],
      lineWeight: 4,
      fileImage: undefined,
      autosize: true,
      cells: [],
      metadata: {
        foo: 'Test',
        bar: 'Another test'
      }
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
      const files = event.target.files

      // FileReader support
      if (FileReader && files && files.length) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          const newImage = new Image()
          newImage.src = fileReader.result
          newImage.onload = () => {
            this.width = newImage.width
            this.height = newImage.height
            this.fileImage = fileReader.result
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
</style>
