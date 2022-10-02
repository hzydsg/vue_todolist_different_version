<template>
    <div class="MyList">
        <ul>
            <li v-for="(item) in todoList2" :key="item.id">
                <input type="checkbox" v-model="checkedTodo" :value="item.id">
                <template v-if="!item.isEdit">
                    <span>{{item.name}}</span>
                </template>
                <template v-else>
                    <!-- <input type="text" v-model="item.name" @blur="editDone(item)" v-f-focus="item"> -->
                    <input type="text" v-model="item.name" @blur="editDone(item)" ref="editName">
                </template>
                <input type="button" value="删除" @click="deleteTodo(item)">
                <!-- <input type="button" value="编辑" class="edit" @click="editTodo(item,$event)"> -->
                <input type="button" value="编辑" class="edit" @click="editTodo(item)">
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
                this.$bus.$emit("deleteTodo",targetTodo);
                this.checkedTodo = this.checkedTodo.filter((item)=>{
                    return item !== targetTodo.id; 
                })
            }
        },
        editTodo(item){
            item.isEdit = true;
            this.$bus.$emit("changeTodoLists",this.todoList2);
            this.$nextTick(function(){
                // e.target.previousElementSibling.previousElementSibling.focus();
                this.$refs.editName[0].focus();
            })
        },
        editDone(item){
            item.isEdit = false;
            this.$bus.$emit("changeTodoLists",this.todoList2);
        }
    },
    watch:{
        checkedTodo:{
            handler(newVal){
                this.$bus.$emit("changeCheckTodo",newVal);
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
        window.onbeforeunload = ()=>{
            this.todoList2.forEach((item)=>{
                item.isEdit = false;
            })
            this.$bus.$emit("changeTodoLists",this.todoList2);
        }
    }
    // directives:{
    //     "f-focus":{
    //         inserted(element){
    //             element.focus();
    //         }
    //     }
    // }
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
        margin-right: 20px;
    }

    .MyList>ul>li>input[type="button"].edit{
        background-color: skyblue;
        border: 2px solid skyblue;
    }

    .MyList>ul>li:hover>input[type="button"]{
        display: inline-block;
    }

    input[type="text"]{
        -web-kit-appearance:none;
        -moz-appearance: none;
        outline: 0;
        width: 120px;
        border: 2px solid #F0F0F0;
        height: 30px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
    }

    input[type="text"]:active{
        border: 2px solid #F0F0F0;
    }
</style>