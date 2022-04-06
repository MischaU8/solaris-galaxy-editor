<template>
  <div id="brush-tool" class=''>
    <div class='container'>
      <div class='row'>
        <div class='col'>
          <label class='col-form-label'>Brush Radius</label>
        </div>
        <div class='col-6'>
          <input class='form-control' type="number" v-model.number='galaxyEditor.brushOptions.brushRadius'/>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <label for='star-amount' class='col-form-label'>Star Amount</label>
        </div>
        <div class='col-6'>
          <input id='star-amount' class='form-control' type="number" v-model.number='galaxyEditor.brushOptions.starAmount'/>
        </div>
      </div>

      <br/>

      <div class='row'>
        <div class='col'>
          <p><i class='text-success'>Left Click</i> to place stars and <i class='text-success'>Right Click</i> to delete them. If <i class='text-info'>Star Amount</i> is 1, the star will be placed precisely at the cursor position, otherwise, multiple stars will be placed within <i class='text-info'>Brush Radius</i></p>
          <p><i class='text-success'>Right Clicking</i> a star will only delete the star under the cursor.</p> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GalaxyEditor from '../editor'
import * as PIXI from 'pixi.js-legacy'

export default {
  data () {
    return {
      galaxyEditor: GalaxyEditor
    }
  },
  methods: {
    onPixiTick(delta)  {
      if(delta) { delta = 1 }
      if(this.galaxyEditor.brushOptions.brushRadius !== this.lastSize) {
        this.updateBrushVisualizer()
      }
      this.lastSize = this.galaxyEditor.brushOptions.brushRadius
      this.brushRadiusVisualizer.position = this.galaxyEditor.cursor
    },
    updateBrushVisualizer() {
      this.brushRadiusVisualizer.clear()
      this.brushRadiusVisualizer.lineStyle(2.0, 0xffffff, 1.0)
      this.brushRadiusVisualizer.drawCircle(0,0,this.galaxyEditor.brushOptions.brushRadius*50)
      this.galaxyEditor.viewport.addChild(this.brushRadiusVisualizer)
    }
  },
  beforeMount() {
    this.galaxyEditor = GalaxyEditor
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  },
  mounted () {
    this.brushRadiusVisualizer = new PIXI.Graphics()
    this.lastSize = this.galaxyEditor.brushOptions.brushRadius
    this.pixiApp = this.galaxyEditor.app
    this.updateBrushVisualizer()
    this.pixiApp.ticker.add( this.onPixiTick.bind(this) )
  }
}
</script>

<style>
  #brush-tool {
    position: absolute;
    width: 25%;
  }
</style>
