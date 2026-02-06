#include <stdio.h>

int main() {
    char word[] = "DEVELOPER"; // 9글자
    int i = 0;

    // 문자열 끝까지 이동
    while(word[i] != '\0') {
        i++;
    }
    // 루프가 끝나면 i는 문자열의 길이(9)가 됨 (널 문자 위치)

    // 마지막 글자(R) 바로 앞의 글자(E)를 출력하고 싶다면?
    printf("Result: %c\n", word[i - 2]); 
    
    return 0;
}