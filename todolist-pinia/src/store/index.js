import { defineStore } from 'pinia'
import dayjs from "dayjs"
let todoLists = [
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
];
todoLists = todoLists.map((item,index)=>{
  item.id = dayjs(Date.now()+index*1000).format("YYYYMMDDHHmmssSSS");
  return item;
})

if(window.localStorage.getItem("todoLists")){
  todoLists = JSON.parse(window.localStorage.getItem("todoLists"));
}else{
  window.localStorage.setItem("todoLists",JSON.stringify(todoLists));
}
export const todolistStore = defineStore("todolistStore",{
    state:()=>{
      return {
        todoLists,
        checkedTodos:[]
      }
    },
    actions:{
      deleteTodo(targetTodo){
          let flag = confirm(`确认删除事项中的${targetTodo.name}吗？`);
          if(flag){
              this.todoLists = this.todoLists.filter((item)=>{
                  return item.id !== targetTodo.id;
              })
              this.checkedTodos = this.checkedTodos.filter((item)=>{
                  return item !== targetTodo.id;
              })
              this.updateTodoListCache();
          }
      },
      updateTodoListCache(){
        window.localStorage.setItem("todoLists",JSON.stringify(this.todoLists));
      }
    }
})