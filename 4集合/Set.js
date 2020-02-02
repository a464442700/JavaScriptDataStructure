class Set {
    constructor() {
        this.items = {};
    }
    has(value) {
        return this.items.hasOwnProperty(value);
    }
    add(value) {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }
    remove(value) {
        if (this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    }
    clear() {
        this.items = {}; //如果写成null就是空对象，写出{}是初始化
    }
    size() {
        return Object.keys(this.items).length;
    }
    values() {
        let values = [];
        for (let i = 0, keys = Object.keys(this.items); i < keys.length; i++) {
            values.push(this.items[keys[i]]);
        }
        return values;
    }
    union(otherSet) {
        let unionSet = new Set();
        //考虑集合大小好像写的没有意义
        if (this.size() > otherSet.size()) {
            unionSet.items = JSON.parse(JSON.stringify(this.items)); //网上找的复制对象方法
            for (let i = 0, keys = Object.keys(otherSet.items); i < keys.length; i++) {
                unionSet.add(keys[i]);
            }
        } else {
            unionSet.items = JSON.parse(JSON.stringify(otherSet.items));
            for (let i = 0, keys = Object.keys(this.items); i < keys.length; i++) {
                unionSet.add(keys[i]);
            }
        }
        return unionSet;
    }
    intersection(otherSet) {
        let inSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                inSet.add(values[i]);
            }
        }
        return inSet;
    }
    difference(otherSet) {
        let diSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                diSet.add(values[i]);
            }
        }
        return diSet;
    }
    subset(otherSet) {
        if (this.size() < otherSet.size()) return false;
        let values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            if (!this.has(values[i])) {
                return false;
            }
        }
        return true;
    }
}
export {
    Set
};