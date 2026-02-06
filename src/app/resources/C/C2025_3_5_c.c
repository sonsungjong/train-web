/*
 * [연습문제 5] 구조체 포인터와 문자열 포인터 연산
 * 
 * 핵심 개념: 구조체 배열 포인터, 문자열에 대한 포인터 산술 연산
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
#include <stdio.h>

struct Entry {
    int code;
    const char* name;
};

int main(){
    struct Entry entries[] = {
        {3, "APPLE"},
        {5, "BANANA"},
        {8, "CHERRY"}
    };

    struct Entry* ptr = &entries[2];
    printf("%s\n", ptr->name + (ptr->code - 6));

    return 0;
}

/*
 * [풀이 가이드]
 * 
 * 1. ptr = &entries[2] → ptr는 {8, "CHERRY"}를 가리킴
 * 2. ptr->code = 8
 * 3. ptr->code - 6 = 2
 * 4. ptr->name = "CHERRY" → 문자열의 시작 주소
 * 5. ptr->name + 2 → "CHERRY"에서 인덱스 2부터 = "ERRY"
 * 
 * 문자열 포인터 + 정수 = 해당 위치부터의 부분 문자열
 * "CHERRY"
 *  0 1 2 3 4 5
 *  C H E R R Y
 *      ^ +2 위치
 *
 * 정답: ERRY
 */
