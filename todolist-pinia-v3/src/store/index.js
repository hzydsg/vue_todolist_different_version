import { defineStore } from 'pinia'
import dayjs from "dayjs"
let todoLists = [
    {
      name:"编程",
      isEdit:false,
      checked:false
    },
    {
      name:"唱歌",
      isEdit:false,
      checked:false
    },
    {
      name:"打游戏",
      isEdit:false,
      checked:false
    }
];
todoLists = todoLists.map((item,index)=>{
  item.id = dayjs(Date.now()+index*1000).format("YYYYMMDDHHmmssSSS");
  return item;
})

if(window.localStorage.getItem("todoLists")){
    todoLists = JSON.parse(window.localStorage.getItem("todoLists"));
    todoLists.forEach((item)=>{
        item.isEdit = false;
        item.checked = false;
    })
}else{
    window.localStorage.setItem("todoLists",JSON.stringify(todoLists));
}
export const todolistStore = defineStore("todolistStore",{
    state:()=>{
      return {
        todoLists
      }
    },
    actions:{
      deleteTodo(targetTodo){
          let flag = confirm(`确认删除事项中的${targetTodo.name}吗？`);
          if(flag){
              this.todoLists.splice(this.todoLists.findIndex((item)=>{
                  return targetTodo.id === item.id
              }),1)
              this.updateTodoListCache();
          }
      },
      updateTodoListCache(){
        window.localStorage.setItem("todoLists",JSON.stringify(this.todoLists));
      }
    }
})