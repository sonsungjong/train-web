public class Example{
    public static class Box{
        public int value;
        public Box(int value){
            this.value = value;
        }
    }

    public static void main(String[] args){
        Box box1 = new Box(1);
        Box box2 = new Box(2);
        Box box3 = new Box(3);

        Box[] boxes = {box1, box2, box3};

        Box temp = boxes[0];
        boxes[0] = boxes[2];
        boxes[2] = temp;

        boxes[1].value = boxes[0].value;

        System.out.println(box1.value + "a" + box2.value + "b" + box3.value);
    }
}

// 1a3b3