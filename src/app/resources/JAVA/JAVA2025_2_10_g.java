class Parent {
    void printName() { System.out.println("Parent Name"); }
    static void printStatic() { System.out.println("Parent Static"); }
}

class Child extends Parent {
    @Override
    void printName() { System.out.println("Child Name"); }
    
    // @Override 불가능 (Static은 오버라이딩 대상 아님)
    static void printStatic() { System.out.println("Child Static"); }
}

public class Example {
    public static void main(String[] args) {
        Parent p = new Child();
        
        p.printName();   // 1. 무엇이 출력될까? (다형성 적용 O)
        p.printStatic(); // 2. 무엇이 출력될까? (다형성 적용 X, Parent 따라감)
    }
}

// Child Name
// Parent Static
