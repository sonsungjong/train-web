/*
 * [연습문제 3] 상속, 메서드 오버라이딩, static 메서드 하이딩
 * 
 * 핵심 개념: 
 * - 인스턴스 메서드: 오버라이딩 → 실제 객체 타입의 메서드 호출 (동적 바인딩)
 * - static 메서드: 하이딩 → 참조 변수 타입의 메서드 호출 (정적 바인딩)
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
public class Practice_2_10 {
    public static class Vehicle {
        public int speed(int base) { return base + 10; }
        public static String category() { return "Vehicle"; }
    }

    public static class Car extends Vehicle {
        @Override
        public int speed(int base) { return base + 20; }
        public String horn() { return "Beep!"; }
        public static String category() { return "Car"; }
    }

    public static void main(String[] args) {
        Vehicle v = new Car();
        System.out.println(v.speed(5) + v.category());
    }
}

/*
 * [풀이 가이드]
 * 
 * v의 선언 타입: Vehicle, 실제 타입: Car
 * 
 * 1. v.speed(5):
 *    - speed()는 인스턴스 메서드 → 오버라이딩 적용
 *    - 실제 객체가 Car이므로 Car.speed(5) = 5 + 20 = 25
 * 
 * 2. v.category():
 *    - category()는 static 메서드 → 하이딩 적용
 *    - 참조 변수 타입이 Vehicle이므로 Vehicle.category() = "Vehicle"
 * 
 * 3. 25 + "Vehicle" → 문자열 연결 → "25Vehicle"
 * 
 * 정답: 25Vehicle
 * 
 * [시험 문제와의 연관성]
 * 시험 문제의 구조:
 * - pet.addTwo(2): 인스턴스 메서드 오버라이딩 → Dog.addTwo(2) = 2+3 = 5
 * - pet.type(): static 메서드 하이딩 → Animal.type() = "Animal"
 * - 결과: 5 + "Animal" → "5Animal"
 */
