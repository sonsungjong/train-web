#include <stdio.h>
#include <stdlib.h>

struct CharNode {
    char c;
    struct CharNode* next;
};

// 문자열을 받아 연결 리스트로 만드는 함수
struct CharNode* create_chain(char* s) {
    struct CharNode* head = NULL;
    struct CharNode* new_node;

    while(*s) {
        new_node = malloc(sizeof(struct CharNode));
        new_node->c = *s;     // 현재 문자 저장
        new_node->next = head; // 기존 리스트를 뒤로 미룸 (앞에 추가)
        head = new_node;      // 헤드 갱신
        s++;
    }
    return head;
}

int main() {
    // "JAVA"를 넣으면 리스트에는 어떻게 저장될까?
    struct CharNode* start = create_chain("JAVA");
    
    // 출력 확인
    struct CharNode* cur = start;
    while(cur) {
        printf("%c", cur->c); // 예상 출력: A V A J (역순)
        cur = cur->next;
    }
    // (메모리 해제 코드는 생략, 시험 풀이용 로직 이해 집중)
    return 0;
}

// AVAJ