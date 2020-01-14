 class SqList {
     //2020/1/10
     //python有可变参数，js没有。。。
     //js也没有重载
     //我又想到JAVA里有构造函数，我设想的js的构造函数应该跟java类似，在构造函数里初始化
     //找了半天，没找到，还是慢慢找吧
     //卧槽，居然让我百度到了，还是MDN靠谱啊，CSDN和博客园搜索‘构造函数’都没有找到我想要的
     //地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/constructor
     //跟JAVA不一样，构造函数只能出现一次，而且类以class开头
     constructor() {
         //初始化
         this.item = [];
         if (arguments.length == 0) {
             //我想实现的是这样的效果
             //this=[]
             //因为在访问的时候可以做到list[0]取数，而不是list.item[0]取数
             //又比如var list=new Array();
             //可以实现list[0]=1存数，x=list[1]取数,我只能这么实现list.item[0],等自己多学习学习吧（捂脸）
         } else if (arguments.length == 1) {
             if (typeof(arguments[0]) == 'number') {
                 for (var i = 0; i < arguments[0]; i++) {
                     this.item[this.item.length] = null; //写的真是丑，等我多学点再优化下
                 }
             } else {
                 this.item[0] = arguments[0];
             }
         } else if (arguments.length > 1) {
             for (var i = 0; i < arguments.length; i++) {
                 this.item[this.item.length] = arguments[i];
             }
         }
     }
     //下面的取名规则参考严蔚敏数据结构
     DestroyList() {
         this.item = null;
     }
     ClearList() {
         this.item = [];
     }
     ListEmpty() {
         if (this.item != null) {
             if (this.item.length == 0) return true;
             else return false;
         } else return "list has been destroy"
     }
     ListLength() {
         if (this.item != null) {
             return this.item.length
         }
     }
     GetElem(i) {
         if (this.item != null) {
             return this.item[i]
         }
     }
     LocateElem(i) {
         if (this.item != null) {
             for (var j = 0; j < this.item.length; j++) {
                 if (this.item[j] === i) return j;
             }
             return null;
         }
     }
     PriorElem() {
         //略
     }
     NextElem() {
         //略
     }
     ListInsert(i, x) {
         //下标为i的前面插入X值
         if (this.item != null) {
             if (0 <= i && i <= this.item.length - 1) {
                 for (var j = this.item.length; j > i; j--) {
                     this.item[j] = this.item[j - 1];
                 }
                 this.item[i] = x;
             }
         }
     }
     ListDelete(i) {
         if (this.item != null) {
             if (0 <= i && i <= this.item.length - 1) {
             	
             }
         }
     }
     ListTraverse() {
         if (this.item != null) {
             for (var i = 0; i < this.item.length; i++) {
                 console.log(this.item[i]);
             }
         }
     }
 };
 var list = new SqList('5', '6');
 list.ListInsert(2, 'a');
 list.ListTraverse();