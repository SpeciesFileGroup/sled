<template>
  <div :style="style">
    <select
      class="cell-select"
      v-if="!checked"
      v-model="cell.metadata"
      @change="$emit('onChange', cell)">
      <option :value="undefined">
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
      class="cell-checkbox"
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
    }
  },
  computed: {
    style () {
      return {
        position: 'absolute',
        top: `${(this.cell.cornerUpper.y / this.scale) + this.margin}px`,
        left: `${(this.cell.cornerUpper.x / this.scale) + this.margin}px`,
        width: `${(this.cell.cornerLower.x / this.scale) - (this.cell.cornerUpper.x / this.scale) - this.margin * 2}px`,
        height: `${(this.cell.cornerLower.y / this.scale) - (this.cell.cornerUpper.y / this.scale) - this.margin * 2}px`,
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
        this.cell.metadata = undefined
      }
    }
  },
  methods: {
    setCheckbox () {
      if(this.checked) {
        this.cell.metadata = undefined
      }
      this.$emit('onChange', this.cell)
    }
  }
}
</script>

<style scoped>
  .cell-checkbox {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .cell-select {
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
</style>
