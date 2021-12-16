<template>
  <div id="tool-menus" class='container'>
    <div class='row'>
      <button @click="$emit('change-menu','brush')" class='col mx-3 btn btn-warning btn-lg'>Brush</button>
    </div>
    <div class='row'>
      <button @click="$emit('change-menu','snapper')" class='col mx-3 btn btn-warning btn-lg'>Snap</button>
    </div>
    <div class='row'>
      <button @click="$emit('change-menu','randomizer')" class='col mx-3 btn btn-warning btn-lg'>Randomizers</button>
    </div>
    <div class='row'>
      <button @click="$emit('change-menu','json')" class='col mx-3 btn btn-warning btn-lg'>JSON</button>
    </div>
  </div>
</template>

<script>
import GalaxyEditor from '../editor'

export default {
  data () {
    return {
      galaxyEditor: GalaxyEditor,
    }
  },
}
</script>

<style>
  #tool-menus {
    position: absolute;
    right: 0px;
  }
</style>
