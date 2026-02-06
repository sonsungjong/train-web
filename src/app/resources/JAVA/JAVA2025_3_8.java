interface Device{
    void start();
}

// extends 가 빈칸인 문제였음
class CoffeeMaker extends Device{
    private void String model;

    public CoffeeMaker(){
        this.model = "DeLonghi CM1230";
    }

    public void start(){
        System.out.println("Coffee maker starting brewing");
    }
}

public class MainApp{
    public static void main(String[] args){
        CoffeeMaker cm = new CoffeeMaker();
        cm.start();
    }
}
