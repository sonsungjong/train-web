#include <stdio.h>

struct Data {
    int id;
    int score;
};

int main() {
    struct Data list[] = {
        {101, 80},
        {102, 90},
        {103, 70}
    };

    struct Data* ptr = list;      // 배열의 첫 주소
    struct Data** dptr = &ptr;    // 포인터의 주소

    // dptr을 이용해 두 번째 요소(index 1)의 score를 
    // 세 번째 요소(index 2)의 score로 덮어쓰기
    (*dptr + 1)->score = (*dptr + 2)->score;

    // 변경된 값 확인
    printf("ID: %d, Score: %d\n", list[1].id, list[1].score);

    return 0;
}