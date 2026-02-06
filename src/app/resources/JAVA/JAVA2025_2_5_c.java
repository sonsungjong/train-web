/*
 * [연습문제 1] 배열 참조 전달 vs 문자열 값 전달
 * 
 * 핵심 개념: Java에서 배열은 참조로 전달되어 메서드 내 변경이 반영되지만,
 *           String은 불변(immutable)이므로 메서드 내 재할당이 원본에 영향 없음
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
public class Example {
    public static void change(int[] nums, int val) {
        nums[0] = val;
        val = 999;
    }

    public static void main(String[] args) {
        int[] nums = {10};
        int val = 20;
        change(nums, val);
        System.out.print(nums[0] + " " + val);
    }
}

/*
 * [풀이 가이드]
 * 
 * Java의 매개변수 전달 방식:
 * - 배열(int[]): 참조가 복사되어 전달 → 메서드 내에서 배열 요소를 변경하면 원본에 반영
 * - 기본형(int): 값이 복사되어 전달 → 메서드 내에서 변경해도 원본에 영향 없음
 * 
 * change(nums, val) 호출:
 * 1. nums[0] = val → nums[0] = 20 (원본 배열이 변경됨)
 * 2. val = 999 → 매개변수 val만 변경, main의 val은 그대로 20
 * 
 * 정답: 20 20
 * 
 * [시험 문제와의 연관성]
 * 시험 문제에서는 String[]과 String의 차이를 다룹니다.
 * - String[]도 배열이므로 참조 전달 → 요소 변경 시 원본 반영
 * - String은 재할당해도 원본에 영향 없음 (불변 객체)
 */


// 20 20