import  SqStack  from './SqStack.js';
//*******************辅助队列*******************//
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
//*******************辅助队列*******************//
//树节点
//左孩子右兄弟
class Node {
    constructor(key, lchild, rchild) {
        this.key = key;
        this.lchild = lchild;
        this.rchild = rchild;
        this.distance = null; //新增一个属性，用来记录到起始点的距离
    }
}
class MinTree {
    constructor() {
        this.root;
    }
}
class ALGraph {
    constructor() {
        this.vertex = []; //顶点
        this.side = new Map(); //一个字典，值放入数组或链表对象，存储边
    }
    //增加顶点的方法
    addVertex(v) {
        this.vertex.push(v);
        this.side.set(v, []); //增加一个顶点的同时初始化对象
    }
    //增加边
    addSide(v, w) {
        this.side.get(v).push(w);
        this.side.get(w).push(v);
        //比如有两个节点a b ,一条边连接ab,这个边实际上上两个顶点共有的，
        //如果是有向图则只需插入一次
    }
    //打印
    toString() {
        var s = '';
        for (var i = 0; i < this.vertex.length; i++) { //{10} 
            s += this.vertex[i] + ' -> ';
            var neighbors = this.side.get(this.vertex[i]); //{11} 
            for (var j = 0; j < neighbors.length; j++) { //{12} 
                s += neighbors[j] + ' ';
            }
            s += '\n'; //{13} 
        }
        console.log(s);
        return s;
    }
    //广度优先搜索遍历
    //实际上就是二叉树的层次遍历
    //判断顶点是否被访问，是用数组存储ture和false判断
    //把顶点数组的元素作为访问数组的下标标识，则顶点元素字符串不能重复，
    //最好是创建顶点对象，数组的索引是字符串，还有一个问题是不能遍历，好在我们判断该顶点是否被访问，不需要遍历
    //不过以后还是将顶点字符串变成顶点对象
    //可以将访问数组变成访问字典，访问字典的key就是顶点对象，value就是是否访问
    //不过现在还是按照书上的写法，用字符串为索引的数组标识顶点是否被访问
    BFS() {
        var results = [];
        var Queue = new LinkQueue();
        //创建访问数组
        var visit = [];
        //图初始节点入队
        var p = this.vertex[0];
        results.push(p);
        visit[p] = true;
        Queue.EnQueue(p);
        if (p == null || p == undefined) return null;
        while (!Queue.IsEmpty()) {
            //出队
            var q = Queue.DeQueue();
            var sides = this.side.get(q);
            for (var i = 0; i < sides.length; i++) {
                if (!visit[sides[i]]) {
                    //如果未被访问过，则访问并入队
                    results.push(sides[i]);
                    Queue.EnQueue(sides[i]);
                    visit[sides[i]] = true;
                }
            }
        }
        return results;
    }
    //广度优先搜索最短路径
    BFS_Min() {
        //  var results = [];
        var Queue = new LinkQueue();
        //创建访问数组
        var visit = [];
        var d = [];
        //图初始节点入队
        var p = this.vertex[0];
        d[p] = 0;
        //  results.push(p);
        visit[p] = true;
        Queue.EnQueue(p);
        if (p == null || p == undefined) return null;
        while (!Queue.IsEmpty()) {
            //出队
            var q = Queue.DeQueue();
            var sides = this.side.get(q);
            for (var i = 0; i < sides.length; i++) {
                if (!visit[sides[i]]) {
                    //如果未被访问过，则访问并入队
                    d[sides[i]] = d[q] + 1;
                    Queue.EnQueue(sides[i]);
                    visit[sides[i]] = true;
                }
            }
        }
        return d;
    }
    //广度优先搜索树
    //最简单是双亲表示法，现在采用孩子兄弟表示法表示，然后转为二叉树
    // BFS_Mintree() {
    //     //  var results = [];
    //     var Queue = new LinkQueue();
    //     //创建访问数组
    //     var visit = [];
    //     var d = [];
    //     //图初始节点入队
    //     var p = this.vertex[0];
    //     d[p] = 0;
    //     var node = new Node(p, null, null);
    //     var minTree = new MinTree();
    //     minTree.root = node;
    //     //  results.push(p);
    //     visit[p] = true;
    //     Queue.EnQueue(p);
    //     if (p == null || p == undefined) return null;
    //     while (!Queue.IsEmpty()) {
    //         //出队
    //         var q = Queue.DeQueue();
    //         var qnode = new Node(q, null, null);
    //         var lastnode = null;
    //         var sides = this.side.get(q);
    //         for (var i = 0; i < sides.length; i++) {
    //             if (!visit[sides[i]]) {
    //                 //如果未被访问过，则访问并入队
    //                 //出队的的都是兄弟
    //                 var snode = new Node(sides[i], null, null);
    //                 if (lastnode == null) {
    //                     qnode.lchild = snode;
    //                     lastnode = snode;
    //                 } else {
    //                     lastnode.rchild = snode;
    //                 }
    //                 d[sides[i]] = d[q] + 1;
    //                 Queue.EnQueue(sides[i]);
    //                 visit[sides[i]] = true;
    //                 lastnode = snode;
    //             }
    //         }
    //     }
    //     return minTree;
    // }
    BFS_Mintree() {
        //  var results = [];
        var Queue = new LinkQueue();
        //创建访问数组
        var visit = [];
        //图初始节点入队
        var p = this.vertex[0];
        if (p == null || p == undefined) return null;
        var node = new Node(p, null, null);
        node.distance = 0;
        var minTree = new MinTree();
        minTree.root = node;
        //  results.push(p);
        visit[p] = true;
        Queue.EnQueue(node);
        while (!Queue.IsEmpty()) {
            //出队
            var qnode = Queue.DeQueue();
            // var qnode = new Node(q, null, null);
            var lastnode = null;
            var sides = this.side.get(qnode.key);
            for (var i = 0; i < sides.length; i++) {
                if (!visit[sides[i]]) {
                    //如果未被访问过，则访问并入队
                    //出队的的都是兄弟
                    var snode = new Node(sides[i], null, null);
                    if (lastnode == null) {
                        qnode.lchild = snode;
                        // lastnode = snode;
                    } else {
                        lastnode.rchild = snode;
                    }
                    // d[sides[i]] = d[q] + 1;
                    snode.distance = qnode.distance + 1;
                    Queue.EnQueue(snode);
                    visit[sides[i]] = true;
                    lastnode = snode;
                }
            }
        }
        return minTree;
    }
    BFS_MintreeToBinarytree(minTree) {
        //上面这个孩子兄弟表示法就是二叉树，就不用转了
    }
}
var graph = new ALGraph();
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; //{7} 
for (var i = 0; i < myVertices.length; i++) { //{8} 
    graph.addVertex(myVertices[i]);
}
graph.addSide('A', 'B'); //{9} 
graph.addSide('A', 'C');
graph.addSide('A', 'D');
graph.addSide('C', 'D');
graph.addSide('C', 'G');
graph.addSide('D', 'G');
graph.addSide('D', 'H');
graph.addSide('B', 'E');
graph.addSide('B', 'F');
graph.addSide('E', 'I');
console.log(graph.BFS_Mintree());