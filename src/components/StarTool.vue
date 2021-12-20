<template>
  <div id="star-attributes" v-if="galaxyEditor.selectedStar" >
    <div class='container'>
      <div class='row'>
        <label class='col-6 col-form-label'>Infrastructure</label>
      </div>
      <div class='row'>
        <div class='col'>
          <label class='col-form-label'>Economy</label>
        </div>
        <div class='col-6'>
          <input class='form-control' type='number' v-model.number='galaxyEditor.selectedStar.infrastructure.economy'/>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <label class='col-form-label'>Industry</label>
        </div>
        <div class='col-6'>
          <input class='form-control' type='number' v-model.number='galaxyEditor.selectedStar.infrastructure.industry'/>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <label class='col-form-label'>Science</label>
        </div>
        <div class='col-6'>
          <input class='form-control' type='number' v-model.number='galaxyEditor.selectedStar.infrastructure.science'/>
        </div>
      </div>

      <br/>

      <div class='row'>
        <label class='col-6 col-form-label'>Natural Resources</label>
      </div>
      <div class='row'>
        <div class='col'>
          <label class='col-form-label'>Economy</label>
        </div>
        <div class='col-6'>
          <input class='form-control' type='number' v-model.number='galaxyEditor.selectedStar.naturalResources.economy'/>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <label class='col-form-label'>Industry</label>
        </div>
        <div class='col-6'>
          <input class='form-control' type='number' v-model.number='galaxyEditor.selectedStar.naturalResources.industry'/>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <label class='col-form-label'>Science</label>
        </div>
        <div class='col-6'>
          <input class='form-control' type='number' v-model.number='galaxyEditor.selectedStar.naturalResources.science'/>
        </div>
      </div>

      <br/>

      <div class='row'>
        <div class='col-6'>
          <label class='col-form-label'>Warp Gate</label>
        </div>
        <div class='col-6'>
          <input class='form-check-input' type='checkbox' v-model='galaxyEditor.selectedStar.warpGate'/>
        </div>
      </div>
      <div class='row'>
        <div class='col-6'>
          <label class='col-form-label'>Home Star</label>
        </div>
        <div class='col-6'>
          <input class='form-check-input' type='checkbox' v-model='galaxyEditor.selectedStar.homeStar'/>
        </div>
      </div>
      <div class='row'>
        <div class='col-6'>
          <label class='col-form-label'>Asteroid Field</label>
        </div>
        <div class='col-6'>
          <input class='form-check-input' type='checkbox' v-model='galaxyEditor.selectedStar.isAsteroidField'/>
        </div>
      </div>
      <div class='row'>
        <div class='col-6'>
          <label class='col-form-label'>Nebula</label>
        </div>
        <div class='col-6'>
          <input class='form-check-input' type='checkbox' v-model='galaxyEditor.selectedStar.isNebula'/>
        </div>
      </div>
      <div class='row'>
        <div class='col-6'>
          <label class='col-form-label'>Black Hole</label>
        </div>
        <div class='col-6'>
          <input class='form-check-input' type='checkbox' v-model='galaxyEditor.selectedStar.isBlackHole'/>
        </div>
      </div>

      <br/>

      <div class='row'>
        <div class='col-6'>
          <label class='col-form-label'>Player</label>
        </div>
        <div class='col-6'>
          <select class='form-select' v-model.number='galaxyEditor.selectedStar.playerId'>
            <option value='-1'>None</option>
            <option v-for='(playerShapeAndColour,index) in playerShapeAndColours' v-bind:value='index' :key='index'>{{ playerShapeAndColour }}</option>
          </select>
        </div>
      </div>
      <div class='row'>
        <div class='col-6'>
          <label class='col-form-label'>Specialist</label>
        </div>
        <div class='col-6'>
          <select class='form-select' v-model.number='galaxyEditor.selectedStar.specialistId'>
            <option value='-1'>None</option>
            <option v-for='(specialist,index) in specialists' v-bind:value='specialist.id' :key='index'>{{specialist.name}}</option>
          </select>
        </div>
      </div>
      
      <br/>

      <div class='row'>
        <div class='col-6'>
          <button @click="updateStar" class='col-12 btn btn-warning'>Update</button>
        </div>
        <div class='col-6'>
          <button @click="destroyStar" class='col-12 btn btn-danger'>Destroy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GalaxyEditor from '../editor'
  export default {
    data() {
      return {
        galaxyEditor: GalaxyEditor
      }
    },
    methods: {
      updateStar() {
        this.galaxyEditor.updateSelected()
      },
      destroyStar() {
        this.galaxyEditor.destroySelected()
      },
      updateSpecialistID(id) {
        this.galaxyEditor.selectedStar.specialistId = id
      }
    },
    computed: {
      specialists() {
        return this.galaxyEditor.specialists
      },
      playerShapeAndColours() {
        return this.galaxyEditor.playerShapeAndColours
      }
    }
  }
</script>

<style>
  #star-attributes {
    position: absolute;
    width: 25%;
  }
</style>
