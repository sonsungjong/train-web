#include <stdio.h>

struct Product {
    int code;
    const char* name;
};

int main() {
    struct Product p = {3, "BANANA"};
    struct Product* ptr = &p;

    // code값(3)을 이용해 문자열 포인터 이동
    // "BANANA"의 시작 주소에서 3칸 뒤부터 출력
    // B(0) A(1) N(2) A(3)...
    printf("%s\n", ptr->name + ptr->code); 
    
    // 추가 문제: code를 이용해 'NANA'만 출력하려면 code가 몇이어야 할까?
    
    return 0;
}