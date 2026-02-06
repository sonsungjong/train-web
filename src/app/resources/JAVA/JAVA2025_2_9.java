public class Example{
    static interface Func{
        int execute(int value) throws Exception;
    }

    public static int perform(Func func){
        try{
            return func.execute(3);
        }catch(Exception e){
            return 7;
        }
    }

    public static void main(String[] args){
        Func firstFunc = (num) ->{
            if(num > 2){
                throw new Exception();
            }
            return num * 2;
        };

        Func secondFunc = (num) -> num + 9;
        System.out.print(perform(firstFunc) + perform(secondFunc));
    }
}
