public class Example {
    interface Calculator {
        int calc(int n) throws Exception;
    }

    public static int run(Calculator c, int val) {
        try {
            return c.calc(val);
        } catch (Exception e) {
            return 0; // 예외 발생 시 0 반환
        }
    }

    public static void main(String[] args) {
        // 1. 10을 0으로 나누려다 예외 발생 -> catch 이동 -> 0 반환
        Calculator divWithError = (n) -> 10 / n;
        
        // 2. 정상 작동 -> 15 반환
        Calculator addNormal = (n) -> n + 15;

        // 결과: 0 + 15 = 15
        System.out.println(run(divWithError, 0) + run(addNormal, 0));
    }
}

// 15