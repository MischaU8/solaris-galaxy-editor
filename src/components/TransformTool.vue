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
      <div class='row'>
        <div class='col'>
          <p>The <i>pivot</i> for rotations/flips and the <i>anchor</i> for moving is the last clicked star. This star will not be duplicated, even when <i>Copy and rotatate/flip</i> are selected.</p>
          <p>It is advised to backup the galaxy using the JSON tool and saving it to a plain text file before applying these operations.</p>
          <p>The <i>repeat</i> option for rotation will repeat and copy the result until a full circle is filled</p>
          <p>It is good practice to center the galaxy on the origin after the galaxy is finished.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import GalaxyEditor from '../editor'
var vec2 = require('vec2')

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
      let stars = this.galaxyEditor.stars
      let pivot = new vec2(this.galaxyEditor.lastSelectedStar.location.x, this.galaxyEditor.lastSelectedStar.location.y)
      if( this.copyAndRotate ) {
        let iterations = 1
        if( this.rotateRepeat ) { iterations = this.rotateFraction-1 }
        let initialLength = stars.length //keep this outside of the while loop
        while(iterations > 0) {
          let angle = (2.0*Math.PI/this.rotateFraction) * iterations
          //iterate using the array length,since the array will grow with new stars
          for(let index = 0; index < initialLength; index+=1) {
            let star = stars[index]
            if( !(star == this.galaxyEditor.lastSelectedStar) ) {
              let starRelativePosition = new vec2(star.location.x-pivot.x, star.location.y-pivot.y)
              let rotatedOnOrigin = starRelativePosition.rotate(angle, true, true)
              let newLocation = { x: rotatedOnOrigin.x+pivot.x, y: rotatedOnOrigin.y+pivot.y }

              this.galaxyEditor.copyStar(star, newLocation)
            }
          }
          iterations -= 1
        }
      }
      else {
        for(let star of stars) {
          let angle = (2.0*Math.PI/this.rotateFraction)
          let starRelativePosition = new vec2(star.location.x-pivot.x, star.location.y-pivot.y)
          let rotatedOnOrigin = starRelativePosition.rotate(angle, true, true)
          star.location.x = pivot.x+rotatedOnOrigin.x
          star.location.y = pivot.y+rotatedOnOrigin.y
          star.updatePosition()
        }
      }
      console.log(this.rotateRepeat)
    },
    flipYGalaxy() {
      let pivot = new vec2(this.galaxyEditor.lastSelectedStar.location.x, this.galaxyEditor.lastSelectedStar.location.y)
      let stars = this.galaxyEditor.stars
      if( this.copyAndFlipY ){
        //iterate using the array length,since the array will grow with new stars
        let initialLength = stars.length
        for(let index = 0; index < initialLength; index+=1) {
          let star = stars[index]
          if( !(star == this.galaxyEditor.lastSelectedStar) ) {
            let delta = pivot.y-star.location.y
            let newY = pivot.y+delta
            let newLocation = { x: star.location.x, y: newY }
            this.galaxyEditor.copyStar(star, newLocation)
          }
        }
      }
      else {
        for(let star of stars) {
          let delta = pivot.y-star.location.y
          star.location.y = pivot.y+delta
          star.updatePosition()
        }
      }
    },
    flipXGalaxy() {
      let pivot = new vec2(this.galaxyEditor.lastSelectedStar.location.x, this.galaxyEditor.lastSelectedStar.location.y)
      let stars = this.galaxyEditor.stars
      if( this.copyAndFlipX ){
        //iterate using the array length,since the array will grow with new stars
        let initialLength = stars.length
        for(let index = 0; index < initialLength; index+=1) {
          let star = stars[index]
          if( !(star == this.galaxyEditor.lastSelectedStar) ) {
            let delta = pivot.x-star.location.x
            let newX = pivot.x+delta
            let newLocation = { x: newX, y: star.location.y }
            this.galaxyEditor.copyStar(star, newLocation)
          }
        }
      }
      else {
        for(let star of stars) {
          let delta = pivot.x-star.location.x
          star.location.x = pivot.x+delta
          star.updatePosition()
        }
      }
    },
    scaleGalaxy() {
      let stars = this.galaxyEditor.stars
      for(let star of stars) {
        star.location.x *= this.scaleMultiplier
        star.location.y *= this.scaleMultiplier
        star.updatePosition()
      }
    },
    centralizeGalaxy() {
      let stars = this.galaxyEditor.stars
      let center = this.galaxyEditor.getGalaxyCenter()
      for(let star of stars) {
        star.location.x -= center.x
        star.location.y -= center.y
        star.updatePosition()
      }
    },
    moveToOrigin() {
      let delta = new vec2(this.galaxyEditor.lastSelectedStar.location.x, this.galaxyEditor.lastSelectedStar.location.y)
      let stars = this.galaxyEditor.stars
      for(let star of stars) {
        star.location.x -= delta.x
        star.location.y -= delta.y
        star.updatePosition()
      }
    },
  }
}
</script>

<style>
  #transform-tools {
    position: absolute;
    width: 25%;
    height: 80%; overflow-y: scroll;
  }
  .v-center-range {
    margin-top: 8px;
  }
</style>
