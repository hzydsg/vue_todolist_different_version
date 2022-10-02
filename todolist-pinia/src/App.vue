<template>
  <div id="app">
      <search-box></search-box>
      <my-list></my-list>
      <data-statistics></data-statistics>
  </div>
</template>

<script>
import searchBox from './components/SearchBox.vue';
import myList from './components/MyList.vue';
import dataStatistics from './components/DataStatistics.vue';
export default {
  name: 'App',
  components: {
    SearchBox: searchBox,
    MyList: myList,
    DataStatistics: dataStatistics
  }
}
</script>

<style>
  #app {
      width: 600px;
      border: 3px solid #F0F0F0;
      border-radius: 5px;
      padding: 20px;
  }
</style>
