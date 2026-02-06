#include <stdio.h>

struct BitNode {
    struct BitNode* next;
    unsigned int val;
};

int main() {
    struct BitNode b1 = {NULL, 1}; // 이진수 1
    struct BitNode b2 = {NULL, 0}; // 이진수 0
    struct BitNode b3 = {NULL, 1}; // 이진수 1
    
    // 연결: b3 -> b2 -> b1 (1 -> 0 -> 1 순서)
    b3.next = &b2;
    b2.next = &b1;
    
    struct BitNode* curr = &b3;
    unsigned int res = 0;

    while(curr) {
        // 이진수 변환 로직과 유사 (왼쪽으로 밀고 값 더하기)
        // res = res * 2 + curr->val;
        res = (res << 1) + curr->val; 
        curr = curr->next;
    }
    // 예상: 101(2진수) -> 5(10진수)
    
    // 비트 반전 (XOR)
    // 5 (0101) ^ 3 (0011) = 6 (0110)
    res = res ^ 3; 

    printf("%u\n", res);
    return 0;
}