<template>
    <div class="MyList">
        <ul>
            <transition-group 
                name="animate__animated animate__swing" 
                :appear="true"
                enter-active-class="animate__bounceIn"
                leave-active-class="animate__fadeOutRight"
            >
                <li v-for="(item) in todoLists" :key="item.id">
                    <input type="checkbox" v-model="checkedTodo" :value="item.id">
                    <template v-if="!item.isEdit">
                        <span>{{item.name}}</span>
                    </template>
                    <template v-else>
                        <input type="text" v-model="item.name" @blur="editDone(item)" ref="editName">
                    </template>
                    <input type="button" value="删除" @click="deleteTodo(item)">
                    <input type="button" value="编辑" class="edit" @click="editTodo(item)">
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<script>
import "animate.css";
import { mapState } from "vuex";
export default {
    name:"MyList",
    data(){
        return {
            checkedTodo:[]
        }
    },
    computed:{
        ...mapState(["todoLists","checkedTodos"])
    },
    watch:{
        "checkedTodo":{
            handler(){
                this.$store.commit("updateCheckTodos",this.checkedTodo);
            }
        },
        "checkedTodos":{
            handler(newVal){
                this.checkedTodo = newVal;
            }
        }
    },
    methods:{
        deleteTodo(targetTodo){
            let flag = confirm(`确认删除事项中的${targetTodo.name}吗？`);
            if(flag){
                this.$store.dispatch("deleteTodo",targetTodo);
            }
        },
        editTodo(item){
            item.isEdit = true;
            this.$nextTick(function(){
                this.$refs.editName[0].focus();
            })
        },
        editDone(item){
            item.isEdit = false;
            this.$store.dispatch("updateTodoListCache",{
                todoListArr:this.todoLists
            });
        }
    },
    mounted(){
        window.onbeforeunload = ()=>{
            this.todoLists.forEach((item)=>{
                item.isEdit = false;
            })
            this.$store.dispatch("updateTodoListCache",{
                todoListArr:this.todoLists
            });
        }
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

    .MyList>ul li{
        width: 100%;
        height: 60px;
        line-height: 60px;
        border: 2px solid #F0F0F0;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0px 10px;
        border-collapse: collapse;
    }

    .MyList>ul li:hover{
        background-color: #DCDCDC;
    }

    .MyList>ul li>input[type="checkbox"]{
        margin-right: 20px;
    }

    .MyList>ul li>input[type="button"]{
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

    .MyList>ul li>input[type="button"].edit{
        background-color: skyblue;
        border: 2px solid skyblue;
    }

    .MyList>ul li:hover>input[type="button"]{
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

    /* .todos-enter-active{
        animation: changePosition 1s linear;
    }

    .todos-leave-active{
        animation: changePosition 1s linear;
    }

    @keyframes changePosition{
        from{
            transform: translateX(100%);
        }

        to{
            transform: translateX(0);
        }
    } */

    /* .todos-enter{
        transform: translateX(100%);
    }

    .todos-enter-to{
        transform: translateX(0);
    }

    .todos-leave{
        transform: translateX(0);
    }

    .todos-leave-to{
        transform: translateX(100%);
    }

    .todos-enter-active{
        transition: transform 0.5s linear
    }

    .todos-leave-active{
        transition: transform 0.5s linear;
    } */
</style>