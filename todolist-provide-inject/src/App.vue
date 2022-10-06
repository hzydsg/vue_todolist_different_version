<template>
  <div>
      <search-box></search-box>
      <my-list></my-list>
      <data-statistics></data-statistics>
  </div>
</template>

<script>
import searchBox from './components/SearchBox.vue';
import myList from './components/MyList.vue';
import dataStatistics from './components/DataStatistics.vue';
import {reactive,provide,onMounted} from "vue";
import dayjs from 'dayjs';
export default {
  name: 'App',
  setup(){
    let todoLists = reactive([
        {
          name:"编程",
          isEdit:false,
          checked:false,
          id:dayjs(Date.now()).format("YYYYMMDDHHmmssSSS")
        },
        {
          name:"唱歌",
          isEdit:false,
          checked:false,
          id:dayjs(Date.now()+1000).format("YYYYMMDDHHmmssSSS")
        },
        {
          name:"打游戏",
          isEdit:false,
          checked:false,
          id:dayjs(Date.now()+2000).format("YYYYMMDDHHmmssSSS")
        }
    ])
    let todos = window.localStorage.getItem("todoLists");
    if(JSON.parse(todos)){
      todoLists = reactive(JSON.parse(todos));
      todoLists.forEach((item)=>{
        item.checked = false;
        item.isEdit = false;
      })
    }else{
      window.localStorage.setItem("todoLists",JSON.stringify(todoLists));
    }
    provide("todoLists",todoLists);
    onMounted(()=>{
      window.onbeforeunload = ()=>{
        todoLists.forEach((item)=>{
          item.isEdit = false;
        })
      }
    })
  },
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
