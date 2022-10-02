import Vue from "vue";
import Vuex from "vuex";
import dayjs from "dayjs";
Vue.use(Vuex);
export const actions = {
    addTodo(context,value){
        console.log("actions中的addTodo被调用了");
        console.log(context,value);
        const obj = {
            name:value,
            isEdit:false,
            id:dayjs(Date.now()).format("YYYYMMDDHHmmssSSS")
        };
        context.dispatch("updateTodoListCache",{
            todoListArr:[obj].concat(context.state.todoLists)
        });
    },
    deleteTodo(context,value){
        console.log("actions中的deleteTodo被调用了");
        console.log(context,value);
        const todoListArr = context.state.todoLists.filter((item)=>{
            return item.id !== value.id
        });
        const checkedTodoArr = context.state.checkedTodos.filter((item)=>{
            return item !==value.id; 
        });
        context.dispatch("updateTodoListCache",{
            todoListArr,
            checkedTodoArr
        })
    },
    updateTodoListCache(context,{todoListArr,checkedTodoArr = context.state.checkedTodos}){
        console.log("actions中的updateTodoListCache被调用了");
        console.log(context);
        context.commit("updateTodoList",{
            todoListArr,
            checkedTodoArr
        })
        window.localStorage.setItem("todoLists",JSON.stringify(todoListArr));
    }
};

export const mutations = {
    updateTodoList(state,newVal){
        console.log("mutations的updateTodoList被调用了");
        console.log(state,newVal);
        state.todoLists = newVal.todoListArr;
        state.checkedTodos = newVal.checkedTodoArr;
    },
    updateCheckTodos(state,value){
        console.log("mutations的updateCheckTodos被调用了");
        console.log(state,value);
        state.checkedTodos = value;
    }
};

export const state = {
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
};

state.todoLists = state.todoLists.map((item,index)=>{
    item.id = dayjs(Date.now()+index*1000).format("YYYYMMDDHHmmssSSS");
    return item;
})

if(window.localStorage.getItem("todoLists")){
    state.todoLists = JSON.parse(window.localStorage.getItem("todoLists"));
}else{
    window.localStorage.setItem("todoLists",JSON.stringify(state.todoLists));
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})