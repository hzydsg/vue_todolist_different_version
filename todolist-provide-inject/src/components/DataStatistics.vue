<template>
    <div class="dataStatistics">
        <input type="checkbox" v-model="isCheckAll" @click="checkAll">
        <span>已完成{{checkArr}} / 全部{{todoLists.length}}</span>
        <input type="button" value="清除所有已完成任务" @click="deleteCheckedTodos">
    </div>
</template>

<script>
import {inject,watch,ref} from "vue";
export default {
    name:"DataStatistics",
    setup(){
        let todoLists = inject("todoLists");
        let isCheckAll = ref(false);
        let checkArr = ref(todoLists.reduce((prev,_,item)=>{
            return item.checked?prev+1:prev;
        },0));
        watch(todoLists,()=>{
            checkArr.value = todoLists.reduce((prev,current)=>{
                return current.checked?prev+1:prev;
            },0);
            isCheckAll.value = (todoLists.length !==0) && (checkArr.value === todoLists.length);
        })

        function checkAll(){
            if(!isCheckAll.value){
                todoLists.forEach((item,index)=>{
                    todoLists.splice(index,1,{
                        ...item,
                        checked:true
                    })
                })
            }
            else{
                todoLists.forEach((item,index)=>{
                    todoLists.splice(index,1,{
                        ...item,
                        checked:false
                    })
                })
            }
        }

        function deleteCheckedTodos(){
            todoLists.filter((item)=>{
                return item.checked;
            }).forEach((item1)=>{
                todoLists.splice(todoLists.findIndex((item2)=>{
                    return item1.id === item2.id;
                }),1);
            })
            window.localStorage.setItem("todoLists",JSON.stringify(todoLists));
        }
        return {
            todoLists,
            isCheckAll,
            checkArr,
            checkAll,
            deleteCheckedTodos
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