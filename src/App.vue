<template>
  <GalaxyEditorContainer/>
</template>

<script>
import GalaxyEditorContainer from './components/GalaxyEditorContainer.vue'

export default {
  name: 'App',
  components: {
    GalaxyEditorContainer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  color: #2c3e50;
}
</style>
