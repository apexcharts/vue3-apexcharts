<template>
  <div>
    <div class="header">
      <h1>Vue3 ApexCharts</h1>
      <nav class="nav">
        <router-link to="/">Examples</router-link>
        <router-link to="/tree-shaking">Tree-Shaking</router-link>
      </nav>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 12px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav a {
  color: #008FFB;
  text-decoration: none;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;
}

.nav a:hover {
  background: #e8f4ff;
}

.nav a.router-link-active {
  background: #008FFB;
  color: #fff;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}

.container__item {
  padding: 12px;
  width: 100%;
  margin-top: 24px;
}

.example {
  margin: 0 auto 40px;
  border-bottom: 2px solid #aaa;
  padding-bottom: 20px;
}
</style>
