/*
 * [연습문제 1] 원형 큐 (Circular Queue)
 * 
 * 핵심 개념: 원형 큐의 enqueue/dequeue 동작, 모듈러 연산
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
#include <stdio.h>
#define QUEUE_SIZE 4

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
    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);
    dequeue(&queue);
    dequeue(&queue);
    enqueue(&queue, 40);
    enqueue(&queue, 50);

    int a = dequeue(&queue);
    int b = dequeue(&queue);
    int c = dequeue(&queue);

    printf("%d %d %d\n", a, b, c);

    return 0;
}

/*
 * [풀이 가이드]
 * 
 * 큐의 상태를 단계별로 추적하세요:
 * - 배열 인덱스: [0] [1] [2] [3]
 * - front와 rear의 위치 변화를 추적
 * - (rear + 1) % QUEUE_SIZE 로 인덱스가 순환됨에 주의
 *
 * 정답: 30 40 50
 * 
 * 단계별 해설:
 * enqueue(10): data[0]=10, rear=1      front=0
 * enqueue(20): data[1]=20, rear=2      front=0
 * enqueue(30): data[2]=30, rear=3      front=0
 * dequeue():   return 10, front=1
 * dequeue():   return 20, front=2
 * enqueue(40): data[3]=40, rear=0      front=2  (순환!)
 * enqueue(50): data[0]=50, rear=1      front=2  (순환!)
 * dequeue():   return data[2]=30, front=3
 * dequeue():   return data[3]=40, front=0
 * dequeue():   return data[0]=50, front=1
 */

// 30 40 50