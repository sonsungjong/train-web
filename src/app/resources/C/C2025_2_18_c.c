/*
 * [연습문제 4] 문자열을 이용한 연결 리스트 생성 (Head Insert)
 * 
 * 핵심 개념: malloc, 헤드 삽입 방식 연결리스트 구축 (결과적으로 역순)
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
#include <stdio.h>
#include <stdlib.h>

struct Node {
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
    struct Node* current = buildList("CODE");
    
    while(current){
        putchar(current->ch);
        struct Node* temp = current;
        current = current->next;
        free(temp);
    }

    return 0;
}

/*
 * [풀이 가이드]
 * 
 * buildList는 각 문자를 리스트의 **앞쪽(head)**에 삽입합니다.
 * 즉, 나중에 삽입된 문자가 앞에 오게 됩니다.
 * 
 * "CODE" 삽입 과정:
 * 1. 'C' 삽입: head -> [C] -> NULL
 * 2. 'O' 삽입: head -> [O] -> [C] -> NULL
 * 3. 'D' 삽입: head -> [D] -> [O] -> [C] -> NULL
 * 4. 'E' 삽입: head -> [E] -> [D] -> [O] -> [C] -> NULL
 * 
 * while 루프에서 순서대로 출력하면: E D O C
 *
 * 정답: EDOC
 */

 // EDOC