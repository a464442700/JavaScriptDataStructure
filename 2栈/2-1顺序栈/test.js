import  SqStack  from './SqStack.js';
var SqStackC = SqStack();
var Stack = new SqStackC();

//入5个出3个
for (var i = 1; i <= 5; i++) {
    Stack.Push(i);
}
console.log(Stack.GetPop());
console.log(Stack.Pop());
console.log(Stack.Pop());
console.log(Stack.Pop());
 Stack.Traverse();
 console.log(Stack.GetPop());
// //弹出剩下的两个
console.log(Stack.Pop());
console.log(Stack.Pop());
// //查看数组
Stack.Traverse();
// //栈空后再继续弹出
console.log(Stack.Pop());