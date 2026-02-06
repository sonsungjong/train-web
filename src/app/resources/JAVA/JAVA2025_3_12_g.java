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
        (이곳에 들어갈 코드는?)
    }
    
    void show() {
        System.out.println(color + " point at " + x + "," + y);
    }
}

public class Example {
    public static void main(String[] args) {
        ColorPoint cp = new ColorPoint(5, 10, "Red");
        cp.show();
    }
}

// Red point at 5,10