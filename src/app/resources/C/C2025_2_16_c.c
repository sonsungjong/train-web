/*
 * [연습문제 3] 연결 리스트 재연결
 * 
 * 핵심 개념: 연결 리스트 노드의 next 포인터 변경, 리스트 순회
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
#include <stdio.h>

struct Node {
    int data;
    struct Node* next;
};

int main(){
    struct Node A = {10, NULL};
    struct Node B = {20, NULL};
    struct Node C = {30, NULL};
    struct Node D = {40, NULL};

    /* 초기 연결: A -> B -> C -> D */
    A.next = &B;
    B.next = &C;
    C.next = &D;
    D.next = NULL;

    /* 재연결 */
    D.next = &B;
    B.next = &A;
    A.next = NULL;

    struct Node* head = &D;

    printf("%d %d %d\n", head->data, head->next->data, head->next->next->data);
    return 0;
}

/*
 * [풀이 가이드]
 * 
 * 초기 연결은 함정입니다 - 재연결 후의 상태만 중요합니다.
 * 
 * 재연결 후:
 *   D.next = &B  → D -> B
 *   B.next = &A  → B -> A
 *   A.next = NULL → A에서 끝
 * 
 * 따라서 리스트: D(40) -> B(20) -> A(10) -> NULL
 * head = &D이므로:
 *   head->data = 40
 *   head->next->data = 20
 *   head->next->next->data = 10
 *
 * 정답: 40 20 10
 */
