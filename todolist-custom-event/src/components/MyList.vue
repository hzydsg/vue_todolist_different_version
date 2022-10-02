<template>
    <div class="MyList">
        <ul>
            <li v-for="(item) in todoList2" :key="item.id">
                <input type="checkbox" v-model="checkedTodo" :value="item.id">
                {{item.name}}
                <input type="button" value="删除" @click="deleteTodo(item)">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"MyList",
    data(){
        return {
            todoList2:this.todoLists,
            checkedTodo:this.checkedTodos
        }
    },
    methods:{
        deleteTodo(targetTodo){
            let flag = confirm(`确认删除事项中的${targetTodo.name}吗？`);
            if(flag){
                this.$emit("deleteTodo",targetTodo);
                this.checkedTodo = this.checkedTodo.filter((item)=>{
                    return item !== targetTodo.id; 
                })
            }
        }
    },
    watch:{
        checkedTodo:{
            handler(newVal){
                this.$emit("changeCheckTodo",newVal);
            }
        },
        checkedTodos:{
            handler(newVal){
                this.checkedTodo = newVal;
            }
        },
        todoLists:{
            handler(newVal){
                this.todoList2 = newVal;
            }
        }
    },
    props:{
        todoLists:{
            type:Array,
            required:true
        },
        checkedTodos:{
            type:Array,
            required:true
        }
    },
    mounted(){
        console.log(this);
    }
}
</script>

<style scoped>
    .MyList{
        margin-top: 20px;
    }

    .MyList>ul{
        list-style: none;
        padding: 0px;
        margin: 0px;
    }

    .MyList>ul>li{
        width: 100%;
        height: 60px;
        line-height: 60px;
        border: 2px solid #F0F0F0;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0px 10px;
        border-collapse: collapse;
    }

    .MyList>ul>li:hover{
        background-color: #DCDCDC;
    }

    .MyList>ul>li>input[type="checkbox"]{
        margin-right: 20px;
    }

    .MyList>ul>li>input[type="button"]{
        width: 60px;
        height: 30px;
        border: 2px solid #E25A42;
        border-radius: 4px;
        background-color: #E25A42;
        color: white;
        float: right;
        margin-top: 15px;
        display: none;
    }

    .MyList>ul>li:hover>input[type="button"]{
        display: inline-block;
    }
</style>