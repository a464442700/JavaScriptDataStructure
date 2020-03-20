//带哨兵的插入排序
function insertSortBySentry(A) {
    var i, j;
    var n = A.length;
    for (i = 2; i < n; i++) {
        if (A[i] < A[i - 1]) {
            A[0] = A[i];
            for (j = i - 1; A[0] < A[j]; j--) {
                A[j + 1] = A[j]
            } //end for
            A[j + 1] = A[0];
        } //end if
    } //end for
    return A
}
//插入排序
function insertSort(A) {
    var j, temp;
    var n = A.length;
    for (var i = 1; i < n; i++) {
        j = i;
        temp = A[i];
        while (j > 0 && A[j - 1] > temp) {
            A[j] = A[j - 1];
            j--;
        }
        A[j] = temp;
    } //end for
    return A
}
//折半插入排序
function binaryInsertSort(A) {
    //折半查找待插入的位置，然后移动元素
    var temp, high, low, mid;
    var n = A.length;
    for (var i = 1; i < n; i++) {
        low = 0;
        high = i - 1;
        temp = A[i];
        while (low <= high) {
            mid = Math.ceil((high + low) / 2);
            if (A[mid] > temp) {
                high = mid - 1;
                // mid = high;
            } else if (A[mid] < temp) {
                low = mid + 1;
                //  mid = low;
            } else if (A[mid] == temp) {
                low = mid + 1;
                break;
            }
        }
        //  mid = mid + 1;
        //mid就是所要求的插入位置，将mid后面的一项一项挪动
        for (var j = i - 1; j >= low; j--) {
            A[j + 1] = A[j];
        }
        A[low] = temp;
    } //end for i 
    return A;
}
//希尔排序
function shellSort(A) {
    var dk;
    var j, temp;
    var n = A.length;
    for (dk = Math.floor(n / 2); dk >= 1; dk = Math.floor(dk / 2)) {
        for (var i = dk; i < n; i++) {
            j = i;
            temp = A[i];
            while (j > 0 && A[j - dk] > temp) {
                A[j] = A[j - dk];
                j = j - dk;
            }
            A[j] = temp;
        } //end for i
    } //end for dk
    return A
}
//冒泡排序
function bubbleSort(A) {
    var n = A.length;
    var temp;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i; j++) {
            if (A[j + 1] < A[j]) {
                temp = A[j + 1];
                A[j + 1] = A[j];
                A[j] = temp;
            }
        }
    }
    return A;
}
//快速排序
function quickSort(A) {
    function partition(A, low, high) {
        //   var pivot = A[low];
        var mid = Math.floor((low + high) / 2);
        var pivot = A[mid];
        var temp = A[low];
        while (low < high) {
            while (low < high && A[high] > pivot) high--;
            A[low] = A[high];
            while (low < high && A[low] < pivot) low++;
            A[high] = A[low];
        }
        A[low] = temp;
        return low;
    }

    function sort(A, low, high) {
        if (low < high) {
            var pivotpos = partition(A, low, high);
            sort(A, low, pivotpos - 1);
            sort(A, pivotpos + 1, high);
        }
    }
    sort(A, 0, A.length);
    return A;
}
//选择排序
function selectionSort(A) {
    for (var i = 0; i < A.length; i++) {
        var min = i;
        for (var j = i + 1; j < A.length; j++) {
            if (A[j] < A[min]) min = j;
        }
        if (min != i) {
            var temp = A[min];
            A[min] = A[i];
            A[i] = temp;
        }
    }
    return A;
}
//堆排序
function heapSort(A) {
    //初始化顺序表示(数组)的完全二叉树
    //从n/2开始，调整该节点使得n/2比n和n-1都大
    //然后依次调整n/2-1,n/2-2,一直到0
    function buildMaxHeap(A) {
        var n = A.length;
        for (var i = Math.floor(n / 2); i >= 0; i--) {
            adjustDown(A, i, n);
        }
    }
    //从i开始，将i作为堆的顶点，这颗子树是大顶堆
    //一次交换排序完后，A[n]将会是最大的值，那么下一次调整n=n-1
    //所以要传入这个n变量
    function adjustDown(A, i, n) {
        var large, temp;
        for (var j = i * 2; j < n; j = j * 2) {
            //获取左右节点较大的那一个
            if (A[j + 1] > A[j]) large = j + 1;
            else large = j;
            if (A[i] >= A[large]) break;
            else {
                //交换A[i]和A[large]
                temp = A[i];
                A[i] = A[large];
                A[large] = temp;
                i = large;
                //现在A[large]变小了，那么以A[large]为根的堆，需要重新调整
            }
        }
    }
    buildMaxHeap(A);
    var n = A.length;
    var temp;
    for (var i = n; i > 0; i--) {
        //堆顶元素和最后一个元素交换，这样最后一个元素就是最大的
        temp = A[0];
        A[0] = A[i];
        A[i] = temp;
        adjustDown(A, 0, i - 1);
    }
    return A;
}
//归并排序
function mergeSort(A) {
    //合并两个有序数组
    function merge(A, i, mid, j) {
        var m = i;
        var n = mid + 1;
        var temp;
        var B = [];
        while (m <= mid && n <= j) {
            if (A[m] < A[n]) {
                B.push(A[m]);
                m++;
            } else {
                B.push(A[n]);
                n++;
            } //end if
        } //end while
        if (m <= mid) {
            while (m <= mid) {
                B.push(A[m++]);
            }
        }
        if (n <= j) {
            while (n <= j) {
                B.push(A[n++]);
            }
        }
        for (var k = 0; k < B.length; k++) {
            A[i + k] = B[k];
        }
    }

    function sort(A, i, j) {
        if (i < j) {
            var mid = Math.floor((i + j) / 2);
            sort(A, i, mid);
            sort(A, mid + 1, j);
            merge(A, i, mid, j);
        }
    }
    sort(A, 0, A.length - 1);
    return A;
}
//基数排序 目前只满足正整数排序
function radixSort(A) {
    class LinkLnode {
        constructor() {
            this.data = null; //数据
            this.next = null; //指针
        }
    }
    //链式队列比链表多了队头队尾指针
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

    function getMaxBit(A) {
        var max = 0;
        for (var i = 0; i < A.length; i++) {
            if (A[max] < A[i]) max = i;
        }
        var i = 1;
        while (A[max] / 10 ** i >= 1) {
            i++;
        }
        return i;
    }

    function sort(A) {
        var Q = [];
        for (var i = 0; i < 10; i++) {
            Q.push(new LinkQueue());
        }
        var bit = getMaxBit(A);
        for (var j = 0; j < bit; j++) {
            for (var i = 0; i < A.length; i++) {
                var num = Math.floor(A[i] % 10 ** (j + 1) / 10 ** j);
                Q[num].EnQueue(A[i]);
            } //end for i
            //循环一遍后，所有的数已放入队列中，然后将队列值赋值给数组A
            for (var i = 0, k = 0; i < Q.length; i++) {
                while (!Q[i].IsEmpty()) {
                    A[k++] = Q[i].DeQueue();
                } //end while
            } //end for
        } //end for j
        return A;
    }
    sort(A);
}
//产生n个降序排列的数组
function getA(n) {
    var A = [];
    for (var i = n; i > 0; i--) {
        A[n - i] = i;
    }
    return A;
}
var A1 = getA(2 ** 18);
var A2 = getA(2 ** 18 + 1);
var A3 = getA(2 ** 18 + 2);
var A4 = getA(2 ** 18 + 3);
var A5 = getA(2 ** 18 + 4);
var A6 = getA(2 ** 18 + 5);
var A7 = getA(2 ** 18 + 6);
var A8 = getA(2 ** 18 + 7);
var A9 = getA(2 ** 18 + 8);
var A10 = getA(2 ** 18 + 9);
var A11 = getA(2 ** 18 + 10);
console.time('带哨兵的直接插入排序');
insertSortBySentry(A1);
console.timeEnd('带哨兵的直接插入排序');

console.time('不带哨兵的直接插入排序');
insertSort(A2);
console.timeEnd('不带哨兵的直接插入排序');

console.time('自带排序函数');

A11.sort(function(a, b) {
    return b - a;
});
console.timeEnd('自带排序函数');
console.time('折半插入排序');
binaryInsertSort(A3);
console.timeEnd('折半插入排序');
console.time('希尔排序');
shellSort(A4);
console.timeEnd('希尔排序');
console.time('冒泡排序');
bubbleSort(A5);
console.timeEnd('冒泡排序');
console.time('快速排序');
bubbleSort(A6);
console.timeEnd('快速排序');
console.time('选择排序');
bubbleSort(A7);
console.timeEnd('选择排序');
console.time('堆排序');
bubbleSort(A8);
console.timeEnd('堆排序');
console.time('归并排序');
mergeSort(A9);
console.timeEnd('归并排序');
console.time('基数排序');
radixSort(A10);
console.timeEnd('基数排序');