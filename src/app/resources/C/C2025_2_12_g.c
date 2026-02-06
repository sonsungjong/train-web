#include <stdio.h>
#define SIZE 4 // 사이즈를 변경하여 모듈러 연산 연습

typedef struct {
    int arr[SIZE];
    int front;
    int rear;
} Queue;

void push(Queue* q, int val) {
    q->arr[q->rear] = val;
    q->rear = (q->rear + 1) % SIZE;
}

int pop(Queue* q) {
    int val = q->arr[q->front];
    q->front = (q->front + 1) % SIZE;
    return val;
}

int main() {
    Queue q = {{0}, 0, 0};
    
    // 순서: 넣고, 넣고, 빼고, 넣고, 넣고
    push(&q, 10);
    push(&q, 20);
    pop(&q);        // 10 제거, front 이동
    push(&q, 30);
    push(&q, 40);   // 여기서 rear가 인덱스 범위를 넘어 다시 0으로 돌아가는지 확인

    // 현재 큐에 남은 데이터 중 가장 먼저 들어온 값 출력
    printf("Next Pop: %d\n", pop(&q)); 
    printf("Front: %d, Rear: %d\n", q.front, q.rear);
    
    return 0;
}