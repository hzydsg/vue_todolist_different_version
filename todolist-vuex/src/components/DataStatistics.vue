<template>
    <div class="dataStatistics">
        <input type="checkbox" v-model="isCheckAll" @click="checkAll">
        <span>已完成{{checkedTodos.length}} / 全部{{todoLists.length}}</span>
        <input type="button" value="清除所有已完成任务" @click="deleteCheckedTodos">
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"DataStatistics",
    data(){
        return {
            isCheckAll:false
        }
    },
    computed:{
        ...mapState(["todoLists","checkedTodos"])
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
        checkAll(){
            if(!this.isCheckAll){
                this.$store.commit("updateCheckTodos",this.todoLists.map((item)=>{
                    return item.id;
                }));
            }
            else{
                this.$store.commit("updateCheckTodos",[])
            }
        },
        deleteCheckedTodos(){
            this.$store.dispatch("updateTodoListCache",{
                todoListArr:this.todoLists.filter((item)=>{
                    return !this.checkedTodos.includes(item.id);
                })
            });
            this.$store.commit("updateCheckTodos",[])
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