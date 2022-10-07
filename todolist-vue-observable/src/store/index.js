import Vue from "vue";
import dayjs from "dayjs";
export const todolistObj = Vue.observable({
    todoLists:[
        {
          name:"编程",
          isEdit:false,
          id:dayjs(Date.now()).format("YYYYMMDDHHmmssSSS")
        },
        {
          name:"唱歌",
          isEdit:false,
          id:dayjs(Date.now()+1000).format("YYYYMMDDHHmmssSSS")
        },
        {
          name:"打游戏",
          isEdit:false,
          id:dayjs(Date.now()+2000).format("YYYYMMDDHHmmssSSS")
        }
    ],
    checkedTodos:[]
})

if(window.localStorage.getItem("todoLists")){
  todolistObj.todoLists= JSON.parse(window.localStorage.getItem("todoLists"));
}else{
  window.localStorage.setItem("todoLists",JSON.stringify(todolistObj.todoLists));
}
export const todolistMutations = {
    addTodo(name){
        let id = dayjs(Date.now()).format("YYYYMMDDHHmmssSSS");
        todolistObj.todoLists.unshift({
          name,
          id,
          isEdit:false
        })
        window.localStorage.setItem("todoLists",JSON.stringify(todolistObj.todoLists));
    },
    deleteTodo(targetTodo){
        todolistObj.todoLists = todolistObj.todoLists.filter((item)=>{
            return targetTodo.id !== item.id;
        })
        window.localStorage.setItem("todoLists",JSON.stringify(this.todoLists));
    },
    changeTodoLists(newVal){
        todolistObj.todoLists= newVal;
        window.localStorage.setItem("todoLists",JSON.stringify(todolistObj.todoLists));
    },
    changeCheckTodos(newVal){
      todolistObj.checkedTodos = newVal;
    }
}