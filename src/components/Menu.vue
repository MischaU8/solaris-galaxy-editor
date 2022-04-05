<template>
  <div id="tool-menus" class=''>
    <div class='btn-group-vertical'>
      <button @click="$emit('change-menu','brush')" class='btn btn-primary'>Brush</button>
      <button @click="$emit('change-menu','snapper')" class='btn btn-primary'>Snap</button>
      <button @click="$emit('change-menu','randomizer')" class='btn btn-primary'>Randomizers</button>
      <button @click="$emit('change-menu','transform')" class='btn btn-primary'>Transform</button>
      <button @click="$emit('change-menu','json')" class='btn btn-primary'>JSON</button>
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
