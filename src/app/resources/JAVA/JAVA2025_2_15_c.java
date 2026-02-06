/*
 * [연습문제 4] 객체 배열의 참조 교환과 값 변경
 * 
 * 핵심 개념: 객체 배열에서 참조 교환 시 원본 객체와 배열 요소의 관계
 * 
 * 아래 코드의 출력 결과를 예측하시오.
 */
public class Practice_2_15 {
    public static class Item {
        public int price;
        public Item(int price) {
            this.price = price;
        }
    }

    public static void main(String[] args) {
        Item item1 = new Item(100);
        Item item2 = new Item(200);
        Item item3 = new Item(300);

        Item[] items = {item1, item2, item3};

        Item temp = items[1];
        items[1] = items[2];
        items[2] = temp;

        items[0].price = items[1].price;

        System.out.println(item1.price + "x" + item2.price + "y" + item3.price);
    }
}

/*
 * [풀이 가이드]
 * 
 * 초기 상태:
 *   items[0] → item1 {100}
 *   items[1] → item2 {200}
 *   items[2] → item3 {300}
 * 
 * 교환 후:
 *   temp = items[1] → item2
 *   items[1] = items[2] → items[1]은 이제 item3을 가리킴
 *   items[2] = temp → items[2]는 이제 item2를 가리킴
 * 
 *   items[0] → item1 {100}
 *   items[1] → item3 {300}   ← 변경됨
 *   items[2] → item2 {200}   ← 변경됨
 * 
 * items[0].price = items[1].price:
 *   item1.price = item3.price = 300
 * 
 * 결과:
 *   item1.price = 300 (변경됨)
 *   item2.price = 200 (변경 없음!)
 *   item3.price = 300 (변경 없음)
 * 
 * ★ 핵심: 배열의 참조만 교환했을 뿐, item2, item3 변수 자체는 여전히 원래 객체를 가리킴
 * 
 * 정답: 300x200y300
 * 
 * [시험 문제와의 연관성]
 * 시험 문제에서는 boxes[0]과 boxes[2]를 교환 후 boxes[1].value = boxes[0].value 수행
 * - boxes[0]→box3, boxes[1]→box2, boxes[2]→box1
 * - box2.value = box3.value = 3
 * - 출력: box1.value=1, box2.value=3, box3.value=3 → "1a3b3"
 */
