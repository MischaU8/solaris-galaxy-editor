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
          <p>Click to place stars. If <i class='text-info'>Star Amount</i> is 1, the star will be placed precisely at the cursor position, otherwise, multiple stars will be placed within <i class='text-info'>Brush Radius</i></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GalaxyEditor from '../editor'

export default {
  data () {
    return {
      galaxyEditor: GalaxyEditor
    }
  },
}
</script>

<style>
  #brush-tool {
    position: absolute;
    width: 25%;
  }
</style>
