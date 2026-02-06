interface Device{
    void start();
}

class CoffeeMaker (빈칸) Device{
    private void String model;

    public CoffeeMaker(){
        this.model = "DeLonghi CM1230";
    }

    public void start(){
        System.out.println("Coffee maker starting brewing");
    }
}

public class Example{
    public static void main(String[] args){
        CoffeeMaker cm = new CoffeeMaker();
        cm.start();
    }
}
