class Player {
    void play(){}
}


class MP3Player (빈칸) Player { 
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

// Playing Jazz