class Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}
class LinkList {
    constructor() {
        this.head = new Node();
        this.tail = new Node();
        this.head = this.tail;
    }
    add(value) {
        var p = new Node(value, null);
        this.tail.next = p;
        this.tail = p;
    }
    //
    link(lista, listb) {
        this.tail = this.head;
        var pa = lista.head.next;
        var pb = listb.head.next.next;
        while (pa != null) {
            var p = new Node(pa.data, null);
            this.tail.next = p;
            this.tail = p;
            pa = pa.next;
        }
        while (pb != null) {
            var p = new Node(pb.data, null);
            this.tail.next = p;
            this.tail = p;
            pb = pb.next;
        }
        // var p = list.head.next;
        // //   this.tail = this.head.next;
        // // this.tail.next = null;
        // //一种写法
        // while (p != null) {
        //     var q = new Node(p.data, null);
        //     this.tail.next = q;
        //     this.tail = q;
        //     p = p.next;
        // }
        //另一种写法
        //this.tail.next=list.head.next;
    }
    traverse() {
        var path = [];
        var p = this.head.next;
        while (p) {
            path.push(p.data);
            p = p.next;
        }
        return path;
    }
}
class Floyd {
    constructor() {
        this.sides = []; //存放的是数组，第一个元素代表第一个点与其它相邻点的距离
        this.vertex = new Map(); //存放下标和字符的关系，这里的字符可以也可以传入对象
        this.index = []; //index通过下标找到字符
    }
    addVertex(v) {
        var i = this.vertex.size;
        this.vertex.set(v, i);
        this.index[this.index.length] = v;
        this.sides[i] = [];
        this.sides[i][i] = 0;
    }
    addSide(a, b, value) {
        var i = this.vertex.get(a);
        var j = this.vertex.get(b);
        this.sides[i][j] = value;
    }
    //上面跟迪杰斯特拉的图表示是相同的
    minPath(a, b) {
        //初始化
        var dist = [];
        var length = this.vertex.size;
        var path = [];
        for (var i = 0; i < length; i++) {
            dist[i] = [];
            path[i] = [];
            for (var j = 0; j < length; j++) {
                // path[i][j] = new //初始化，新建尾插法链表，i-j
                var list = new LinkList();
                list.add(i);
                list.add(j);
                path[i][j] = list;
                dist[i][j] = (this.sides[i][j] == null) ? Infinity : this.sides[i][j];
            }
        } //end for
        for (var k = 0; k < length; k++) {
            for (var j = 0; j < length; j++) {
                for (var i = 0; i < length; i++) {
                    if (i != j && k != i && k != j) {
                        if (dist[i][k] + dist[k][j] < dist[i][j]) {
                            dist[i][j] = dist[i][k] + dist[k][j];
                            path[i][j].link(path[i][k], path[k][j]);
                        }
                    }
                } //end for i
            } //end for j
        } //end for k 
        return this.pathToLine(dist, path, a, b);
    }
    pathToLine(dist, path, a, b) {
        var m = this.vertex.get(a);
        var n = this.vertex.get(b);
        var results = [];
        // for (var i = 0; i < dist.length; i++) {
        //     results[i] = [];
        //     for (var j = 0; j < dist.length; j++) //因为是方阵，所以可以这么写，否则j<dist[i].length
        //     {
        //         results[i][j] = {
        //             'dist': dist[i][j],
        //           //   'path': path[i][j].traverse().map(x=>this.index[x]).toSring()
        //             'path': path[i][j].traverse()
        //         };
        //     }
        // } //end for
        //  return dist[m][n];
        if (m!=null && n!=null) {
            return {
                'path': (path[m][n].traverse().map(x => this.index[x])).toString(),
                'dist': dist[m][n]
            };
        } //end if
        if (m!=null && n==null) {
            var results = [];
            var result = {};
            for (var i = 0; i < dist.length; i++) {
                result = {
                    'path': (path[m][i].traverse().map(x => this.index[x])).toString(),
                    'dist': dist[m][i]
                };
                results.push(result);
            }
            return results;
        } //end if
        if (m==null && n!=null) {
            var results = [];
            var result = {};
            for (var i = 0; i < dist.length; i++) {
                result = {
                    'path': (path[i][n].traverse().map(x => this.index[x])).toString(),
                    'dist': dist[i][n]
                };
                results.push(result);
            }
            return results;
        } //end if
        if (m ==null&& n==null) {
            var results = [];
            var result = {};
            for (var i = 0; i < dist.length; i++) {
            	results[i]=[];
                for (var j = 0; j < dist.length; j++) {
                    result = {
                        'path': (path[i][j].traverse().map(x => this.index[x])).toString(),
                        'dist': dist[i][j]
                    };
                    results[i][j]=result;
                }
            }
            return results;
        } //end if
    }
}
var graph = new Floyd();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('F');
graph.addSide('A', 'B', 10);
graph.addSide('A', 'C', 1);
graph.addSide('A', 'F', 100);
graph.addSide('B', 'F', 10);
graph.addSide('C', 'D', 1);
graph.addSide('D', 'F', 1);
graph.addSide('B', 'A', 10);
graph.addSide('C', 'A', 1);
graph.addSide('F', 'A', 100);
graph.addSide('F', 'B', 10);
graph.addSide('D', 'C', 1);
graph.addSide('F', 'D', 1);
console.log(graph.minPath('A','F'));

//console.log(graph.minPath(null,null));
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addSide('A', 'B', 6);
// graph.addSide('B', 'A', 10);
// graph.addSide('A', 'C', 13);
// graph.addSide('C', 'A', 5);
// graph.addSide('B', 'C', 4);
// console.log(graph.minPath('A', 'C'));
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addVertex('F');
// graph.addSide('A', 'B', 1);
// graph.addSide('B', 'C', 1);
// graph.addSide('C', 'D', 1);
// // graph.addSide('D', 'E', 1);
// // graph.addSide('E', 'F', 1);
// graph.addSide('A', 'D', 10);
// console.log(graph.minPath('A', 'D'));
