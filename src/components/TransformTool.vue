<template>
  <div id="transform-tools" class=''>
    <div class='container'>

        <div class='row'>
          <div class='col-6'>
            <label class='col-form-label'>Centralize on Origin</label>
          </div>
          <div class='col-6'>
            <button @click="centralizeGalaxy" class='btn btn-primary col-12'><i class="fa fa-chevron-down"></i>Centralize</button>
          </div>
        </div>

        <br/>
        <hr/>

        <div class='row'>
          <div class='col-6'>
            <label class='col-form-label'>Move to Origin</label>
          </div>
          <div class='col-6'>
            <button @click="moveToOrigin" class='btn btn-primary col-12'><i class="fa fa-chevron-down"></i>Move</button>
          </div>
        </div>

        <br/>
        <hr/>

        <div class='row'>
          <div class='col-6'>
            <label class='col-form-label'>Scale</label>
          </div>
        </div>
        <div class='row'>
          <div class='col-6'>
            <input class='form-control' type="number" v-model.number='scaleMultiplier'/>
          </div>
          <div class='col-6'>
            <button @click="scaleGalaxy" class='btn btn-primary col-12'><i class="fa fa-chevron-down"></i>Apply Scale</button>
          </div>
        </div>

        <br/>
        <hr/>

        <div class='row'>
          <div class='col-6'>
            <label class='col-form-label'>Rotate</label>
          </div>
        </div>
        <div class='row'>
          <div class='col-5'>
            <label class='col-form-label'>Copy and Rotate</label>
          </div>
          <div class='col-1'>
            <input class='form-check-input' type='checkbox' v-model='copyAndRotate'/>
          </div>
          <div class='col-5'>
            <label class='col-form-label'>Repeat</label>
          </div>
          <div class='col-1'>
            <input class='form-check-input' type='checkbox' v-model='rotateRepeat'/>
          </div>
        </div>
        <div class='row'>
          <div class='col-6'>
            <label class='col-form-label'>Fraction of a full rotation</label>
          </div>
        </div>
        <div class='row'>
          <div class='col-6'>
            <input class='form-control' type="number" v-model.number='rotateFraction'/>
          </div>
          <div class='col-6'>
            <button @click="rotateGalaxy" class='btn btn-primary col-12'><i class="fa fa-chevron-down"></i>Apply Rotation</button>
          </div>
        </div>

        <br/>
        <hr/>

        <div class='row'>
          <div class='col-6'>
            <label class='col-form-label'>Flip X</label>
          </div>
        </div>
        <div class='row'>
          <div class='col-5'>
            <label class='col-form-label'>Copy and Flip</label>
          </div>
          <div class='col-1'>
            <input class='form-check-input' type='checkbox' v-model='copyAndFlipX'/>
          </div>
          <div class='col-6'>
            <button @click="flipXGalaxy" class='btn btn-primary col-12'><i class="fa fa-chevron-down"></i>Apply Flip</button>
          </div>
        </div>

        <br/>
        <hr/>

        <div class='row'>
          <div class='col-6'>
            <label class='col-form-label'>Flip Y</label>
          </div>
        </div>
        <div class='row'>
          <div class='col-5'>
            <label class='col-form-label'>Copy and Flip</label>
          </div>
          <div class='col-1'>
            <input class='form-check-input' type='checkbox' v-model='copyAndFlipY'/>
          </div>
          <div class='col-6'>
            <button @click="flipYGalaxy" class='btn btn-primary col-12'><i class="fa fa-chevron-down"></i>Apply Flip</button>
          </div>
        </div>


      <br/>
      <br/>

    </div>
  </div>
</template>

<script>
import GalaxyEditor from '../editor'

export default {
  data () {
    return {
      galaxyEditor: GalaxyEditor,
      copyAndFlipX: false,
      copyAndFlipY: false,
      copyAndRotate: false,
      rotateRepeat: false,
      rotateFraction: 2,
      scaleMultiplier: 1,
    }
  },
  methods: {
    rotateGalaxy() {
      console.log('rotate clicked')
      console.log(this.copyAndRotate)
      console.log(this.rotateRepeat)
      console.log(this.rotateFraction)
    },
    flipYGalaxy() {
      console.log('flipY clicked')
      console.log(this.copyAndFlipY)
    },
    flipXGalaxy() {
      console.log('flipX clicked')
      console.log(this.copyAndFlipX)
    },
    scaleGalaxy() {
      console.log('scale clicked')
      console.log(this.scaleMultiplier)
    },
    centralizeGalaxy() {
      console.log('centralize clicked')
    },
    moveToOrigin() {
      console.log('move origin clicked')
    },
    randomizeResources() {
      let stars = this.galaxyEditor.stars
      for(let star of stars) {
        let resourceRange = this.resourcesAllRange.max-this.resourcesAllRange.min
        let resourceValue = Math.floor(this.resourcesAllRange.min+this.resourcesRange.economy.min+resourceRange*Math.random())
        star.naturalResources.economy = resourceValue
        star.naturalResources.industry = resourceValue
        star.naturalResources.science = resourceValue
        star._updateNaturalResourcesText()
      }
    },
  }
}
</script>

<style>
  #transform-tools {
    position: absolute;
    left: 256px;
    width: 25%;
  }
  .v-center-range {
    margin-top: 8px;
  }
</style>
