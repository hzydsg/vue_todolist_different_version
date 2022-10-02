<template>
    <div class="SearchBox">
        <input type="text" placeholder="请输入你的任务名称,按下回车确认" v-model="todoListName" @keydown.enter="enterName">
    </div>
</template>

<script>
export default {
    name:"SearchBox",
    data(){
        return {
            todoListName:""
        }
    },
    methods:{
        enterName(){
           this.$store.dispatch("addTodo",this.todoListName);
           this.todoListName = "";
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