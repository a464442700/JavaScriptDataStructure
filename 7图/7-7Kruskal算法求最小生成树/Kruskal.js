class Kruskal {
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