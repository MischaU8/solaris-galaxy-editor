<template>
  <div id="JSON-tools">
    <div class='container ' style='height: 100%;'>
      <div class='row'>
        <div class='col-6'>
          <button @click="loadFromJSON" class='col-12 btn btn-primary'>Load from JSON <i class="fa fa-chevron-up"/></button>
        </div>
        <div class='col-6'>
          <button @click="generateJSON" class='col-12 btn btn-primary'><i class="fa fa-chevron-down"></i> Generate JSON</button>
        </div>
      </div>

      <br/>

      <div class='row' style='height: 100%;'>
        <div class='col-12' style='height: 100%;'>
          <textarea class='col-12' v-model="customJSON" style='height: 100%;'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    galaxyEditor: Object
  },
  data () {
    return {
      customJSON: ""
    }
  },
  methods: {
    generateJSON() {
      this.customJSON = this.galaxyEditor.generateJSON()
    },
    loadFromJSON() {
      this.galaxyEditor.loadFromJSON(this.customJSON)
    }
  }
 
}
</script>

<style>
  #JSON-tools {
    position: absolute;
    width: 25%;
    height: 80%;
  }
</style>
