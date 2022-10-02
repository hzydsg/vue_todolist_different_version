<template>
  <div id="app">
      <search-box :todoLists="todoLists"></search-box>
      <my-list :todoLists="todoLists" :checkedTodos="checkedTodos"></my-list>
      <data-statistics :todoLists="todoLists" :checkedTodos="checkedTodos"></data-statistics>
  </div>
</template>

<script>
import searchBox from './components/SearchBox.vue';
import myList from './components/MyList.vue';
import dataStatistics from './components/DataStatistics.vue';
import dayjs from "dayjs";
export default {
  name: 'App',
  data(){
    return {
      todoLists:[
        {
          name:"编程"
        },
        {
          name:"唱歌"
        },
        {
          name:"打游戏"
        }
      ],
      checkedTodos:[]
    }
  },
  components: {
    SearchBox:searchBox,
    MyList:myList,
    DataStatistics:dataStatistics
  },
  created(){
    this.todoLists = this.todoLists.map((item,index)=>{
      item.id = dayjs(Date.now()+index*1000).format("YYYYMMDDHHmmssSSS");
      return item;
    })
    if(!window.localStorage.getItem("todoLists")){
      window.localStorage.setItem("todoLists",JSON.stringify(this.todoLists));
    }
    else {
      this.todoLists = JSON.parse(window.localStorage.getItem("todoLists"));
    }
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
