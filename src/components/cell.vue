<template>
  <div :style="style">
    <select
      class="cell-select"
      v-if="!checked"
      v-model="cell.metadata"
      style="position: absolute; top:50%; left: 50%; transform: translate(-50%, -50%)"
      @change="$emit('onChange', cell)">
      <option :value="null">
        Select metadata
      </option>
      <option
        v-for="(value, key) in metadata"
        :key="key"
        :value="key">
        {{ value }}
      </option>
    </select>
    <input
      v-model="checked"
      @change="setCheckbox"
      :disabled="locked"
      class="cell-checkbox"
      style="position: absolute; right: 10px; bottom: 10px;"
      type="checkbox">
  </div>
</template>

<script>
export default {
  props: {
    cell: {
      type: Object,
      required: true
    },
    metadata: {
      type: Object,
      default: undefined
    },
    scale: {
      type: Number,
      default: 1
    },
    locked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style () {
      return {
        position: 'absolute',
        top: `${(this.cell.upperCorner.y / this.scale) + this.margin}px`,
        left: `${(this.cell.upperCorner.x / this.scale) + this.margin}px`,
        width: `${((this.cell.lowerCorner.x - this.cell.upperCorner.x) / this.scale) - this.margin * 2}px`,
        height: `${((this.cell.lowerCorner.y - this.cell.upperCorner.y) / this.scale) - this.margin * 2}px`,
        'z-index': 2
      }
    }
  },
  data () {
    return {
      margin: 5,
      checked: true
    }
  },
  watch: {
    checked(newVal) {
      if(newVal) {
        this.cell.metadata = null
      }
    }
  },
  methods: {
    setCheckbox () {
      if(this.checked) {
        this.cell.metadata = null
      }
      this.$emit('onChange', this.cell)
    }
  }
}
</script>
