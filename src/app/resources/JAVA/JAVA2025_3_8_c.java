/*
 * [연습문제 5] 인터페이스 구현 오류 찾기
 * 
 * 핵심 개념: interface는 implements로 구현해야 함, extends는 클래스 상속에만 사용
 *           접근 제어자와 반환형의 올바른 선언
 * 
 * 아래 코드에서 컴파일 오류가 발생하는 부분을 모두 찾고 이유를 설명하시오.
 */

interface Printable {
    void print();
}

// 오류 1: interface는 extends가 아닌 implements로 구현해야 함
class Document extends Printable {
    // 오류 2: 반환형과 접근제어자 위치가 잘못됨
    private void String title;

    public Document() {
        this.title = "Untitled";
    }

    public void print() {
        System.out.println("Printing: " + title);
    }
}

public class Example {
    public static void main(String[] args) {
        Document doc = new Document();
        doc.print();
    }
}

/*
 * [풀이 가이드]
 * 
 * 오류 1: class Document extends Printable
 *   → Printable은 interface이므로 "implements"를 사용해야 함
 *   → 올바른 코드: class Document implements Printable
 * 
 * 오류 2: private void String title;
 *   → void는 메서드 반환형이지 필드 타입이 아님
 *   → 올바른 코드: private String title;
 * 
 * [시험 문제와의 연관성]
 * 시험 문제(JAVA2025_3_8)에서도 동일한 오류 패턴:
 * - Device는 interface인데 CoffeeMaker가 extends로 상속 시도 → implements 사용해야 함
 * - "private void String model" → void는 불필요, "private String model"이 올바름
 * 총 2개의 컴파일 오류
 */

// Printing: Untitled