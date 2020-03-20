export default function() {
    const _top = new WeakMap();
    const _items = new WeakMap();
    class SqStack {
        constructor() {
            _top.set(this, -1); //栈顶指针为-1
            _items.set(this, []); //数据存放在数组里
        }
        //判断栈空
        StackEmpty() {
            var top = _top.get(this);
            if (top == -1) {
                return true;
            } else {
                return false;
            }
        }
        //不考虑栈大小
        //进栈
        Push(value = null) {
            var top = _top.get(this);
            var items = _items.get(this);
            items[++top] = value; //这里不能用数组对象自带的push方法,因为可以做到长度固定的数组全满，但栈为空
            _top.set(this, top);
            _items.set(this, items);
            return true;
        }
        //出栈
        Pop() {
            var top = _top.get(this);
            if (top == -1) {
                return false;
            }
            var items = _items.get(this);
            var item = items[top];
            _top.set(this, --top);
            return item;
            //没找到JS是否支持传出参数，只能把出栈元素return
            //但元素出栈，数组并没有变化，只有栈顶指针变了，所以不能用数组自带的POP方法
            //也不需要修改数组里的元素
        }
        //访问栈顶元素
        GetPop() {
            //只读取栈顶元素，栈顶指针不变化
            var top = _top.get(this);
            var items = _items.get(this);
            if (top == -1) {
                return false;
            }
            //这个闭包写法是有点繁琐，以后不考虑私有问题了
            var item = items[top];
            return item;
        }
        //遍历数组的值
        //这个只是自己测试用，实际上数据结构没有这个操作
        Traverse() {
            var items = _items.get(this);
            console.log(items.toString());
        }
    }
    return SqStack;
}