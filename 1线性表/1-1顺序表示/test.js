import {
    SqStack
} from './SqStack.js';
SqStack = SqStack()
var Stack = new SqStack();
//入5个出3个
for (var i = 1; i <= 5; i++) {
    Stack.Push(i);
}
console.log(Stack.GetPop());
console.log(Stack.Pop());
console.log(Stack.Pop());
console.log(Stack.Pop());
Stack.Traverse();