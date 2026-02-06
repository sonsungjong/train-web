/*
 * [연습문제 6] 상속과 super() 생성자 호출
 * 
 * 핵심 개념: 자식 클래스 생성자에서 super()로 부모 생성자 호출,
 *           부모 필드 상속 및 접근
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */

class Product {
    String name;
    int price;

    Product(String name, int price) {
        this.name = name;
        this.price = price;
    }
}

class DiscountProduct extends Product {
    int discountRate;

    DiscountProduct(String name, int price, int rate) {
        (이곳에 들어갈 코드는?)
    }

    int finalPrice() {
        return price - (price * discountRate / 100);
    }
}

public class Example {
    public static void main(String[] args) {
        DiscountProduct dp = new DiscountProduct("Laptop", 1000, 20);
        System.out.println(dp.finalPrice());
    }
}

/*
 * [풀이 가이드]
 * 
 * 1. new DiscountProduct("Laptop", 1000, 20) 호출
 * 2. 생성자에서 super("Laptop", 1000) → Product 생성자 호출
 *    → name = "Laptop", price = 1000
 * 3. discountRate = 20
 * 4. finalPrice() = 1000 - (1000 * 20 / 100) = 1000 - 200 = 800
 * 
 * 정답: 800
 * 
 * [시험 문제와의 연관성]
 * 시험 문제(JAVA2025_3_12)에서는:
 * - Shape(int w, int h)가 부모 클래스
 * - Tile(int size)이 super(size, size) 호출
 * - calcArea() = w * h = 10 * 10 = 100
 * - 빈칸에 들어갈 답: super
 */

// 800

// super(name, price);
// this.discountRate = rate;