public class Example{
    public static void modify(String[] arr, String str){
        arr[0] = str;
        str = "z";
    }

    public static void main(String[] args){
        String[] arr = {"A"};
        String str = "B";
        modify(arr, str);
        System.out.print(arr[0] + str);
    }
}

