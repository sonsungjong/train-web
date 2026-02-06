#include <stdio.h>
#include <stdlib.h>

struct Node{
    int data;
    struct Node* next;
};

int main(){
    struct Node node1 = {1, NULL};
    struct Node node2 = {2, NULL};
    struct Node node3 = {3, NULL};

    node1.next = &node2;
    node2.next = &node3;
    node3.next = NULL;

    node3.next = &node1;
    node1.next = &node2;
    node2.next = NULL;

    struct Node* head = &node3;

    printf("%d %d %d", head->data, head->next->data, head->next->next->data);
    return 0;
}


// 3 1 2