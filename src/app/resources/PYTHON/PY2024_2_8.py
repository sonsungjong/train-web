def fnCalculation(x, y):
    result = 0;
    for i in range(len(x)):
        temp = x[i:i + len(y)]
        if temp == y:
            result += 1
    return result

a = "abdcabcabca"
p1 = "ab";
p2 = "ca";
out = f"ab{fnCalculation(a,p1)}ca{fnCalculation(a,p2)}"
print(out)


# 정답:
# ab3ca3


# 풀이:
# a = "abdcabcabca"
# fnCalculation(a, p1="ab") 호출:
# i=0 ("ab"), i=4 ("ab"), i=7 ("ab") 에서 3번 매칭 → 반환값: 3
# fnCalculation(a, p2="ca") 호출:
# i=3 ("ca"), i=6 ("ca"), i=9 ("ca") 에서 3번 매칭 → 반환값: 3
# out = f"ab{3}ca{3}" = "ab3ca3"