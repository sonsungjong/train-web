/*
 * [연습문제 7] 연결 리스트 순회 + 비트 연산
 * 
 * 핵심 개념: 구조체 연결 리스트, 누적 연산, XOR 비트 연산
 * 
 * ※ 원본 시험 문제에는 포인터 초기화 문법 오류가 있었습니다.
 *    이 연습문제에서는 올바른 문법으로 작성되어 있습니다.
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
#include <stdio.h>

struct Element {
    struct Element* next;
    unsigned int value;
};

int main(){
    struct Element e1 = {NULL, 2u};
    struct Element e2 = {NULL, 5u};
    struct Element e3 = {NULL, 8u};

    e3.next = &e2;
    e2.next = &e1;

    struct Element* ptr = &e3;
    int result = 0;

    while(ptr){
        result = result * 3 + ptr->value;
        ptr = ptr->next;
    }

    result = (result ^ 7u) + 20u;
    printf("%u\n", result);

    return 0;
}

/*
 * [풀이 가이드]
 * 
 * 연결 순서: e3(8) -> e2(5) -> e1(2) -> NULL
 * 
 * while 루프 추적:
 * 1회차: ptr=&e3, result = 0*3 + 8 = 8,     ptr = &e2
 * 2회차: ptr=&e2, result = 8*3 + 5 = 29,    ptr = &e1
 * 3회차: ptr=&e1, result = 29*3 + 2 = 89,   ptr = NULL → 종료
 * 
 * result = 89
 * 
 * XOR 연산: 89 ^ 7
 *   89 = 0101 1001
 *    7 = 0000 0111
 *   -------------- XOR
 *        0101 1110 = 94
 * 
 * result = 94 + 20 = 114
 *
 * 정답: 114
 */

 // 114