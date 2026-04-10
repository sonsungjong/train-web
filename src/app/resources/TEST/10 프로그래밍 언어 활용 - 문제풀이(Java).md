# [10과목] 프로그래밍 언어 활용 (Java) — 코드 분석 및 출력 결과 예측

> **학습 가이드:** 본 연습문제는 단순히 문법을 암기하는 것을 넘어, 쓰여진 코드를 읽고 컴퓨터가 어떻게 실행할지(디버깅/실행 흐름)를 예측하는 **실전 코딩 역량**을 기르기 위해 제작되었습니다. 최종 출력 결과를 맞춰보세요.

---

## 📝 객체 생성과 데이터 다루기

**Q1.** 다음 Java 프로그램이 실행되었을 때 콘솔 화면에 출력될 결과를 정확히 적으시오.

```java
class Circle {
    double radius;
    void displayArea() {
        double area = 3.14 * radius * radius;
        System.out.println(area);
    }
}

public class Main {
    public static void main(String[] args) {
        Circle c1 = new Circle();
        c1.radius = 4.0;
        c1.displayArea();
    }
}
```

<details>
<summary>정답 및 해설 보기</summary>

**50.24**

*(해설: `radius`가 4.0이므로, $3.14 \times 4.0 \times 4.0 = 50.24$ 가 계산되어 출력됩니다.)*
</details>

---

## 📝 생성자 오버로딩 (Overloading)

**Q2.** 다음 Java 코드를 분석하고 출력될 결과를 적으시오. (출력에 공백이 포함된 경우 공백도 표기할 것)

```java
class Circle {
    private double radius = 0.0;

    public Circle() {
        this.radius = 2.0;
    }

    public Circle(double radius) {
        this.radius = radius;
    }

    public void displayArea() {
        System.out.print((int)(3.14 * radius * radius) + " ");
    }
}

public class Main {
    public static void main(String[] args) {
        Circle c1 = new Circle(4.0);
        Circle c2 = new Circle();
        
        c1.displayArea();
        c2.displayArea();
    }
}
```

<details>
<summary>정답 및 해설 보기</summary>

**50 12 ** *(50과 12 뒤에 공백 하나씩 있음)*

*(해설: `c1`은 생성자 오버로딩을 통해 `radius`가 4.0으로 세팅되어 50.24의 정수형인 `50`이 출력됩니다. `c2`는 기본 생성자가 호출되어 매개변수 없이 `radius`가 자동으로 2.0으로 할당되므로 $3.14 \times 2.0 \times 2.0 = 12.56$의 정수형인 `12`가 출력됩니다.)*
</details>

---

## 📝 상속과 오버라이딩 (Overriding)

**Q3.** 다음 다형성(Polymorphism)이 적용된 코드의 실행 결과를 순서대로 쓰시오.

```java
class Animal {
    private String name;
    public void setName(String name) { this.name = name; }
    public void speak() { System.out.print(name + "동물 "); }
}

class Dog extends Animal {
    public Dog(String name) { super.setName(name); }
    public void speak() { System.out.print("멍멍 "); }
}

class Cat extends Animal {
    public Cat(String name) { super.setName(name); }
    public void speak() { System.out.print("야옹 "); }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Animal();
        Animal d = new Dog("바둑이");
        Animal c = new Cat("나비");
        
        a.setName("미지의");
        
        a.speak();
        d.speak();
        c.speak();
    }
}
```

<details>
<summary>정답 및 해설 보기</summary>

**미지의동물 멍멍 야옹 **

*(해설: `d`와 `c`는 변수 타입은 `Animal`이지만 실제로 생성된 객체는 `Dog`과 `Cat`입니다. 메서드를 호출하면 오버라이딩된 자식 클래스의 `speak()`가 우선적으로 실행되어 각각 "멍멍 "과 "야옹 "을 출력합니다.)*
</details>

---

## 📝 추상 클래스 실행 흐름

**Q4.** 다음 코드의 최종 출력값을 적으시오.

```java
abstract class Animal {
    private String name;
    public Animal(String name){ this.name = name; }
    public abstract void speak();
    public void eat(){ System.out.print(name + "냠냠 "); }
}

class Dog extends Animal {
    public Dog(String name){ super(name); }
    public void speak(){ System.out.print("멍멍 "); }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("해피");
        dog.speak();
        dog.eat();
    }
}
```

<details>
<summary>정답 및 해설 보기</summary>

**멍멍 해피냠냠 **

*(해설: 추상 클래스 내의 구상(Concrete) 메서드인 `eat()`는 부모에 구현된 로직을 그대로 사용하며, 생성자에서 넘겨진 "해피"라는 속성값을 기반으로 동작합니다.)*
</details>

---

## 📝 인터페이스와 정적(static) 메서드

**Q5.** 다음 Java 코드의 출력 결과를 순서대로 쓰시오.

```java
interface Animal {
    public void speak();
    public static void sleep() {
        System.out.print("zzz ");
    }
}

class Cat implements Animal {
    public void speak() { System.out.print("야옹 "); }
    public static void sleep() { System.out.print("콜콜 "); }
}

public class Main {
    public static void main(String[] args) {
        Animal cat = new Cat();
        cat.speak();
        
        Animal.sleep();
        Cat.sleep();
    }
}
```

<details>
<summary>정답 및 해설 보기</summary>

**야옹 zzz 콜콜 **

*(해설: 인터페이스의 static 메서드는 상속/오버라이딩되지 않습니다. `Animal.sleep()`은 인터페이스에 정의된 것을 부르며, `Cat.sleep()`은 자식 클래스 스스로가 가진 정적 메서드를 부르는 독립적인 동작입니다.)*
</details>

---

## 📝 람다식 (Lambda)

**Q6.** 다음 코드가 계산하여 최종적으로 출력하는 정수는 무엇인가?

```java
interface MyFunction {
    int calc(int x, int y);
}

public class Main {
    public static void main(String[] args) {
        MyFunction sub = (x, y) -> x - y;
        MyFunction mul = (x, y) -> x * y;

        int a = sub.calc(10, 4);
        int b = mul.calc(2, 3);
        
        System.out.println(a + b);
    }
}
```

<details>
<summary>정답 및 해설 보기</summary>

**12**

*(해설: `a`는 10 - 4 = 6. `b`는 2 * 3 = 6. 따라서 6 + 6 = 12 가 됩니다.)*
</details>

---

## 📝 예외 처리 흐름 추적 (try-catch-finally)

**Q7.** 다음 코드가 실행될 때, 콘솔에 찍히는 알파벳 순서를 정확히 맞추시오.

```java
public class Main {
    public static void main(String[] args) {
        try {
            System.out.print("A ");
            int result = 10 / 0;
            System.out.print("B ");
        } catch(ArithmeticException e) {
            System.out.print("C ");
        } catch(Exception e) {
            System.out.print("D ");
        } finally {
            System.out.print("E");
        }
    }
}
```

<details>
<summary>정답 및 해설 보기</summary>

**A C E**

*(해설: 처음엔 무조건 try 블록 진입하여 "A " 출력 👉 수학 오류인 `10/0`을 만나며 "B" 라인은 무시되고 가장 먼저 일치하는 `ArithmeticException` catch문 진입하여 "C " 출력 👉 마지막으로 예외에 상관없이 무조건 도는 finally 진입하여 "E" 출력)*
</details>

---

## 📝 배열과 반복문 데이터 누적

**Q8.** 다음 코드는 1차원 배열을 다루고 있다. 최종 출력되는 `sum`의 값을 산출하시오.

```java
public class Main {
    public static void main(String[] args) {
        int[] numbers = new int[5];
        
        for(int i = 0; i < numbers.length; i++) {
            numbers[i] = (i + 1) * 10;
        }
        
        int sum = 0;
        for(int i = 1; i <= 3; i++) {
            sum += numbers[i];
        }
        
        System.out.println(sum);
    }
}
```

<details>
<summary>정답 및 해설 보기</summary>

**90**

*(해설: 첫 번째 루프로 인해 배열은 `[10, 20, 30, 40, 50]` 상태가 됩니다. 두 번째 루프는 인덱스 `1 ~ 3` 원소을 더하라고 했으므로 `20 + 30 + 40 = 90`이 출력됩니다.)*
</details>

---

## 📝 2차원 배열 인덱스 접근

**Q9.** 다음 코드 실행 시 콘솔에 출력될 숫자는 무엇인가?

```java
public class Main {
    public static void main(String[] args) {
        int[][] numbers = new int[2][3];
        int count = 1;

        for(int i = 0; i < numbers.length; i++) {
            for(int j = 0; j < numbers[i].length; j++) {
                numbers[i][j] = count++;
            }
        }
        
        System.out.println(numbers[1][1] + numbers[0][2]);
    }
}
```

<details>
<summary>정답 및 해설 보기</summary>

**8**

*(해설: 배열 데이터는 `[[1, 2, 3], [4, 5, 6]]`로 들어갑니다. `numbers[1][1]`은 5이고, `numbers[0][2]`는 3이므로 5 + 3 = 8 입니다.)*
</details>
