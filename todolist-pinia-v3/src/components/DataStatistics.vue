<template>
    <div class="dataStatistics">
        <input type="checkbox" v-model="isCheckAll" @click="checkAll">
        <span>已完成{{checkedTodos}} / 全部{{todoLists.length}}</span>
        <input type="button" value="清除所有已完成任务" @click="deleteCheckedTodos">
    </div>
</template>

<script>
import {todolistStore} from "@/store";
import {mapActions} from "pinia";
import {ref,watch,getCurrentInstance} from "vue";
export default {
    name:"DataStatistics",
    setup(){
        let todoListsObj = todolistStore();
        let checkedTodos = ref(todoListsObj.todoLists.reduce((prev,current)=>{
            return current.checked?prev+1:prev;
        },0))
        let todoLists = todoListsObj.todoLists;
        let isCheckAll = ref(false);
        let {ctx} = getCurrentInstance();
        function isAll(){
            isCheckAll.value = (todoLists.length !==0) && (checkedTodos.value === todoLists.length);
        }
        function checkAll(){
            if(!isCheckAll.value){
                todoLists.forEach((item)=>{
                    item.checked = true;
                })
            }
            else{
                todoLists.forEach((item)=>{
                    item.checked = false;
                })
            }
        }
        function deleteCheckedTodos(){
            todoLists.filter((item)=>{
                return item.checked
            }).forEach((item1)=>{
                todoLists.splice(todoLists.findIndex((item2)=>{
                    return item1.id === item2.id;
                }),1)
            })
            ctx.updateTodoListCache();
        }
        watch(()=>todoListsObj.todoLists,(newVal)=>{
            checkedTodos.value = newVal.reduce((prev,current)=>{
                return current.checked?prev+1:prev;
            },0)
            isAll();
        },{deep:true})

        return {
            todoLists,
            checkedTodos,
            isCheckAll,
            checkAll,
            deleteCheckedTodos
        }
    },
    methods:{
        ...mapActions(todolistStore,["updateTodoListCache"])
    }
}
</script>

<style scoped>
    .dataStatistics{
        margin-top: 20px;
    }

    .dataStatistics>input[type="checkbox"]{
        margin-left: 15px;
        margin-right: 20px;
    }

    .dataStatistics>input[type="button"]{
        width: 200px;
        height: 30px;
        border: 2px solid #E25A42;
        border-radius: 4px;
        background-color: #E25A42;
        color: white;
        float: right;
        display: none;
    }

    .dataStatistics:hover>input[type="button"]{
        display: inline-block;
    }
</style>