<template>
    <div class="SearchBox">
        <input type="text" placeholder="请输入你的任务名称,按下回车确认" v-model="todoListName" @keydown.enter="enterName">
    </div>
</template>

<script>
import {mapActions} from 'pinia';
import {todolistStore} from "../store/index";
import dayjs from "dayjs";
import {ref,getCurrentInstance} from "vue";
export default {
    name:"SearchBox",
    setup(){
        let todoListName = ref("");
        let todoListsObj= todolistStore();
        let {ctx} = getCurrentInstance();
        function enterName(){
            const obj = {
                name:this.todoListName,
                isEdit:false,
                checked:false,
                id:dayjs(Date.now()).format("YYYYMMDDHHmmssSSS")
            };
            todoListName.value = "";
            todoListsObj.todoLists.unshift(obj);
            ctx.updateTodoListCache();
        }
        return {
            todoListName,
            todoListsObj,
            enterName
        }
    },
    methods:{
        ...mapActions(todolistStore,["updateTodoListCache"])
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