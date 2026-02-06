/*
 * [연습문제 7] enum 활용 - 생성자, values(), name(), ordinal()
 * 
 * 핵심 개념: enum의 생성자와 필드, values() 배열, name() 메서드, 문자열 길이
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */

enum Color {
    RED("R"), GREEN("GR"), BLUE("BLU");

    private String code;

    Color(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}

public class Practice_3_17 {
    public static void main(String[] args) {
        Color c = Color.values()[Color.GREEN.name().length() - 3];
        System.out.println(c.getCode());
    }
}

/*
 * [풀이 가이드]
 * 
 * 1. Color.values() → [RED, GREEN, BLUE] (인덱스 0, 1, 2)
 * 
 * 2. Color.GREEN.name() → "GREEN" (enum 상수의 이름 문자열)
 *    ★ name()은 getCode()가 아님! enum 상수의 이름 자체를 반환
 * 
 * 3. "GREEN".length() → 5
 * 
 * 4. 인덱스: 5 - 3 = 2
 * 
 * 5. Color.values()[2] → BLUE
 * 
 * 6. BLUE.getCode() → "BLU"
 * 
 * 정답: BLU
 * 
 * [시험 문제와의 연관성]
 * 시험 문제(JAVA2025_3_17)에서는:
 * - Level.values() → [X, Y, Z] (인덱스 0, 1, 2)
 * - Level.X.name() → "X" (길이 1)
 * - Level.values()[1] → Y
 * - Y.getTag() → "AB"
 * - 정답: AB
 */
