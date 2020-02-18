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
        if (keys != null) {
            for (var i = 0; i < keys.length; i++) {
                this.BST_Insert(this.root, keys[i]);
            }
        }
    }
    // BST_Insert(T, key) {
    //     if (T == null) {
    //         this.root = new BST_Node(key, null, null);
    //     } else {
    //         if (key < T.key) {
    //             if (T.lchild == null) {
    //                 T.lchild = new BST_Node(key, null, null);
    //                 return true;
    //             } else {
    //                 this.BST_Insert(T.lchild, key); //要加this，不加显示函数未定义
    //             }
    //         } else if (key > T.key) {
    //             if (T.rchild == null) {
    //                 T.rchild = new BST_Node(key, null, null);
    //                 return true;
    //             } else {
    //                 this.BST_Insert(T.rchild, key);
    //             }
    //         } else if (key === T.key) {
    //             return false;
    //         }
    //     }
    // }
    //在做旋转的时候，需要知道当前节点是父节点的左儿子还是右儿子，方法之一是调用
    //BST_Search获取当前的节点状态，还有一种方法是修改BST_Insert函数，增加父节点参数
    //BST_Insert(F,T, key)，最好是修改一下，但是我想了一下，当只有树不平衡的时候才需要查询，
    //因此性能上也不会损失太多，以后写代码最好还是传入父节点，提升性能
    //当然不传入父节点也能进行旋转操作，但是过于繁琐
    //因为只修改了插入和删除操作，正常操作应该是平衡树继承排序树，然后重写这两个方法，为图方便我直接在原有基础上修改
    Rotate_RR(T) {
        console.log('RR旋转' + T.key);
        var q = this.BST_Search(this.root, T.key);
        var p = T.rchild;
        T.rchild = p.lchild;
        p.lchild = T;
        if (T == this.root) {
            this.root = p;
        } else {
            if (q.S == 'l') q.F.lchild = p;
            if (q.S == 'r') q.F.rchild = p;
        }
    }
    Rotate_RL(T) {
        console.log('RL旋转' + T.key);
        var q = this.BST_Search(this.root, T.key);
        var b = T.rchild;
        var c = b.lchild;
        b.lchild = c.rchild;
        c.rchild = b;
        //T.rchild = c;
        T.rchild = c.lchild;
        c.lchild = T;
        if (T == this.root) {
            this.root = c
        } else {
            if (q.S == 'l') q.F.lchild = c;
            if (q.S == 'r') q.F.rchild = c;
        }
    }
    Rotate_LL(T) {
        console.log('LL旋转' + T.key);
        var q = this.BST_Search(this.root, T.key);
        var p = T.lchild;
        T.lchild = p.rchild;
        p.rchild = T;
        if (T == this.root) {
            this.root = p;
        } else {
            if (q.S == 'l') q.F.lchild = p;
            if (q.S == 'r') q.F.rchild = p;
        }
    }
    Rotate_LR(T) {
        console.log('LR旋转' + T.key);
        var q = this.BST_Search(this.root, T.key);
        var b = T.lchild;
        var c = b.rchild;
        b.rchild = c.lchild;
        c.lchild = b;
        //T.rchild = c;
        T.lchild = c.rchild;
        c.rchild = T;
        if (T == this.root) {
            this.root = c
        } else {
            if (q.S == 'l') q.F.lchild = c;
            if (q.S == 'r') q.F.rchild = c;
        }
    }
    BST_Insert(T, key) {
        if (T == null) {
            this.root = new BST_Node(key, null, null);
        } else {
            if (key < T.key) {
                if (T.lchild == null) {
                    T.lchild = new BST_Node(key, null, null);
                    return true;
                } else {
                    this.BST_Insert(T.lchild, key); //要加this，不加显示函数未定义
                    if ((this.BST_Height(T.lchild) - this.BST_Height(T.rchild)) == 2) {
                        if (
                            //T.rchild.lchild != null && T.rchild.rchild != null &&
                            this.BST_Height(T.lchild.lchild) - this.BST_Height(T.lchild.rchild) == 1) {
                            this.Rotate_LL(T);
                        } //end RR
                        else if (
                            //    T.rchild.lchild != null && T.rchild.rchild != null && 
                            this.BST_Height(T.lchild.lchild) - this.BST_Height(T.lchild.rchild) == -1) {
                            this.Rotate_LR(T);
                        }
                    } //end 
                }
            } else if (key > T.key) {
                if (T.rchild == null) {
                    T.rchild = new BST_Node(key, null, null);
                    return true;
                } else {
                    this.BST_Insert(T.rchild, key);
                    //判断需要进行RR选择还是RL旋转
                    //当插入完成，插入函数退栈的时候进行旋转操作
                    if ((this.BST_Height(T.lchild) - this.BST_Height(T.rchild)) == -2) {
                        if (
                            //T.rchild.lchild != null && T.rchild.rchild != null &&
                            this.BST_Height(T.rchild.lchild) - this.BST_Height(T.rchild.rchild) == -1) {
                            this.Rotate_RR(T);
                        } //end RR
                        else if (
                            //    T.rchild.lchild != null && T.rchild.rchild != null && 
                            this.BST_Height(T.rchild.lchild) - this.BST_Height(T.rchild.rchild) == 1) {
                            this.Rotate_RL(T);
                        }
                    } //end 
                }
            } else if (key === T.key) {
                return false;
            }
        }
    }
    //查找以root为根节点的树
    BST_Search(root, key) {
        //var F = new BST_Node(null, root, root); //修改
        var F = null;
        // if (key == this.root.key) F = new BST_Node(null, root, root);
        var T = root;
        var S = null; //S用来记录T的是F的左儿子还是右儿子
        while (T != null && key != T.key) {
            F = T;
            if (key < T.key) {
                S = 'l';
                T = T.lchild;
            } else if (key > T.key) {
                S = 'r';
                T = T.rchild;
            }
        }
        return {
            F, //父节点
            T, //当前节点
            S
        };
    }
    //查找以T为根节点，其子树最小的值
    BST_SearchMin(T) {
        var F = null;
        if (T == null) return null;
        else {
            while (T != null && T.lchild != null) {
                F = T;
                T = T.lchild;
            }
            return {
                F,
                T
            };
        }
    }
    //查找以T为根节点，其子树最大的值，返回父节点和当前节点
    BST_SearchMax(T) {
        var F = null;
        if (T == null) return null;
        else {
            while (T != null && T.rchild != null) {
                F = T;
                T = T.rchild;
            }
            return {
                F,
                T
            };
        }
    }
    //删除节点
    BST_Delete(root, key) {
        //找到该节点
        var p = this.BST_Search(root, key);
        if (p.T == null) return null;
        //叶子节点
        if (p.T.lchild == null && p.T.rchild == null) {
            //如果删除到最后只有一个根节点
            if (p.T == this.root) {
                this.root = null;
                return;
            }
            p.S == 'l' ? p.F.lchild = null : p.F.rchild = null;
        }
        //只有一个子节点,儿子取代父亲
        if (p.T.lchild == null && p.T.rchild != null) {
            //由于不支持指针变量，只能用下面的传值的方法
            //假如支持指针变量，直接将要删除的节点的指针放入S中，然后S=null就执行了删除操作
            p.S == 'l' ? p.F.lchild = p.T.rchild : p.F.rchild = p.T.rchild;
        }
        if (p.T.rchild == null && p.T.lchild != null) {
            //由于不支持指针变量，只能用下面的传值的方法 
            //假如支持指针变量，直接将要删除的节点的指针放入S中，然后S=null就执行了删除操作
            //当p是根节点的时候，会出错，因此加一个判断
            if (p.T == this.root) {
                this.root = p.T.lchild;
                return;
            }
            p.S == 'l' ? p.F.lchild = p.T.lchild : p.F.rchild = p.T.lchild;
        }
        //如果有两个子节点
        if (p.T.rchild != null && p.T.lchild != null) {
            //先找以右儿子为根节点的树的最小的节点，替换当前节点
            //删除最小的节点
            var rs = this.BST_SearchMin(p.T.rchild);
            this.BST_Delete(p.T, rs.T.key);
            p.T.key = rs.T.key; //将右子树的最小节点的值赋值回来
        }
    }
    //删除成功后，判断是否需要平衡，T是父节点，然后循环调用
    BST_Del_Rotaion(T) {
        while (T != null || T != undefined) {
            var F = this.BST_Search(this.root, T.key).F;
            if ((this.BST_Height(T.lchild) - this.BST_Height(T.rchild)) == 2) {
                if (
                    //T.rchild.lchild != null && T.rchild.rchild != null &&
                    this.BST_Height(T.lchild.lchild) - this.BST_Height(T.lchild.rchild) == 1 || this.BST_Height(T.lchild.lchild) - this.BST_Height(T.lchild.rchild) == 0) {
                    this.Rotate_LL(T);
                } //end RR
                else if (
                    //    T.rchild.lchild != null && T.rchild.rchild != null && 
                    this.BST_Height(T.lchild.lchild) - this.BST_Height(T.lchild.rchild) == -1) {
                    this.Rotate_LR(T);
                }
            } //end 
            if ((this.BST_Height(T.lchild) - this.BST_Height(T.rchild)) == -2) {
                if (
                    //T.rchild.lchild != null && T.rchild.rchild != null &&
                    this.BST_Height(T.rchild.lchild) - this.BST_Height(T.rchild.rchild) == -1 || this.BST_Height(T.rchild.lchild) - this.BST_Height(T.rchild.rchild) == 0) {
                    this.Rotate_RR(T);
                } //end RR
                else if (
                    //    T.rchild.lchild != null && T.rchild.rchild != null && 
                    this.BST_Height(T.rchild.lchild) - this.BST_Height(T.rchild.rchild) == 1) {
                    this.Rotate_RL(T);
                }
            } //end 
            T = F;
        }
    }
    //2020-2-15新增计算树的高度,RR,RL,LL,LR旋转
    BST_Height(T) {
        if (T == null) return -1; //也可以return 0 ,这样最下面一层的高度是1而不是0
        return Math.max(this.BST_Height(T.rchild), this.BST_Height(T.lchild)) + 1;
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
    //先序遍历,结果放入数组中
    PreOrder(T) {
        if (T != null) {
            this.travels.push(T.key);
            this.PreOrder(T.lchild);
            this.PreOrder(T.rchild);
        }
    }
    //中序遍历
    InOrder(T) {
        if (T != null) {
            this.PreOrder(T.lchild);
            this.travels.push(T.key);
            this.PreOrder(T.rchild);
        }
    }
    //后序遍历
    PostOrder(T) {
        if (T != null) {
            this.PreOrder(T.lchild);
            this.PreOrder(T.rchild);
            this.travels.push(T.key);
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
                var lnode = new View_Node();
                lnode.node = p.node.lchild;
                lnode.x = p.x - t;
                lnode.y = p.y + t;
                var line = new Line(p.x - 5, p.y + 5, lnode.x + 15, lnode.y - 15);
                lnode.line = line;
                Queue.EnQueue(lnode);
            }
            if (p.node.rchild != null) {
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
    order();
}

function insert() {
    var node = document.getElementById('nodeinsert');
    node = Number(node.value);
    var oneBST = window.BST;
    oneBST.BST_Insert(oneBST.root, node);
    console.log(oneBST.root);
    oneBST.view();
    window.BST = oneBST;
    order();
}

function del() {
    var node = document.getElementById('nodedelete');
    node = Number(node.value);
    var oneBST = window.BST;
    var F = oneBST.BST_Search(oneBST.root, node).F;
    oneBST.BST_Delete(oneBST.root, node);
    if (F == null) F = oneBST.root;
    oneBST.BST_Del_Rotaion(F);
    //console.log(oneBST.root);
    oneBST.view();
    window.BST = oneBST;
    order();
}

function max() {
    var node = document.getElementById('nodemax');
    node = Number(node.value);
    var oneBST = window.BST;
    var root = oneBST.BST_Search(oneBST.root, node);
    var p = oneBST.BST_SearchMax(root.T);
    var maxlabel = document.getElementById('maxlabel');
    if (p == null) {
        maxlabel.innerHTML = 'not found';
    } else {
        maxlabel.innerHTML = p.T.key;
    }
}

function min() {
    var node = document.getElementById('nodemin');
    node = Number(node.value);
    var oneBST = window.BST;
    var root = oneBST.BST_Search(oneBST.root, node);
    var p = oneBST.BST_SearchMin(root.T);
    var maxlabel = document.getElementById('minlabel');
    if (p == null) {
        maxlabel.innerHTML = 'not found';
    } else {
        maxlabel.innerHTML = p.T.key;
    }
}

function order() {
    var oneBST = window.BST;
    oneBST.travels = [];
    oneBST.PreOrder(oneBST.root);
    var pretravels = oneBST.travels;
    var prelabel = document.getElementById('pre');
    prelabel.innerHTML = pretravels.toString();
    oneBST.travels = [];
    oneBST.InOrder(oneBST.root);
    var intravels = oneBST.travels;
    var inlabel = document.getElementById('in');
    inlabel.innerHTML = intravels.toString();
    oneBST.travels = [];
    oneBST.PostOrder(oneBST.root);
    var posttravels = oneBST.travels;
    var postlabel = document.getElementById('post');
    postlabel.innerHTML = posttravels.toString();
}