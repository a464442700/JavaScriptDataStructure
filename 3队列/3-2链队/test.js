import {
    LinkQueue
} from "./LinkQueue.js";
//入12345出12345
var Queue = new LinkQueue();
//空队列出队
console.log(Queue.DeQueue());
Queue.EnQueue(1);
Queue.EnQueue(2);
Queue.EnQueue(3);
Queue.EnQueue(4);
Queue.EnQueue(5);
console.log(Queue.IsEmpty());
for (var i = 1; i <= 5; i++) {
    console.log(Queue.DeQueue());
}
// //队空后再出队
//console.log(Queue.DeQueue());
//再入队两个出队一个
Queue.EnQueue(6);
Queue.EnQueue(7);
console.log(Queue.DeQueue());
console.log(Queue.DeQueue());
console.log(Queue.DeQueue());
console.log(Queue.IsEmpty());
