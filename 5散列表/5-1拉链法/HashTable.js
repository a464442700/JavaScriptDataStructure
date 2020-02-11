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
    constructor() {
        this.value = null;
        this.key = null;
        this.next = null;
    }
}
//需要一个链表记录键值对
class LinkList {
    constructor() {
        this.HeadNode = new HashNode(); //带头节点空链表
        this.rail = this.HeadNode; //尾插法，表尾指针指向头节点
    }
    append(p) {
        this.rail.next = p;
        this.rail = p;
    }
}
class HashTable {
    constructor(n) {
        //m为定长数组的大小，如果不设定数组大小则需要修改散列函数
        this.table = new Array(n);
    }
    //散列函数采取除留余数法
    hash(key) {
        let length = this.table.length;
        let p = getPrime(length); //获取小于数组长度的素数
        return key % p; //
    }
    put(key, value) {
        var position = this.hash(key); //position是数组的位置
        if (this.table[position] == undefined) {
            //如果数组没有值，则给数组填充一个空的头节点
            //头节点可以存储该链表的长度
            this.table[position] = new LinkList();
        }
        var p = new HashNode();
        p.key = key;
        p.value = value;
        this.table[position].append(p);
    }
    get(key) {
        var position = this.hash(key); //position是数组的位置
        if (this.table[position] == undefined) {
            return undefined;
        } else {
            //循环链表
            var p = this.table[position].HeadNode.next;
            while (p != null) {
                if (p.key === key) {
                    return p.value;
                }
                p = p.next;
            }
            return undefined;
        }
    }
    remove(key) {
        var position = this.hash(key);
        if (this.table[position] == undefined) {
            return false;
        } else {
            var l = this.table[position].HeadNode;
            var p = l.next;
            while (p != null) {
                if (p.key === key) {
                    //  return p.value;
                    l.next = p.next;
                    //判断p是唯一的节点
                    if (p.next == null) {
                        this.table[position] = undefined;
                    }
                    return true;
                }
                l = p;
                p = p.next;
            }
            return false;
        }
    }
}
export {
    HashTable
};