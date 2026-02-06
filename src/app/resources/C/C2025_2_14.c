#include <stdio.h>
struct Point{
    int x;
    int y;
};

int main(){
    struct Point points[] = {
        {1,2},
        {3,4},
        {5,6}
    };

    struct Point* pointPtr = points;
    struct Point** doublePtr = &pointPtr;
    (*doublePtr)[1] = (*doublePtr)[2];

    printf("%d 그리고 %d\n", points[1].x, points[1].y);
    return 0;
}
