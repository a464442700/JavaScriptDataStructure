//我想了一下，这个算法应该是一个函数，不应该是一个类，函数传入参数是图对象
class Dijkstra {
    //用邻接矩阵表示
    //就是一个二维数组，数组的第一维的每一个元素是一个数组，是各个顶点和邻边的信息
    //第二维的第i个元素是该顶点到第i个顶点的权值
    constructor() {
        this.sides = []; //存放的是数组，第一个元素代表第一个点与其它相邻点的距离
        this.vertex = new Map(); //存放下标和字符的关系
        this.length = 0; //顶点个数
        this.index = []; //下标找到字符
    }
    addVertex(v) {
        //this.sides[this.length][0]=0;
        this.vertex.set(v, this.length);
        this.index[this.index.length] = v;
        this.sides[this.length] = [];
        this.sides[this.length][this.length] = 0;
        this.length++;
    }
    addSide(a, b, value) {
        var i = this.vertex.get(a);
        var j = this.vertex.get(b);
        this.sides[i][j] = value;
    }
    //顶点a到点b的最短路径
    //b为空则返回点a到所有点的最短路径
    //返回的是一个链表
    minPath(a, b) {
        var S = new Set();
        var dist = []; //距离数组
        var path = []; //path是树，二维数组
        //先初始化
        var e = this.vertex.get(a);
        S.add(e); //将顶点A对应的下标先放入集合S中，也可以直接放入顶点字符
        var es = this.sides[e];
        // var V = new Set();
        // //V代表顶点集合
        // for (var key of this.vertex.keys()) {
        //     V.add(key);
        // }
        //数组初始化
        for (var i = 0; i < es.length; i++) {
            dist[i] = (es[i] == null) ? Infinity : es[i];
            if (es[i] == null) {
                path.push([this.index[i], null, dist[i]]);
            } else {
                path.push([this.index[i], a, dist[i]]);
            }
        }
        //当集合里存放了所有顶点则结束循环
        // var path = new LinkList();
        // path.add(a, 0);
        while (S.size < this.length) {
            //找到dist数组中的最小值，且顶点不能出现在S中
            var minj = Infinity;
            var j = null;
            for (var i = 0; i < dist.length; i++) {
                if (!S.has(i)) {
                    if (dist[i] < minj) {
                        j = i;
                        minj = dist[i];
                    }
                }
            } //end for
            //循环完毕找到了最小的j，假设j对应的顶点为B
            if (j == null) break; //表示剩下的顶点距离都是无穷大，结束循环
            S.add(j);
            // path.add(this.index[j], dist[j]);
            //将j对应的顶点字符和dist[j]加入链表
            //再次循环dist，设起点为i,如果ij+jk<ik,则修改dist[k]=dist[j]+sides[j][k]
            for (var i = 0; i < dist.length; i++) {
                if (!S.has(i)) {
                    if (dist[j] + this.sides[j][i] < dist[i]) {
                        dist[i] = dist[j] + this.sides[j][i];
                        path[i][1] = this.index[j];
                        path[i][2] = dist[i];
                    }
                }
            }
        } //end while
        //  console.log(dist);
        //循环结束后查找链表的值
        return this.pathToLine(path, b);
    }
    //输出最短路径和长度
    pathToLine(path, b) {
        //先获取b对应的元素下标
        var j;
        var distance;
        for (var i = 0; i < path.length; i++) {
            if (path[i][0] == b) {
                j = i;
                distance = path[j][2];
                break;
            }
        }
        var p = path[j][1];
        var list = path[j][0];
        while (p != null) {
            list = list + ' ' + p;
            var k = this.vertex.get(p);
            p = path[k][1];
        }
        return {
            "list": list,
            "distance": distance
        };
    }
}

function main() {
    var graph = new Dijkstra();
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
    //补充下面的边变成无向带权图
    // graph.addSide('B', 'A', 1);
    // graph.addSide('C', 'A', 1);
    // graph.addSide('F', 'A', 100);
    // graph.addSide('F', 'B', 10);
    // graph.addSide('D', 'C', 1);
    // graph.addSide('F', 'D', 1);
    console.log(graph.minPath('A', 'F'));
}
window.onload = main;