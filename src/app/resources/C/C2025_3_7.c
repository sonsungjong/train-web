#include <stdio.h>

struct Element{
    struct Element* next;
    unsigned int value;
};

int main(){
    struct Element* e1 = {NULL, 3u};
    struct Element* e2 = {NULL, 6u};
    struct Element* e3 = {NULL, 9u};

    e3.next = &e2;
    e2.next = &e1;

    struct Element* ptr = &e3;
    int result = 0;

    while(ptr){
        result = result*4 + ptr->value;
        ptr = ptr->next;
    }

    result = (result ^ 15u) + 50u;
    printf("%u\n", result);

    return 0;
}