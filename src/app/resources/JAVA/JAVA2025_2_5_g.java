public class Example {
    public static void update(int[] numbers, String text) {
        numbers[0] = 99;      // 1. 배열의 내부 값을 변경 (원본 영향 O)
        text = "World";       // 2. 변수에 새로운 문자열 할당 (원본 영향 X)
        numbers = new int[]{1, 2}; // 3. 배열 변수에 새 객체 할당 (원본 영향 X)
    }

    public static void main(String[] args) {
        int[] arr = {10, 20};
        String str = "Hello";
        
        update(arr, str);
        
        // "99Hello"가 나올까? "10World"가 나올까?
        System.out.println(arr[0] + str); 
    }
}

// 99Hello