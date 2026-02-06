#include <stdio.h>

int main() {
    int x = 10, y = 3;
    int temp;
    int res;

    // 1단계: 조건에 따른 temp 설정
    // 10 % 3 == 1. (1 > 2)는 거짓이므로 4 선택
    temp = (x % y > 2) ? 8 : 4; 

    // 2단계: 비트 연산
    // temp = 4 (0100)
    // temp >> 2 = 1 (0001)
    // 4 & 1 = 0
    res = temp & (temp >> 2);

    // 3단계: 복합 조건
    // (10 > 5 && 0 == 0) -> 참 -> x + res 실행
    res = (x > 5 && res == 0) ? x + res : x - res;

    printf("%d\n", res);
    return 0;
}


// 10