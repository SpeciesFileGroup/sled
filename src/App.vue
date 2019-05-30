<template>
  <div id="sled_test">
    <h1>SLED test page</h1>
    <input type="file" v-on:change="getImage"/>
    <div class="image-inputs">
      <label>Enter image width</label>
      <input
        type="number"
        v-model.number="width" v-on:change="resizeImage"/>
      <input type="button" value="- 100" v-on:click="width-=100"/>
      <input type="button" value="+ 100" v-on:click="width+=100"/>
      <br>
      <label>Enter image height</label>
      <input
        type="number"
        v-model.number="height" v-on:change="resizeImage"/>
      <input type="button" value="- 100" v-on:click="height-=100"/>
      <input type="button" value="+ 100" v-on:click="height+=100"/>
    </div>
    <div class="line-inputs">
      <div>
        <new-hline @newLine="addNewHline"/>
        <input
          type="button"
          value="RESET"
          @click="resetHlines()"/>
      </div>
      <div>
        <new-vline @newLine="addNewVline"/>
        <input
          type="button"
          value="RESET"
          @click="resetVlines()"/>
      </div>
    </div>
    <div class="cells">
      <table>
        <thead>
        <tr>
          <th></th>
          <th v-for="(vline, index) in vLines">
            <input type="button" value="X" v-on:click="removeColumn(index)"/>
            <input type="button" value="-100" v-on:click="$set(vLines,index, vLines[index] - 100)"/>
            {{ vline }}
            <input type="button" value="+100" v-on:click="$set(vLines,index, vLines[index] + 100)"/>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(hline, hindex) in hLines">
          <td>
            <input type="button" value="X" v-on:click="removeRow(hindex)"/>
            <input type="button" value="-100" v-on:click="$set(hLines,hindex, hLines[hindex] - 100)"/>
            {{ hline }}
            <input type="button" value="+100" v-on:click="$set(hLines,hindex, hLines[hindex] + 100)"/>
          </td>
          <template v-for="(vline, vindex) in vLines">
            <td v-if="(vindex < vLines.length - 1) && (cells[(vLines.length - 1)*hindex + vindex])">
              {{ cells[(vLines.length - 1)*hindex + vindex] }}
            </td>
            <td v-else/>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
    <img id=image />
  </div>
</template>

<script>

  import ImageWidth from './components/imageWidth'
  import ImageHeight from './components/imageHeight'
  import newHline from './components/newHline'
  import newVline from './components/newVline'

  export default {
    components: {
      ImageWidth,
      ImageHeight,
      newHline,
      newVline
    },
    computed: {
      vLinesInOrder() {
        return this.vLines.sort(function (a, b) {
          return a - b
        })
      },
      hLinesInOrder() {
        return this.hLines.sort(function (a, b) {
          return a - b
        })
      }
    },
    data() {
      return {
        width: 0, // horizontal extent of image in pixels
        height: 0, // vertical extent of image
        hLines: [], // y pixel coord of line
        vLines: [], // x pixel coord of line
        cells: [], // pixel coord of upper left, lower right - derived, e.g.[[0, 0], [100, 150]]
        line_thickness: 1,
        old_width: 0,
        old_height: 0,
      }
    },
    watch: {
      hLines: {
        handler() {
          this.computeCells()
        },
        deep: true
      },
      vLines: {
        handler() {
          this.computeCells()
        },
        deep: true
      }
    },
    mounted() {
      this.computeCells()
    },
    methods: {
      addNewHline(y) {
        this.hLines.push(y)
      },
      resetHlines() {
        this.hLines = []
      },
      addNewVline(x) {
        this.vLines.push(x)
      },
      resetVlines() {
        this.vLines = []
      },
      resizeImage() {               // if image size changes, recompute lines and cells
        if (this.old_width > 1) {   // a previous presumably valid width
          let hScale = this.width / this.old_width;
          let h = 0;
          let n = this.vLines.length;
          for (h = 0; h < n; h++) {
            this.$set(this.vLines, h, this.vLines[h] * hScale)
          }
        }
        if (this.old_height > 1) {    // a previous presumably valid height
          let vScale = this.height / this.old_height;
          let v = 0;
          let m = this.hLines.length;
          for (v = 0; v < m; v++) {
            this.$set(this.hLines, v, this.hLines[v] * vScale)
          }
        }
        this.old_width = this.width;
        this.old_height = this.height;
        this.computeCells()
      },
      removeRow(index) {
        this.$delete(this.hLines, index)
      },

      removeColumn(index) {
        this.$delete(this.vLines, index)
      },
      computeCells() {
        if ((this.hLines.length > 1) && this.vLines.length > 1) {
          // compute intersections
          this.cells = []
          let i = 0 // horizontal (column) index
          let j = 0 // vertical (row) index
          let ul, lr // upper left, lower right corners of cell
          let cellIndex = 0
          let hRows = this.hLinesInOrder.length - 1 // only enumerate non-empty cells BETWEEN lines
          let vCols = this.vLinesInOrder.length - 1 // one less populated row/column than lines
          for (j = 0; j < hRows; j++) {
            for (i = 0; i < vCols; i++) {
              cellIndex = (vCols * j) + i
              ul = [this.vLinesInOrder[i], this.hLinesInOrder[j]]
              lr = [this.vLinesInOrder[i + 1], this.hLinesInOrder[j + 1]]
              if (lr[0] !== undefined && lr[1] !== undefined) {   // non-empty cell test
                this.cells[cellIndex] = [ul, lr]
              }
            }
          }
        }
      },
      getImage(event) {
        let image = document.getElementById('image');
        let files = event.target.files;
        // FileReader support
        if (FileReader && files && files.length) {
          let file_reader = new FileReader();
          file_reader.onload = function () {
            image.src = file_reader.result;
          };
          file_reader.readAsDataURL(files[0]);
        }
          this.width = image.width;
          this.height = image.height;
          image.style = "width: 50%; height: 50%"
      }
    },
  }
</script>
<style>
  td {
    width: 330px;
    font-size: 12px;
    border: 1px solid gray;
  }
</style>
