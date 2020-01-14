main();
//声明结点类
function Lnode() {
    this.data; //数据
    this.next; //指针
}
//头插法建立单链表
function List_HeadInsert() {
    var L = new Lnode(); //头节点
    L.next = null;
    for (i = 1; i <= 10; i++) {
        var s = new Lnode(); //新建节点
        s.data = i;
        s.next = L.next;
        L.next = s;
    }
    return L;
}
//尾插法建立单链表
function List_TailInsert() {
    var L = new Lnode();
    var r = new Lnode();
    r = L; //如果写L.next=r,会出现第一个节点是空节点的情况
    for (i = 1; i <= 10; i++) {
        var s = new Lnode(); //新建节点
        r.next = s;
        s.data = i;
        s.next = null;
        r = s;
    }
    return L;
}
//遍历链表
function ListTraverse(L) {
    p = L.next;
    while (p != null) {
        console.log(p.data);
        p = p.next;
    }
    //这里的L是传值，也就是说，如果我后面加上L=null,实际上链表并没有断链
}
//删除单链表第i个节点，也可以传入节点，删除该节点，方法就是把下一个节点的值赋值给该节点,删除下一个节点
//p.data=p.next.data;
//p.next=p.next.next;
function ListDelete(L, i) {
    j = 1;
    p = L.next;
    q = L;
    while (p != null && j <= i) {
        if (j == i) {
            q.next = p.next; //q为上一节点
        }
        j = j + 1;
        q = p;
        p = p.next;
    }
}
//增加单链表第i个节点，值为x(在i位置插入)
function ListInsert(L, i) {
    //略
}

function test1(L) {
    L.next.next.data = 999;
}
// function test(L){
//     L.data=1;
//     L=null;
//     return L;
// }
//测试
function main() {
    //L1 = List_HeadInsert();
    // L2 = List_TailInsert();
    //ListTraverse(L1);
    // ListTraverse(L1);
    L2 = List_TailInsert();
    ListTraverse(L2)
    ListDelete(L2, 2);
    ListTraverse(L2)
    //这里我有一个疑问，不是传值嘛，怎么还真的把链表给变了。
    //我写完了才认识到，有问题，C传入的就是指针，我也没想到那么多，
    //这个传入值，却修改了原值要怎么解释呢
    //再测试一下
    //测试结果又没有变
    // console.log('********************************');
    // test(L2);
    // ListTraverse(L2)
    // test(L2);
    // ListTraverse(L2)
    //经过下面的例子，我好像懂了，传入的L,不是传入的L的对象，而是传入L对象的地址，
    //L=null,这句话的意识不是清空对象L，而是把这个地址丢掉了
    //test1(L2);
    //ListTraverse(L2)
}
//循环链表，双链表，静态链表略