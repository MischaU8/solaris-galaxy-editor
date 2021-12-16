<template>
  <div id="randomizer-tools" class='container'>
    <div class='row'>
      <div class='col'>
        <div class='row'>
        <label class='col'>Position Range</label>
        <input class='col form-control' type="number" v-model.number='positionRange.min'/>
        <input class='col form-control' type="number" v-model.number='positionRange.max'/>
        <button @click="randomizePositions" class='col mx-3 btn btn-success btn-lg mb-3 '><i class="fa fa-chevron-down"></i> Randomize Positions</button>
        </div>
      </div>
      <div class='col'>
        <div class='row'>
          <label class='col'>Resources Range</label>
        </div>
        <div class='row'>
          <label class='col'>Split Resources</label>
          <input class='form-check-input' type='checkbox' v-model='splitResources'/>
          <button @click="randomizeResources" class='col mx-3 btn btn-success btn-lg mb-3 '><i class="fa fa-chevron-down"></i> Randomize Resources</button>
        </div>
        <div class='row'>
          <div class='col'>
            <label class='col'>Economy</label>
            <input class='col form-control' type="number" v-model.number='resourcesRange.economy.min'/>
            <input class='col form-control' type="number" v-model.number='resourcesRange.economy.max'/>
            <button @click="randomizeResourceEconomy" class='col mx-3 btn btn-success btn-lg mb-3 '><i class="fa fa-chevron-down"></i> Randomize</button>
          </div>
          <div class='col'>
            <label class='col'>Industrye</label>
            <input class='col form-control' type="number" v-model.number='resourcesRange.industry.min'/>
            <input class='col form-control' type="number" v-model.number='resourcesRange.industry.max'/>
            <button @click="randomizeResourceIndustry" class='col mx-3 btn btn-success btn-lg mb-3 '><i class="fa fa-chevron-down"></i> Randomize</button>
          </div>
          <div class='col'>
            <label class='col'>Science</label>
            <input class='col form-control' type="number" v-model.number='resourcesRange.science.min'/>
            <input class='col form-control' type="number" v-model.number='resourcesRange.science.max'/>
            <button @click="randomizeResourceScience" class='col mx-3 btn btn-success btn-lg mb-3 '><i class="fa fa-chevron-down"></i> Randomize</button>
          </div>
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
      galaxyEditor: GalaxyEditor,
      positionRange: { min: 0.0, max: 0.125 },
      resourcesRange: {
        economy: { min: 0, max: 100 },
        industry: { min: 0, max: 100 },
        science: { min: 0, max: 100 }
      },
      splitResources: false
    }
  },
  methods: {
    randomizePositions() {
      let stars = this.galaxyEditor.stars
      for(let star of stars) {
        let posRange = this.positionRange.max-this.positionRange.min
        let xOffset = (2.0*Math.random()-1.0)*posRange*50.0
        let yOffset = (2.0*Math.random()-1.0)*posRange*50.0
        star.location.x += xOffset+(Math.sign(xOffset)*this.positionRange.min*50.0)
        star.location.y += yOffset+(Math.sign(yOffset)*this.positionRange.min*50.0)
        star.updatePosition()
      }
    },
    randomizeResourceEconomy() {
      let stars = this.galaxyEditor.stars
      for(let star of stars) {
        let resourceRange = this.resourcesRange.economy.max-this.resourcesRange.economy.min
        star.naturalResources.economy = Math.floor(this.resourcesRange.economy.min+resourceRange*Math.random())
        star._updateNaturalResourcesText()
      }
    },
    randomizeResourceIndustry() {
      let stars = this.galaxyEditor.stars
      for(let star of stars) {
        let resourceRange = this.resourcesRange.industry.max-this.resourcesRange.industry.min
        star.naturalResources.industry = Math.floor(this.resourcesRange.industry.min+resourceRange*Math.random())
        star._updateNaturalResourcesText()
      }
    },
    randomizeResourceScience() {
      let stars = this.galaxyEditor.stars
      for(let star of stars) {
        let resourceRange = this.resourcesRange.science.max-this.resourcesRange.science.min
        star.naturalResources.science = Math.floor(this.resourcesRange.science.min+resourceRange*Math.random())
        star._updateNaturalResourcesText()
      }
    }
  }
}
</script>

<style>
  #randomizer-tools {
    position: absolute;
  }
</style>
