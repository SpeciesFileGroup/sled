<template>
  <div>
    <label>Enter image width</label>
    <input
      type="number"
      v-model.number="width" v-on:change="resizeImage" />
    <input type="button" value="+ 100" v-on:click="wAdd100" />
    <input type="button" value="- 100" v-on:click="wSub100" />

  </div>
</template>
