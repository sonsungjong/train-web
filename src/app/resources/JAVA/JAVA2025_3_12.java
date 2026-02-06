class Shape{
    int w, h;

    Shape(int w, int h){
        this.w = w;
        this.h = h;
    }
}

class Tile extends Shape{
    Tile(int size){
        (빈칸)(size, size);
    }

    int calcArea(){
        return w*h;
    }
}

public class Example{
    public static void main(String[] args){
        Tile t = new Tile(10);
        System.out.println(t.calcArea());
        // 100
    }
}

// super