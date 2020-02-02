//队列有顺序队列，链式队列，顺序队列里又有循环队列，还有双端队列等
//链式队列队列大小不受限，这里就只写链式队列
//以后有机会再补充顺序队列
//私有变量的写法不是我们研究的主要内容，因此不考虑
//LinkLnode在这里可以import
class LinkLnode {
    constructor() {
        this.data = null; //数据
        this.next = null; //指针
    }
}
//链式队列比链表多了队头队尾指针
class LinkQueue {
    constructor() {
        //默认带一个不含数据的头节点
        var HeadNode = new LinkLnode();
        this.front = HeadNode; //头指针初始指向头节点
        this.rear = HeadNode; //尾指针初始指向头节点
    }
    IsEmpty() {
        if (this.front == this.rear) return true;
        else return false;
    }
    //入队
    EnQueue(value) {
        var Lnode = new LinkLnode();
        Lnode.data = value;
        Lnode.next = null;
        this.rear.next = Lnode;
        this.rear = Lnode;
    }
    //出队
    DeQueue() {
        if (this.front == this.rear) {
            return false;
        } //空队不能出队
        var p = this.front.next;
        var value = p.data;
        this.front.next = p.next; //等下换成p=p.next
        if (p == this.rear) {
            this.rear = this.front;
        }
        return value;
    }
}
export {
    LinkQueue
};