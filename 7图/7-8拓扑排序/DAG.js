import SqStack from './SqStack.js';
class DAG {
    constructor() {
        this.sides = [];
        this.vertex = new Map();
        this.index = [];
    }
    addVertex(v) {
        var i = this.vertex.size;
        this.vertex.set(v, i);
        this.index[this.index.length] = v;
        this.sides[i] = [];
        this.sides[i][i] = null;
    }
    addSide(a, b, value) {
        var i = this.vertex.get(a);
        var j = this.vertex.get(b);
        if (value == null) value = 1;
        this.sides[i][j] = value;
        // this.sides[j][i] = value; //无向图
    }
    sort() {
        //数组存储结果
        var results = [];
        //初始化数组indegree,记录每一个顶点的入度
        var indegree = new Array(this.vertex.size);
         for (var i=0 ;i<indegree.length;i++){
            indegree[i]=0;
         }
        for (var i = 0; i < this.sides.length; i++) {
            for (var j = 0; j < this.sides[i].length; j++) {
                if (this.sides[i][j] != null) {
               //     if (!indegree[j]) indegree[j] = 0;
                    indegree[j]++;
                }
            }
        } //end for 
        //将入度为0的顶点入栈
        var SqStackF = SqStack();
        var Stack = new SqStackF();
        for (var i = 0; i < indegree.length; i++) {
            if (indegree[i] == 0) Stack.Push(i);
        }
        while (!Stack.StackEmpty()) {
            var u = Stack.Pop();
            results.push(u);
            for (var v = 0; v < this.sides[u].length; v++) {
                if (this.sides[u][v] != null) {
                    indegree[v]--;
                    if (indegree[v] == 0) {
                        Stack.Push(v);
                    }
                }
            }
        } //end while
        if (results.length != this.vertex.size) {
            return false;
        } else {
            return results;
        }
    }
}
var graph = new DAG();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addSide(1, 2);
graph.addSide(1, 4);
graph.addSide(2, 4);
graph.addSide(2, 3);
graph.addSide(4, 3);
graph.addSide(3, 5);
graph.addSide(4, 5);
console.log(graph.sort().map(x=>graph.index[x]));
