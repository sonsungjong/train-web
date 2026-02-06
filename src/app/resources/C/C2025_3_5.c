#include <stdio.h>

struct Item {
    int num;
    const char* label;
};

int main(){
    struct Item items[] = {
        {5, "XY"},
        {7, "MN"},
        {9, "PQ"}
    };

    struct Item* ptr = &items[1];
    printf("%s", ptr->label + (ptr->num - 6));
    return 0;
}

// N