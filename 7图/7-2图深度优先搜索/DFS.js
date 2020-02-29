import SqStack from './SqStack.js';
class DFS {
    constructor() {
        this.vertex = [];
        this.side = new Map();
    }
    //增加顶点的方法
    addVertex(v) {
        this.vertex.push(v);
        this.side.set(v, []);
    }
    addSide(v, w) {
        this.side.get(v).push(w);
        this.side.get(w).push(v);
    }
    //深度优先遍历
    //递归实现
    //其实就是先序遍历
    DFS_Travel_Recursive() {
        var visited = [];
        var r = [];
        for (i = 0; i < this.vertex.length; i++) {
            if (!visited[this.vertex[i]]) {
                this.DFS_R(this.vertex[i], r, visited);
            }
        }
        return r;
    }
    //v代表顶点，遍历序列存入r
    DFS_R(v, r, visited) {
        r.push(v);
        visited[v] = true;
        for (var i = 0; i < this.side.get(v).length; i++) {
            if (!visited[this.side.get(v)[i]]) this.DFS_R(this.side.get(v)[i], r, visited);
        }
    }
    //非递归实现
    //二叉树的先序遍历的非递归写法是
    //出栈，访问节点，右孩子非空则入栈，左孩子非空则入栈，以此循环
    //换成深度优先搜索就是
    //出栈，访问顶点A，下一个顶点B入栈，该顶点A的边AC入栈
    DFS_Travel() {
        var visited = [];
        var r = [];
        var SqStackC = SqStack();
        var Stack = new SqStackC();
        var k = 0;
        var p = this.vertex[k];
        //起始节点入栈
        visited[p] = true;
        Stack.Push(p);
        while (!Stack.StackEmpty()) {
            //弹出顶点
            var v = Stack.Pop();
            r.push(v); //访问q
            //将q的所有边入栈
            //当前出栈的顶点A的边入栈  
            for (var i = 0; i < this.side.get(v).length; i++) {
                if (!visited[this.side.get(v)[i]]) {
                    Stack.Push(this.side.get(v)[i]);
                    visited[this.side.get(v)[i]] = true;
                }
            }
        }
        return r;
    }
}
var graph = new DFS();
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
console.log(graph.DFS_Travel());
//结果和非递归的顺序不一样
// var myVertices = ['1', '2', '3', '4', '5', '6']; //{7} 
// for (var i = 0; i < myVertices.length; i++) { //{8} 
//     graph.addVertex(myVertices[i]);
// }
// graph.addSide('4', '6');
// graph.addSide('1', '2');
// graph.addSide('3', '5');
// graph.addSide('1', '3');
// graph.addSide('2', '4');
// console.log(graph.DFS_Travel());