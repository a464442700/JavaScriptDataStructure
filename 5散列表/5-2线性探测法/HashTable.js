function getPrime(n) {
    if (n <= 3) {
        return n;
    }
    var isPrime = false;
    while (!isPrime) {
        isPrime = true;
        var sqrt = Math.ceil(Math.sqrt(n));
        for (var i = 2; i <= sqrt; i++) {
            if (n % i == 0) {
                isPrime = false;
                --n;
                break;
            }
        }
    }
    return n;
}
class HashNode {
    constructor(key, value) {
        this.value = value;
        this.key = key;
    }
}
class HashTable {
    constructor(n) {
        this.table = new Array(n);
    }
    hash(key) {
        let length = this.table.length;
        let p = getPrime(length);
        return key % p; //
    }
    put(key, value) {
        var p = new HashNode(key, value);
        var position = this.hash(key);
        var base = position;
        var i = -1; //记录循环次数
        while (this.table[position] != undefined) {
            if (++i > this.table.length - 1) return false;
            position = (base + i) % this.table.length;
        }
        this.table[position] = p;
        return true;
        //当找到一个空位存放键值对，或者循环完数组，都没找到空位，则结束循环
    }
    get(key) {
        var position = this.hash(key);
        var base = position;
        if (this.table[position] == undefined) {
            return false;
        } else {
            for (var i = 1; i <= this.table.length; i++) {
                if (this.table[position] != undefined && this.table[position].key === key) return this.table[position].value;
                else {
                    position = (base + i) % this.table.length;
                }
            }
        }
        return false;
    }
    remove(key) {
        var position = this.hash(key);
        var base = position;
        if (this.table[position] == undefined) {
            return false;
        } else {
            for (var i = 1; i <= this.table.length; i++) {
                if (this.table[position] != undefined && this.table[position].key === key) {
                    this.table[position] = undefined;
                    return true;
                } else {
                    position = (base + i) % this.table.length;
                }
            }
        }
        return false;
    }
}

export {
    HashTable
};