#include <stdio.h>
#include <stdlib.h>

struct Node{
    char ch;
    struct Node* next;
};

struct Node* buildList(char* str){
    struct Node* head = NULL;
    struct Node* newNode;

    while(*str){
        newNode = malloc(sizeof(struct Node));
        newNode->ch = *str++;
        newNode->next = head;
        head = newNode;
    }

    return head;
}

int main(){
    struct Node* current = buildList("BEST");
    
    while(current){
        putchar(current->ch);
        struct Node* temp = current;
        current = current->next;
        free(temp);
    }

    return 0;
}
