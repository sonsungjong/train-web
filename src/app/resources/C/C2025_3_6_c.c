/*
 * [연습문제 6] 문자열 순회와 인덱스 계산
 * 
 * 핵심 개념: while 루프를 이용한 문자열 길이 계산, 인덱스 역산
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
#include <stdio.h>

int main(){
    char city[] = "SANFRANCISCO";
    int index = 0;

    while(city[index] != '\0')
        ++index;

    putchar(city[index - 4]);
    return 0;
}

/*
 * [풀이 가이드]
 * 
 * 1. while 루프가 끝나면 index는 문자열의 길이가 됩니다.
 *    "SANFRANCISCO" → 길이 = 12, index = 12
 * 
 * 2. city[index - 4] = city[12 - 4] = city[8]
 * 
 * 3. 인덱스를 세어봅시다:
 *    S  A  N  F  R  A  N  C  I  S  C  O
 *    0  1  2  3  4  5  6  7  8  9  10 11
 *                                  ^
 *                              city[8] = 'I'
 *
 * 정답: I
 */


// I