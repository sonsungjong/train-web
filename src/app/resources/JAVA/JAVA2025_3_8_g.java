interface Player {
    void play();
}

// 빈칸 채우기 연습: 인터페이스를 구현할 때 사용하는 키워드?
class MP3Player implements Player { 
    String song;
    
    // 생성자 문법 확인
    public MP3Player(String song) {
        this.song = song;
    }

    // 인터페이스 추상 메소드 구현
    public void play() {
        System.out.println("Playing " + song);
    }
}

public class Example {
    public static void main(String[] args) {
        Player p = new MP3Player("Jazz");
        p.play();
    }
}