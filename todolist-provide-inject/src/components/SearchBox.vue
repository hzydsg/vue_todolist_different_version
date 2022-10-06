<template>
    <div class="SearchBox">
        <input type="text" placeholder="请输入你的任务名称,按下回车确认" v-model="todoListName" @keydown.enter="enterName">
    </div>
</template>

<script>
import {inject,ref} from "vue";
import dayjs from "dayjs";
export default {
    name:"SearchBox",
    setup(){
        let todoListName = ref("");
        let todoLists = inject("todoLists");
        function enterName(){
            let todo = {
                name:todoListName.value,
                isEdit:false,
                checked:false,
                id:dayjs(Date.now()).format("YYYYMMDDHHmmssSSS")
            }
            todoLists.unshift(todo);
            todoListName.value = "";
            window.localStorage.setItem("todoLists",JSON.stringify(todoLists));
        }
        return {
            todoListName,
            enterName
        }
    }
}
</script>

<style scoped>
    input[type="text"]{
        -web-kit-appearance:none;
        -moz-appearance: none;
        outline: 0;
        width: 100%;
        border: 2px solid #F0F0F0;
        height: 40px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
    }

    input[type="text"]:active{
        border: 2px solid #F0F0F0;
    }
</style>