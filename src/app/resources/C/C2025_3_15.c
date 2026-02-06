#include <stdio.h>

int main(){
    int a = 7, b = 4;
    int r;

    int temp = (b % 3 < 3) ? 2 : 1;
    r = temp & (temp >> 1);

    r = (a > 5 && r <= 3) ? a * r : r/a;

    printf("%d\n", r);
    return 0;
}


// 0