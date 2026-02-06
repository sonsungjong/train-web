/*
 * [연습문제 2] 람다식 + 함수형 인터페이스 + 예외 처리
 * 
 * 핵심 개념: 함수형 인터페이스, 람다식 정의와 실행, try-catch 흐름
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
public class Example {
    static interface Calculator {
        int compute(int x) throws Exception;
    }

    public static int run(Calculator calc) {
        try {
            return calc.compute(5);
        } catch (Exception e) {
            return -1;
        }
    }

    public static void main(String[] args) {
        Calculator add = (n) -> n + 10;

        Calculator risky = (n) -> {
            if (n > 3) {
                throw new Exception();
            }
            return n * 5;
        };

        System.out.print(run(add) + " " + run(risky));
    }
}

/*
 * [풀이 가이드]
 * 
 * 1. run(add) 호출:
 *    - calc.compute(5) → 5 + 10 = 15
 *    - 예외 없음 → return 15
 * 
 * 2. run(risky) 호출:
 *    - calc.compute(5) → 5 > 3이므로 throw new Exception()
 *    - catch 블록 → return -1
 * 
 * 정답: 15 -1
 * 
 * [시험 문제와의 연관성]
 * 시험 문제도 동일한 구조:
 * - perform() 메서드가 func.execute(3)을 호출
 * - firstFunc: 3 > 2이므로 예외 발생 → catch에서 7 반환
 * - secondFunc: 3 + 9 = 12 반환
 * - 결과: 7 + 12 = 19
 */
