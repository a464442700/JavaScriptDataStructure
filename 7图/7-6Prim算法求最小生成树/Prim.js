class Prime {
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
        this.sides[i][i] = 0;
    }
    addSide(a, b, value) {
        var i = this.vertex.get(a);
        var j = this.vertex.get(b);
        this.sides[i][j] = value;
        this.sides[j][i] = value; //无向图
    }
    minTree() {
        var VT = new Set();
        var path = []; //path是双亲表示法表示的树
        var u = 0;
        path[0] = {
            'F': null,
            'S': null
        };
        VT.add(u);
        while (VT.size < this.vertex.size) {
            var minSide = Infinity; //(this.sides[u][0] == null) ? Infinity : this.sides[u][0];
            var minv = 0;
            var minu = 0;
            for (u of VT) {
                for (var v = 0; v < this.sides[u].length; v++) {
                    if (!VT.has(v) && u != v) {
                        //找到边最小的值
                        if (minSide > ((this.sides[u][v] == null) ? Infinity : this.sides[u][v])) {
                            minSide = this.sides[u][v];
                            minv = v;
                            minu = u;
                            //    u = minv;
                        }
                    }
                } //end for 
            } //end for
            //u到minv权值最小
            //minv加入VT集合
            path[minv] = {
                'F': minu,
                'S': minSide
            };
            u = minv;
            VT.add(u);
        } //end while
        return path;
    }

}
var graph = new Prime();
graph.addVertex('V1');
graph.addVertex('V2');
graph.addVertex('V3');
graph.addVertex('V4');
graph.addVertex('V5');
graph.addVertex('V6');
graph.addSide('V1', 'V3', 1);
graph.addSide('V1', 'V2', 6);
graph.addSide('V1', 'V4', 5);
graph.addSide('V2', 'V3', 5);
graph.addSide('V4', 'V3', 5);
graph.addSide('V2', 'V5', 3);
graph.addSide('V4', 'V6', 2);
graph.addSide('V3', 'V5', 6);
graph.addSide('V3', 'V6', 4);
graph.addSide('V5', 'V6', 6);
var path=graph.minTree();//输出双亲表示法的树
