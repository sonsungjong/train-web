enum Level{
    X("A"), Y("AB"), Z("ABC");

    private String tag;

    Level(String tag){
        this.tag = tag;
    }

    public String getTag(){
        return tag;
    }
}

public class Example{
    public static void main(String[] args){
        Level lv = Level.values()[Level.X.name().length()];
        System.out.println(lv.getTag());
    }
}

// AB