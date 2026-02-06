enum Grade {
    A(4),   
    B(3),
    F(0),  
    PASS(5); 

    int score;
    Grade(int score) { this.score = score; }
}

public class Example {
    public static void main(String[] args) {

        Grade g = Grade.values()[Grade.PASS.name().length() - 2];
        
        System.out.println(g.score);
    }
}

        // 문제 의도: Enum 배열에서 특정 인덱스의 값을 꺼내기

// 인덱스 0, 길이 1 ('A')
   // 인덱스 1, 길이 1 ('B')
 // 인덱스 2, 길이 1 ('F')
 // 인덱스 3, 길이 4 ('PASS')
  
        // 1. Grade.PASS.name().length() -> "PASS" 길이는 4
        // 2. 4 - 2 = 2
        // 3. values()[2] -> 순서상 세 번째인 Grade.F 를 의미함

// 0