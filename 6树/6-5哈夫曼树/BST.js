//******************************************//
class LinkLnode {
    constructor() {
        this.data = null; //数据
        this.next = null; //指针
    }
}
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
//***********************************************//
class BST_Node {
    constructor(key, lchild, rchild) {
        this.key = key;
        this.lchild = lchild;
        this.rchild = rchild;
    }
}
class Line {
    constructor(moveTOx, moveTOy, lineTOx, lineTOy) {
        this.moveTOx = moveTOx;
        this.moveTOy = moveTOy;
        this.lineTOx = lineTOx;
        this.lineTOy = lineTOy;
    }
}
class View_Node {
    constructor(node, x, y, line) {
        this.node = node;
        this.x = x;
        this.y = y;
        this.line = line;
    }
}
class BST {
    constructor(keys) {
        //传入数组则构造树
        //传入空值则创建空头节点
        this.root = null;
        this.travels = [];
        this.forest = keys;
        if (keys != null) this.Huffman(keys);
    }
    Huffman(keys) {
        //将所有的权值做为数的根节点，存放于数组中
        //取出两个最小的值，然后构造二叉树
        //如果不用链表的话，想了一种写起来较为简单的方法
        //将数组进行一遍选择排序，然后删除该元素
        var nodes = [];
        for (var i = 0; i < keys.length; i++) {
            var node = new BST_Node(keys[i], null, null);
            nodes.push(node);
        }
        while (nodes.length > 1) {
            var min = this.sort_min(nodes);
            var minl = nodes[min];
            nodes.splice(min, 1);
            min = this.sort_min(nodes);
            var minr = nodes[min];
            nodes.splice(min, 1);
            var r = new BST_Node(minl.key + minr.key, minl, minr);
            nodes.push(r);
        }
        this.root=nodes[0];
    }
    sort_min(nodes) {
        if (nodes.length == 1) return 0;
        else {
            var min = 0;
            for (var j = 1; j < nodes.length; j++) {
                if (nodes[min].key > nodes[j].key) min = j;
            }
            return min;
        }
    }
    //绘制图形
    view() {
        var canvas = document.getElementById('tutorial');
        var ctx = canvas.getContext('2d');
        ctx.font = "20px serif";
        //先清空画布
        ctx.clearRect(0, 0, 800, 600);
        //ctx.fillText("1", 10, 50);
        //ctx.strokeText("1", 20, 50);
        var results = this.LevelOrder();
        for (var i = 0; i < results.length; i++) {
            ctx.beginPath();
            ctx.arc(results[i].x + 5, results[i].y - 5, 15, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.fillText(results[i].node.key, results[i].x, results[i].y, 15);
            ctx.moveTo(results[i].line.moveTOx, results[i].line.moveTOy);
            ctx.lineTo(results[i].line.lineTOx, results[i].line.lineTOy);
            ctx.stroke();
        }
    }
    //层次遍历,并记录节点的横纵坐标,方便画图
    LevelOrder() {
        //数组存层次遍历数据
        var results = [];
        //初始化队列
        var Queue = new LinkQueue();
        //根节点入队
        var vroot = new View_Node();
        vroot.node = this.root;
        if (this.root == null) return false;
        //初始化位置
        vroot.x = 400;
        vroot.y = 100;
        //初始化间隔
        var t = 50;
        //根节点入队
        var rootline = new Line(0, 0, 0, 0);
        vroot.line = rootline;
        Queue.EnQueue(vroot);
        while (!Queue.IsEmpty()) {
            //出队
            var p = Queue.DeQueue();
            results.push(p);
            //访问vnode
            if (p.node.lchild != null) {
               // p.node.key='';
                var lnode = new View_Node();
                lnode.node = p.node.lchild;
                lnode.x = p.x - t;
                lnode.y = p.y + t;
                var line = new Line(p.x - 5, p.y + 5, lnode.x + 15, lnode.y - 15);
                lnode.line = line;
                Queue.EnQueue(lnode);
            }
            if (p.node.rchild != null) {
              //  p.node.key='';
                var rnode = new View_Node();
                rnode.node = p.node.rchild;
                rnode.x = p.x + t;
                rnode.y = p.y + t;
                var line = new Line(p.x + 15, p.y + 5, rnode.x - 5, rnode.y - 15);
                rnode.line = line;
                Queue.EnQueue(rnode);
            }
        }
        return results;
    }
}
window.onload = function() {
    develop();
}

function develop() {
    var nodes = document.getElementById('nodes');
    nodes = nodes.value.split(",");
    // node = Number(node);
    nodes = nodes.map(Number);
    var oneBST = new BST(nodes);
    oneBST.view();
    window.BST = oneBST;
    //order();
}