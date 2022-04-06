<template>
  <div id="snapper-tool" class=''>
    <div class='container'>
      <div class='row'>
        <div class='col'>
          <label class='col-form-label'>Snap Step Distance</label>
        </div>
        <div class='col-6'>
          <input class='form-control' type="number" v-model.number='snapStepDistance'/>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <label class='col-form-label'>Snap Step Angle</label>
        </div>
        <div class='col-6'>
          <input type="number" class='form-control' v-model.number='snapStepAngle'/>
        </div>
      </div>

      <br/>

      <div class='row'>
        <div class='col'>
          <p>Hold <i class='text-success'>Control</i> to snap the cursor at precise angles and distances. Hold <i class='text-success'>Shift</i> to snap the cursor to precise distances.</p>
          <p><i class='text-info'>Snap Step Angle</i> controls how many steps a circle is divided. <i class='text-info'>Snap Step Distance</i> controls the snap distance from the pivot.</p>
          <p>The <i>pivot</i> for snaping is the last star you placed, or the last star you clicked.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var vec2 = require('vec2')
  import * as PIXI from 'pixi.js-legacy'
  import GalaxyEditor from '../editor'
  import TextureService from '../texture'

  export default {
    data () {
      return {
        galaxyEditor: GalaxyEditor,
        lastClickPosition: { x: 0.0, y: 0.0 },
        snapStepDistance: 1,
        snapStepAngle: 6,
        keyPressed: { Shift: false, Control: false }
      }
    },
    methods: {
      onNothingClicked(position) {
        this.lastClickPosition = position
      },
      onStarSelected() {
        this.lastClickPosition = this.galaxyEditor.selectedStar.location
      },
      onKeyDown(e) {
        let key = e.key
        if( ( key === 'Shift' )  || ( key === 'Control' ) ) {
          this.keyPressed[key] = true
        }
      },
      onKeyUp(e) {
        let key = e.key
        if( ( key === 'Shift' )  || ( key === 'Control' ) ) {
          this.keyPressed[key] = false
        }
      },
      onPixiTick(delta)  {
        if(delta) { delta = 1 }
        let mousePosition = this.pixiApp.renderer.plugins.interaction.mouse.global
        let snapTo = this.galaxyEditor.viewport.toWorld(mousePosition)
        let worldMousePosition = new vec2(snapTo.x, snapTo.y)
        let mouseRelativePosition = new vec2(worldMousePosition.x-this.lastClickPosition.x, worldMousePosition.y-this.lastClickPosition.y)
        let xBasis = new vec2(1.0, 0.0)
        let angle = mouseRelativePosition.angleTo(xBasis)
        if( this.keyPressed['Control'] ) {
          angle = angle / ( (Math.PI)/(this.snapStepAngle/2.0))
          angle = Math.round(angle) * (Math.PI/(this.snapStepAngle/2.0))
        }
        let snappedPosition = xBasis.rotate(angle, true, true)
        snappedPosition.multiply(this.snapStepDistance*50, false)
        snappedPosition.x += this.lastClickPosition.x
        snappedPosition.y += this.lastClickPosition.y
        this.snapToSprite.position = snappedPosition
        this.snapToSprite.visible = ( (this.keyPressed['Control']) || (this.keyPressed['Shift']) ) ? true : false
        this.galaxyEditor.cursor = ( (this.keyPressed['Control']) || (this.keyPressed['Shift']) ) ? snappedPosition : worldMousePosition
      }
    },
    beforeMount() {
      this.galaxyEditor = GalaxyEditor
      document.addEventListener('keydown', this.onKeyDown)
      document.addEventListener('keyup', this.onKeyUp)
    },
    mounted () {
      this.galaxyEditor.on('onNothingClicked', this.onNothingClicked.bind(this))
      this.galaxyEditor.on('onStarSelected', this.onStarSelected.bind(this))
      this.pixiApp = this.galaxyEditor.app
      this.snapToSprite = new PIXI.Sprite(TextureService.STAR_SYMBOLS['scannable'])
      this.snapToSprite.width = 6.0
      this.snapToSprite.height = 6.0
      this.snapToSprite.anchor.set(0.5)
      this.snapToSprite.tint = 0x808080
      this.galaxyEditor.viewport.addChild(this.snapToSprite)
      this.pixiApp.ticker.add( this.onPixiTick.bind(this) )
    }
  }

</script>

<style>
  #snapper-tool {
    position: absolute;
    width: 25%;
  }
</style>
