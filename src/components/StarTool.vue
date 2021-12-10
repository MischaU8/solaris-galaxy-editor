  <template>
      <div id="star-attributes" v-if="galaxyEditor.selectedStar" >
        <div class='col-auto bg-dark'>
        <div class='row'>
          <label class='col-6 col-form-label-sm'>Infrastructure</label>
        </div>
        <div class='row'>
          <label class='col-6 col-form-label-sm'>Economy</label>
          <input class='col mr-3 form-control-sm' type='number' v-model.number='galaxyEditor.selectedStar.infrastructure.economy'/>
        </div>
        <div class='row'>
          <label class='col-6 col-form-label-sm'>Industry</label>
          <input class='col mr-3 col form-control-sm' type='number' v-model.number='galaxyEditor.selectedStar.infrastructure.industry'/>
        </div>
        <div class='row'>
          <label class='col-6 col-form-label-sm'>Science</label>
          <input class='col mr-3 form-control-sm' type='number' v-model.number='galaxyEditor.selectedStar.infrastructure.science'/>
        </div>
        <div class='row'>
          <label class='col-6 col-form-label-sm'>Natural Resources</label>
        </div>
        <div class='row'>
          <label class='col-6 col-form-label-sm'>Economy</label>
          <input class='col mr-3 form-control-sm' type='number' v-model.number='galaxyEditor.selectedStar.naturalResources.economy'/>
        </div>
        <div class='row'>
          <label class='col-6 col-form-label-sm'>Industry</label>
          <input class='col mr-3 col form-control-sm' type='number' v-model.number='galaxyEditor.selectedStar.naturalResources.industry'/>
        </div>
        <div class='row'>
          <label class='col-6 col-form-label-sm'>Science</label>
          <input class='col mr-3 form-control-sm' type='number' v-model.number='galaxyEditor.selectedStar.naturalResources.science'/>
        </div>
        <div class='row form-check form-check-inline'>
          <div class='col-6'>
            <label>Warp Gate </label>
            <input class='form-check-input' type='checkbox' v-model.number='galaxyEditor.selectedStar.warpGate'/>
          </div>
          <div class='col-6'>
            <label>Home Star </label>
            <input class='form-check-input' type='checkbox' v-model.number='galaxyEditor.selectedStar.homeStar'/>
          </div>
        </div>
        <div class='row form-check form-check-inline'>
          <div class='col-6'>
            <label>Asteroid Field</label>
            <input class='form-check-input' type='checkbox' v-model.number='galaxyEditor.selectedStar.isAsteroidField'/>
          </div>
          <div class='col-6'>
            <label>Nebula</label>
            <input class='form-check-input' type='checkbox' v-model.number='galaxyEditor.selectedStar.isNebula'/>
          </div>
        </div>
        <div class='row'>
          <select class='col mx-3' v-model.number='galaxyEditor.selectedStar.playerIndex'>
            <option value='-1'>None</option>
            <option v-for='(playerShapeAndColour,index) in playerShapeAndColours' v-bind:value='index' :key='index'>{{ playerShapeAndColour }}</option>
          </select>
        </div>
        <div class='row'>
          <select v-model.number='galaxyEditor.selectedStar.specialistId' class='col mx-3'>
            <option value='-1'>None</option>
            <option v-for='(specialist,index) in specialists' v-bind:value='specialist.id' :key='index'>{{specialist.name}}</option>
          </select>
        </div>
        <div class='row'>
          <button @click="updateStar" class='col mx-3 btn btn-warning btn-lg'>Update</button>
          <button @click="destroyStar" class='col mx-3 btn btn-danger btn-lg'>Destroy</button>
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
  }
</style>
