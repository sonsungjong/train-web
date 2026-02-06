class Wallet {
    int money;
    Wallet(int m) { this.money = m; }
}

public class Example {
    public static void main(String[] args) {
        Wallet w1 = new Wallet(100);
        Wallet w2 = new Wallet(200);
        
        Wallet[] list = {w1, w2}; 

        // 1. Swap: list[0]이 w2(200)를, list[1]이 w1(100)을 가리킴
        Wallet temp = list[0];
        list[0] = list[1];
        list[1] = temp;

        // 2. list[0]은 현재 w2(200)임. 
        // list[0].money를 500으로 바꿈 -> w2의 돈이 500이 됨
        list[0].money = 500;

        // w1(100), w2(500)
        System.out.println(w1.money + ", " + w2.money);
    }
}


// 100, 500