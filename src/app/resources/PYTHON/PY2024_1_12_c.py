fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]
result = ""
for f in fruits:
    result = result + f[0]
print(result)











# 정답: ABCDE
# 풀이: 각 단어의 인덱스 0(첫 번째 문자)를 누적
# "Apple"[0]→A, "Banana"[0]→B, "Cherry"[0]→C,
# "Date"[0]→D, "Elderberry"[0]→E
# "" + "A" + "B" + "C" + "D" + "E" = "ABCDE"
