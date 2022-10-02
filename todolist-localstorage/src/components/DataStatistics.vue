<template>
    <div class="dataStatistics">
        <input type="checkbox" v-model="isCheckAll" @click="checkAll">
        <span>已完成{{checkedTodos.length}} / 全部{{todoList3.length}}</span>
        <input type="button" value="清除所有已完成任务" @click="deleteCheckedTodos">
    </div>
</template>

<script>
export default {
    name:"DataStatistics",
    data(){
        return {
            todoList3:this.todoLists,
            isCheckAll:false
        }
    },
    props:{
        checkedTodos:{
            type:Array,
            required:true
        },
        todoLists:{
            type:Array,
            required:true
        },
    },
    watch:{
        checkedTodos:{
            handler(){
                this.isCheckAll = (this.todoList3.length !==0) && (this.checkedTodos.length === this.todoList3.length);
            }
        },
        todoLists:{
            handler(newVal){
                this.todoList3 = newVal;
            }
        }
    },
    methods:{
        checkAll(){
            if(!this.isCheckAll){
                this.$parent.checkedTodos = this.todoList3.map((item)=>{
                    return item.id;
                })
            }
            else{
                this.$parent.checkedTodos = [];
            }
        },
        deleteCheckedTodos(){
            this.$parent.todoLists = this.todoList3 = this.todoList3.filter((item)=>{
                return !this.$parent.checkedTodos.includes(item.id);
            });
            window.localStorage.setItem("todoLists",JSON.stringify(this.todoList3));
            this.$parent.checkedTodos = [];
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