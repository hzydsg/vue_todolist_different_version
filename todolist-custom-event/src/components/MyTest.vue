<template>
    <div>
        <button @click="click1">点我测试一下</button>
        <br>
        <br>
        <button @click="click2">点我测试一下</button>
        <br>
        <br>
        <button @click="click3">点我测试一下</button>
        <br>
        <br>
        <button @click="click4">解绑事件</button>
    </div>
</template>

<script>
export default {
    name:"MyTest",
    data(){
        return {
            userName:"hzydsg"
        }
    },
    methods:{
        click1(){
            this.$emit("test1",this.userName);
        },
        click2(){
            this.$emit("test2");
        },
        click3(){
            this.$emit("test3");
        },
        click4(){
            /*
                1.解绑组件的一个自定义事件
                vc.$off(指定的事件名)
            */
            // this.$off("test3");

            /*
                2.解绑组件的多个自定义事件
                vc.$off(由事件名组成的数组)
            */
            // this.$off(["test1","test2"]);

            /*
                3.解绑组件的所有自定义事件
                vc.$off()
            */
            this.$off();
        }
    },
    mounted(){
        console.log(this);
    }
}
</script>

<style>

</style>