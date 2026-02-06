#include <stdio.h>

int main(){
    char country[] = "UNITEDSTATES";
    int index = 0;

    while(country[index] != '\0')
        ++index;

    putchar(country[index -3]);
    return 0;
}

// T