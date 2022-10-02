<template>
  <div id="app">
      <search-box @addTodo="addTodo"></search-box>
      <my-list :todoLists="todoLists" :checkedTodos="checkedTodos" ref="my-list"></my-list>
      <data-statistics :todoLists="todoLists" :checkedTodos="checkedTodos" ref="data-statistics"></data-statistics>
      <br>
      <br>
      <my-test v-on:test1="test1"  @test2="test2" ref="my-test"></my-test>
  </div>
</template>

<script>
import searchBox from './components/SearchBox.vue';
import myList from './components/MyList.vue';
import dataStatistics from './components/DataStatistics.vue';
import dayjs from "dayjs";
import myTest from './components/MyTest.vue';
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
    addTodo(name){
      let id = dayjs(Date.now()).format("YYYYMMDDHHmmssSSS");
      this.todoLists.unshift({
        name,
        id
      })
    },
    deleteTodo(targetTodo){
      this.todoLists = this.todoLists.filter((item)=>{
          return targetTodo.id !== item.id;
       })
    },
    test1(name){
      alert(`hello ${name}!!!`);
    },
    test2(){
      alert(`我是test2`);
    },
    test3(){
      alert(`我是test3`);
    }
  },
  mounted(){
    Object.keys(this.$refs).forEach((item)=>{
      this.$refs[item].$on("changeCheckTodo",(newVal)=>{
          this.checkedTodos = newVal;
      });
    })
    this.$refs["my-list"].$on("deleteTodo",this.deleteTodo);
    this.$refs["data-statistics"].$on("changeTodoLists",(newVal)=>{
        this.todoLists = newVal;
    });
    this.$refs["my-test"].$once("test3",this.test3);
  },
  components: {
    SearchBox: searchBox,
    MyList: myList,
    DataStatistics: dataStatistics,
    MyTest:myTest
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
