def check_pattern(text, pattern):
    count = 0
    p_len = len(pattern)
    for i in range(len(text) - p_len + 1):
        if text[i : i + p_len] == pattern:
            count += 1
    return count

target = "banana"
p = "ana"
print(check_pattern(target, p))


# 정답:
# 2


# 풀이:
# target = "banana", p = "ana", p_len = 3
# i=0: text[0:3] = "ban" != "ana"
# i=1: text[1:4] = "ana" == "ana" (count=1)
# i=2: text[2:5] = "nan" != "ana"
# i=3: text[3:6] = "ana" == "ana" (count=2)
# 루프 종료. 최종 count = 2 반환