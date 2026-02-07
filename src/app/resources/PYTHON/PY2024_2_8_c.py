def countPattern(text, pattern):
    result = 0
    for i in range(len(text)):
        temp = text[i:i + len(pattern)]
        if temp == pattern:
            result += 1
    return result

s = "xyzxyzxyz"
p1 = "xy"
p2 = "yz"
out = f"xy{countPattern(s, p1)}yz{countPattern(s, p2)}"
print(out)











# 정답: xy3yz3
# 풀이:
# "xy" 검색: "xyzxyzxyz" 에서 인덱스 0,3,6 → 3회
# "yz" 검색: "xyzxyzxyz" 에서 인덱스 1,4,7 → 3회
# f-string 결과: "xy" + "3" + "yz" + "3" = "xy3yz3"
