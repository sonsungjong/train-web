/*
 * [연습문제 2] 구조체 포인터와 이중 포인터
 * 
 * 핵심 개념: 구조체 배열, 포인터를 통한 배열 접근, 이중 포인터 역참조
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
#include <stdio.h>

struct Student {
    int id;
    int score;
};

int main(){
    struct Student students[] = {
        {101, 85},
        {102, 90},
        {103, 78}
    };

    struct Student* sPtr = students;
    struct Student** dPtr = &sPtr;

    (*dPtr)[0] = (*dPtr)[2];
    (*dPtr)++;

    printf("%d 그리고 %d\n", students[0].id, sPtr->score);
    return 0;
}

/*
 * [풀이 가이드]
 * 
 * 1. (*dPtr)는 sPtr과 같은 것임을 이해하세요.
 * 2. (*dPtr)[0] = (*dPtr)[2] → sPtr[0] = sPtr[2] → students[0] = students[2]
 *    따라서 students[0]은 {103, 78}로 덮어씌워짐
 * 3. (*dPtr)++ → sPtr++ → sPtr은 이제 students[1]을 가리킴
 * 4. students[0].id = 103 (덮어씌워진 값)
 * 5. sPtr->score = students[1].score = 90
 *
 * 정답: 103 그리고 90
 */
