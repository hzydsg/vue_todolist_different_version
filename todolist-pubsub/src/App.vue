<template>
  <div id="app">
      <search-box></search-box>
      <my-list :todoLists="todoLists" :checkedTodos="checkedTodos"></my-list>
      <data-statistics :todoLists="todoLists" :checkedTodos="checkedTodos"></data-statistics>
  </div>
</template>

<script>
import searchBox from './components/SearchBox.vue';
import myList from './components/MyList.vue';
import dataStatistics from './components/DataStatistics.vue';
import dayjs from "dayjs";
import pubsub from "pubsub-js";
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
  methods:{
    addTodo(_,name){
      let id = dayjs(Date.now()).format("YYYYMMDDHHmmssSSS");
      this.todoLists.unshift({
        name,
        id
      })
    },
    deleteTodo(_,targetTodo){
      this.todoLists = this.todoLists.filter((item)=>{
          return targetTodo.id !== item.id;
       })
    }
  },
  mounted(){
    pubsub.subscribe("addTodo",this.addTodo);
    pubsub.subscribe("deleteTodo",this.deleteTodo);
    pubsub.subscribe("changeTodoLists",(_,newVal)=>{
        this.todoLists = newVal;
    });
    pubsub.subscribe("changeCheckTodo",(_,newVal)=>{
      this.checkedTodos = newVal;
    });
  },
  beforeDestroy(){
    // pubsub.unsubscribe("addTodo");
    // pubsub.unsubscribe("deleteTodo");
    // pubsub.unsubscribe("changeTodoLists");
    // pubsub.unsubscribe("changeCheckTodo");
    pubsub.clearAllSubscriptions();
  },
  components: {
    SearchBox: searchBox,
    MyList: myList,
    DataStatistics: dataStatistics
},
  created(){
    this.todoLists = this.todoLists.map((item,index)=>{
      item.id = dayjs(Date.now()+index*1000).format("YYYYMMDDHHmmssSSS");
      return item;
    })
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
