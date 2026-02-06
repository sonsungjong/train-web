#include <stdio.h>

struct Node {
    int val;
    struct Node* link;
};

int main() {
    struct Node n1 = {10, NULL};
    struct Node n2 = {20, NULL};
    struct Node n3 = {30, NULL};

    // 초기 연결: 10 -> 20 -> 30
    n1.link = &n2;
    n2.link = &n3;
    
    // 연결 조작 (순서 뒤집기 시도)
    struct Node* head = &n2;  // 헤드를 n2(20)로 설정
    n2.link = &n1;            // 20 -> 10
    n1.link = &n3;            // 10 -> 30
    n3.link = NULL;           // 30 -> 끝

    // head부터 순서대로 출력 (예상: 20 10 30)
    printf("%d -> %d -> %d", head->val, head->link->val, head->link->link->val);

    return 0;
}

// 20 -> 10 -> 30