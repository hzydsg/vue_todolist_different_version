<template>
    <div class="dataStatistics">
        <input type="checkbox" v-model="isCheckAll" @click="checkAll">
        <span>已完成{{checkedTodos.length}} / 全部{{todoLists.length}}</span>
        <input type="button" value="清除所有已完成任务" @click="deleteCheckedTodos">
    </div>
</template>

<script>
import {todolistObj,todolistMutations} from '@/store';
export default {
    name:"DataStatistics",
    data(){
        return {
            isCheckAll:false
        }
    },
    computed:{
        checkedTodos:{
            get(){
                return todolistObj.checkedTodos
            }
        },
        todoLists:{
            get(){
                return todolistObj.todoLists
            }
        }
    },
    watch:{
        checkedTodos:{
            handler(newVal){
                this.isCheckAll = (newVal.length!==0)&& (newVal.length === this.todoLists.length)
            }
        },
        todoLists:{
            handler(newVal){
                this.isCheckAll = (this.checkedTodos.length!==0)&& (this.checkedTodos.length === newVal.length)
            }
        }
    },
    methods:{
        checkAll(){
            if(!this.isCheckAll){
                todolistMutations.changeCheckTodos(this.todoLists.map((item)=>{
                    return item.id;
                }))
            }
            else{
                todolistMutations.changeCheckTodos([]);
            }
        },
        deleteCheckedTodos(){
            todolistMutations.changeTodoLists(this.todoLists.filter((item)=>{
                return !this.checkedTodos.includes(item.id);
            }));
            todolistMutations.changeCheckTodos([]);
        }
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