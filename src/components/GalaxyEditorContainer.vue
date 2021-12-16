<template>
  <div id="galaxyEditorContainer" >
    <tool-menu :galaxyEditor='galaxyEditor' v-on:change-menu='onMenuChanged'/>
    <brush-tool v-show='currentMenu==="brush"'/>
    <snapper-tool v-show='currentMenu==="snapper"'/>
    <randomizer-tool v-show='currentMenu==="randomizer"'/>
    <star-tool v-show='(galaxyEditor.selectedStar) && (currentMenu==="star")' />
    <json-tool :galaxyEditor='galaxyEditor' v-show='currentMenu==="json"'/>
    <div id="pixi-app" ref='pixiApp'/>
  </div>
</template>

<script>

import GalaxyEditor from '../editor'

import MenuVue from './Menu.vue'
import SnapperToolVue from './SnapperTool.vue'
import StarToolVue from './StarTool.vue'
import BrushToolVue from './BrushTool.vue'
import JSONToolVue from './JSONTool.vue'
import RandomizerToolVue from './RandomizerTool.vue'

export default {
  components: {
    'tool-menu': MenuVue,
    'star-tool': StarToolVue,
    'json-tool': JSONToolVue,
    'brush-tool': BrushToolVue,
    'snapper-tool': SnapperToolVue,
    'randomizer-tool': RandomizerToolVue
  },
  data () {
    return {
      galaxyEditor: GalaxyEditor,
      currentMenu: null
    }
  },

  created () {
    window.addEventListener('resize', this.handleResize)
  },

  beforeMount () {
    //this.galaxyEditor.vueContainer = this
    this.galaxyEditor.createPixiApp()
  },

  mounted () {
    this.$refs.pixiApp.appendChild(this.galaxyEditor.app.view) // Add the pixi canvas to the element.
    this.galaxyEditor.on('onStarSelected', this.onStarSelected.bind(this))
  },

  unmounted () {
    this.galaxyEditor.destroy()
  },

  beforeUnmount () {
    window.removeEventListener('resize', this.handleResize)
    clearInterval(this.polling)
  },

  methods: {
    onMenuChanged(menu) {
      this.galaxyEditor.onMenuChanged()
      if(this.currentMenu === menu) {
        this.currentMenu = null
        return
      }
      this.currentMenu = menu
    },
    onStarSelected() {
      this.currentMenu = 'star'
    },
    //TODO
    handleResize (e) {
      if(e){console.log()}
      this.galaxyEditor.onResized()
    }
  }
}
</script>

<style scoped>
#pixi-app {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
#galaxyEditorContainer {
  color: white;
}
</style>
