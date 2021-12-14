<template>
  <div id="brush-tool" class='container'>
    <div class='row'>
      <div class='col'>
        <div class='row'>
        <label class='col'>Brush Radius</label>
        <input class='col form-control' type="number" v-model.number='galaxyEditor.brushOptions.brushRadius'/>
        </div>
      </div>
      <div class='col'>
        <div class='row'>
        <label class='col'>Star Amount</label>
        <input type="number" class='col form-control' v-model.number='galaxyEditor.brushOptions.starAmount'/>
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
</style>
