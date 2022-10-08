<template>
  <div id="app">
      <search-box @addTodo="addTodo"></search-box>
      <my-list 
        :todoLists="todoLists" 
        :checkedTodos="checkedTodos"
        @deleteTodo="deleteTodo"
        @changeTodoLists = "changeTodoLists"
        @changeCheckTodo = "changeCheckTodo"
      >
      </my-list>
      <data-statistics 
        :todoLists="todoLists" 
        :checkedTodos="checkedTodos"
        @changeTodoLists = "changeTodoLists"
        @changeCheckTodo = "changeCheckTodo"
      >
      </data-statistics>
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
          name:"编程",
          isEdit:false
        },
        {
          name:"唱歌",
          isEdit:false
        },
        {
          name:"打游戏",
          isEdit:false
        }
      ],
      checkedTodos:[]
    }
  },
  methods:{
    addTodo(name){
      let id = dayjs(Date.now()).format("YYYYMMDDHHmmssSSS");
      this.todoLists.unshift({
        name,
        id,
        isEdit:false
      })
      window.localStorage.setItem("todoLists",JSON.stringify(this.todoLists));
    },
    deleteTodo(targetTodo){
      this.todoLists = this.todoLists.filter((item)=>{
          return targetTodo.id !== item.id;
      })
      window.localStorage.setItem("todoLists",JSON.stringify(this.todoLists));
    },
    changeTodoLists(newVal){
      this.todoLists = newVal;
      window.localStorage.setItem("todoLists",JSON.stringify(this.todoLists));
    },
    changeCheckTodo(newVal){
      this.checkedTodos = newVal;
    }
  },
  components: {
    SearchBox: searchBox,
    MyList: myList,
    DataStatistics: dataStatistics
  },
  created(){
    if(window.localStorage.getItem("todoLists")){
      this.todoLists = JSON.parse(window.localStorage.getItem("todoLists"));
    }else{
      this.todoLists = this.todoLists.map((item,index)=>{
        item.id = dayjs(Date.now()+index*1000).format("YYYYMMDDHHmmssSSS");
        return item;
      })
      window.localStorage.setItem("todoLists",JSON.stringify(this.todoLists));
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
