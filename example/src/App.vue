<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
a {
  display: inline-block;
  margin: 5px;
  border: 1px solid #ddd;
  background: #eee;
  box-shadow: 2px 3px 4px -3px #ccc;
  color: #222;
  padding: 4px 10px;
  text-decoration: none;
}

.router-link-active {
  color: #fff;
  background: #419EF7;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.apexcharts-canvas {
  margin: 0 auto;
}
</style>

