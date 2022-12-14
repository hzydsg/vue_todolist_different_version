# 用自定义事件实现todolist
## 自定义事件
<p>(1)自定义事件通常用于父子组件的通信,子组件可以通过自定义事件向父组件传递数据</p>
<p>(2)在组件标签通过v-on或者@默认绑定都是自定义事件,也可以通过vc.$on(自定义事件名,触发自定义事件后要执行的响应函数),可以将响应函数定义methods中,或者可以直接定义一个回调函数,注意要写成箭头函数,写成箭头函数this就会指向当前所在组件的实例化对象。如果回调函数不是箭头函数,this就指向绑定该自定义事件的那个组件实例化对象</p>
<p>(3)如果要绑定原生事件请使用native修饰符</p>
<p>(4)如果只想让自定义事件只执行一次,可以使用once修饰符或者vc.$once(自定义事件名,触发自定义事件后要执行的响应函数)</p>
<p>(5)如果解绑事件,可以使用vc.$off</p>
<p>这个方法可以传递的参数情况</p>
<p>&emsp;&emsp;(1)不传参,就会解绑本组件实例化对象上的所有自定义事件</p>
<p>&emsp;&emsp;(2)传一个字符串参数,事件名,那么就会解绑本组件实例化对象上的指定的一个事件</p>
<p>&emsp;&emsp;(3)传一个数组,数组中的元素都是事件名,那么就会解绑本组件实例化对象上的多个指定的事件</p>
