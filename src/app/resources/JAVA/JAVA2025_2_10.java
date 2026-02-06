public class Example{
    public static class Animal{
        public int addTwo(int num){return num + 2;}
        public static String type(){return "Animal";}
    }

    public static class Dog extends Animal{
        @Override
        public int addTwo(int num){return num + 3;}
        public String bark(String sound){return sound+"!!";}
        public static String type(){return "Dog";}
    }

    public static void main(String[] args){
        Animal pet = new Dog();
        System.out.println(pet.addTwo(2) + pet.type());
    }
}

// 5Animal