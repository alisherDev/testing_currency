<template>
  <div class="links">
    <router-link
      class="menu__link"
      :to="{ name: 'Currency'}"
      :class="{ active : activeLink === 'Currency'}"
    >Currency</router-link>
    <router-link
      class="menu__link"
      :to="{ name: 'Converter'}"
      :class="{ active : activeLink === 'Converter'}"
    >Converter</router-link>
  </div>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  computed: {
    activeLink () {
      return this.$route.name;
    }
  }
}
</script>

<style>
body {
  background-color: rgb(28, 85, 177);
}

.menu__link {
  font-size: 20px;
  color: #fff;
  text-decoration: none;
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;
}
.active {
  border-bottom: 2px solid #fff;
}

.links {
  display: flex;
  padding: 5px;
}
</style>
