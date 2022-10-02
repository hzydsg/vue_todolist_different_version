<template>
    <div class="dataStatistics">
        <input type="checkbox" v-model="isCheckAll" @click="checkAll">
        <span>已完成{{checkedTodos.length}} / 全部{{todoLists.length}}</span>
        <input type="button" value="清除所有已完成任务" @click="deleteCheckedTodos">
    </div>
</template>

<script>
import {todolistStore} from "@/store";
import {mapWritableState,mapActions} from "pinia";
export default {
    name:"DataStatistics",
    data(){
        return {
            isCheckAll:false
        }
    },
    computed:{
        ...mapWritableState(todolistStore,["todoLists","checkedTodos"])
    },
    watch:{
        checkedTodos:{
            handler(){
                this.isAll();
            }
        },
        todoLists:{
            handler(){
                this.isAll();
            }
        }
    },
    methods:{
        ...mapActions(todolistStore,["updateTodoListCache"]),
        checkAll(){
            if(!this.isCheckAll){
                this.checkedTodos = this.todoLists.map((item)=>{
                    return item.id;
                })
            }
            else{
                this.checkedTodos = [];
            }
        },
        deleteCheckedTodos(){
            this.todoLists = this.todoLists.filter((item)=>{
                return !this.checkedTodos.includes(item.id);
            });
            this.checkedTodos = [];
            this.updateTodoListCache();
        },
        isAll(){
            this.isCheckAll = (this.todoLists.length !==0) && (this.checkedTodos.length === this.todoLists.length);
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