<template>
  <div id="sled_test">
    <h1>SLED test page</h1>

    <input
      type="file"
      @change="getImage"
    />
    <div class="image-inputs">
      <br />
      <label>Width</label>
      <input
        type="number"
        disabled="true"
        v-model.number="width"
      />
      <br />
      <label>Height</label>
      <input
        type="number"
        disabled="true"
        v-model.number="height"
      />
    </div>
    <br />
    <label>
      Autosize
      <input
        v-model="autosize"
        type="checkbox"
      />
    </label>
    <br />
    <label>Set image divisor</label>
    <input
      type="number"
      v-model.number="scale"
    />
    <br />
    <label>Set line thickness</label>
    <input
      type="number"
      v-model.number="lineWeight"
    />

    <div class="line-inputs">
      <div>
        <NewLine
          label="Add new vertical line"
          @reset="resetVlines"
          @newLine="addNewVline"
        />
      </div>
      <div>
        <NewLine
          label="Add new horizontal line"
          @reset="resetHlines"
          @newLine="addNewHline"
        />
      </div>
      <div>
        <input
          type="button"
          value="Equalize cells"
          @click="sledRef.equalizeLines()"
        />
      </div>
    </div>
    <div class="cells">
      <table>
        <thead>
          <tr>
            <th>
              Move grid X:
              <input
                type="button"
                value="-100"
                size="4"
                v-on:click="sledRef.moveX(-100)"
              />
              <input
                type="button"
                value="-25"
                size="4"
                v-on:click="sledRef.moveX(-25)"
              />
              <input
                type="button"
                value="-1"
                size="4"
                v-on:click="sledRef.moveX(-1)"
              />
              <input
                type="button"
                value="+1"
                size="4"
                v-on:click="sledRef.moveX(1)"
              />
              <input
                type="button"
                value="+25"
                size="4"
                v-on:click="sledRef.moveX(25)"
              />
              <input
                type="button"
                value="+100"
                size="4"
                v-on:click="sledRef.moveX(100)"
              />
              <br />
              Move grid Y:
              <input
                type="button"
                value="-100"
                v-on:click="sledRef.moveY(-100)"
              />
              <input
                type="button"
                value="-25"
                v-on:click="sledRef.moveY(-25)"
              />
              <input
                type="button"
                value="-1"
                v-on:click="sledRef.moveY(-1)"
              />
              <input
                type="button"
                value="+1"
                v-on:click="sledRef.moveY(1)"
              />
              <input
                type="button"
                value="+25"
                v-on:click="sledRef.moveY(25)"
              />
              <input
                type="button"
                value="+100"
                v-on:click="sledRef.moveY(100)"
              />
            </th>
            <th
              v-for="(vline, index) in vLines"
              :key="index"
            >
              <input
                type="button"
                value="-100"
                v-on:click="sledRef.moveV(index, -100)"
              />
              <input
                type="button"
                value="-25"
                v-on:click="sledRef.moveV(index, -25)"
              />
              <input
                type="button"
                value="-1"
                v-on:click="sledRef.moveV(index, -1)"
              />
              <input
                type="button"
                value="X"
                v-on:click="removeColumn(index)"
              />
              {{ vline }}
              <input
                type="button"
                value="+1"
                v-on:click="sledRef.moveV(index, 1)"
              />
              <input
                type="button"
                value="+25"
                v-on:click="sledRef.moveV(index, 25)"
              />
              <input
                type="button"
                value="+100"
                v-on:click="sledRef.moveV(index, 100)"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(hline, hindex) in hLines"
            :key="hindex"
          >
            <td>
              <input
                type="button"
                value="-100"
                v-on:click="sledRef.moveH(hindex, -100)"
              />
              <input
                type="button"
                value="-25"
                v-on:click="sledRef.moveH(hindex, -25)"
              />
              <input
                type="button"
                value="-1"
                v-on:click="sledRef.moveH(hindex, -1)"
              />
              <input
                type="button"
                value="X"
                v-on:click="removeRow(hindex)"
              />
              {{ hline }}
              <input
                type="button"
                value="+1"
                v-on:click="sledRef.moveH(hindex, 1)"
              />
              <input
                type="button"
                value="+25"
                v-on:click="sledRef.moveH(hindex, 25)"
              />
              <input
                type="button"
                value="+100"
                v-on:click="sledRef.moveH(hindex, 100)"
              />
            </td>
            <td
              v-for="(vline, vindex) in vLines"
              :key="vindex"
            >
              <template
                v-if="
                  vindex < vLines.length - 1 &&
                  cells[(vLines.length - 1) * hindex + vindex]
                "
              >
                {{ cells[(vLines.length - 1) * hindex + vindex] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="test">
      <SledComponent
        class="test"
        ref="sledRef"
        v-model:vertical-lines="vLines"
        v-model:horizontal-lines="hLines"
        :image-width="width"
        :image-height="height"
        :line-weight="lineWeight"
        :autosize="autosize"
        :file-image="fileImage"
        :metadata-assignment="metadata"
        @onComputeCells="cells = $event"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SledComponent from '../components/Sled.vue'
import NewLine from './NewLine.vue'

const sledRef = ref()
const width = ref(0)
const height = ref(0)
const scale = ref(1)
const vLines = ref([0, 100, 200])
const hLines = ref([0, 150, 250])
const lineWeight = ref(4)
const autosize = ref(true)
const cells = ref([])
const fileImage = ref(null)
const metadata = ref({
  foo: 'Test',
  bar: 'Another test'
})

function getImage(event) {
  const files = event.target.files

  // FileReader support
  if (FileReader && files && files.length) {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const newImage = new Image()
      newImage.src = fileReader.result
      newImage.onload = () => {
        width.value = newImage.width
        height.value = newImage.height
        fileImage.value = fileReader.result
      }
    }
    fileReader.readAsDataURL(files[0])
  }
}

function addNewHline(y) {
  hLines.value.push(y)
}

function resetHlines() {
  hLines.value = []
}

function addNewVline(x) {
  vLines.value.push(x)
}

function resetVlines() {
  vLines.value = []
}

function removeRow(index) {
  hLines.value.splice(index, 1)
}

function removeColumn(index) {
  vLines.value.splice(index, 1)
}
</script>

<style scoped>
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
