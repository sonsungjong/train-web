#include <stdio.h>
#define QUEUE_SIZE 3

typedef struct {
    int data[QUEUE_SIZE];
    int front;
    int rear;
} CircularQueue;

void enqueue(CircularQueue* queue, int value){
    queue->data[queue->rear] = value;
    queue->rear = (queue->rear + 1) % QUEUE_SIZE;
}

int dequeue(CircularQueue* queue){
    int value = queue->data[queue->front];
    queue->front = (queue->front + 1) % QUEUE_SIZE;
    return value;
}

int main(){
    CircularQueue queue = {{0}, 0, 0};
    enqueue(&queue, 1);
    enqueue(&queue, 2);
    dequeue(&queue);
    enqueue(&queue, 3);

    int first_out = dequeue(&queue);
    int second_out = dequeue(&queue);

    printf("%d 그리고 %d\n", first_out, second_out)

    return 0;
}