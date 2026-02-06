class Point {
    int x, y;
    // 기본 생성자 없음
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

class ColorPoint extends Point {
    String color;

    ColorPoint(int x, int y, String color) {
        // 여기 빈칸: 부모의 x, y를 초기화 하려면?
        super(x, y); 
        this.color = color;
    }
    
    void show() {
        System.out.println(color + " point at " + x + "," + y);
    }
}

public class SuperConstructorPractice {
    public static void main(String[] args) {
        ColorPoint cp = new ColorPoint(5, 10, "Red");
        cp.show();
    }
}