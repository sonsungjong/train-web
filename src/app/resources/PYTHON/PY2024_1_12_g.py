langs = ["Java", "Python", "C++", "Ruby"]
result = ""
for lang in langs:
    if len(lang) > 3:
        result = result + lang[0]
print(result)


# 정답:
# JPR



# 풀이:
# langs = ["Java", "Python", "C++", "Ruby"]
# 초기 result = ""
# 반복문(for lang in langs): 길이를 확인하여 3보다 크면 첫 글자(lang[0]) 연결
# "Java" (길이 4 > 3)   → result = "" + "J" = "J"
# "Python" (길이 6 > 3) → result = "J" + "P" = "JP"
# "C++" (길이 3 > 3 아님) → 조건 불만족, 무시됨
# "Ruby" (길이 4 > 3)   → result = "JP" + "R" = "JPR"
# 최종 result 출력 → "JPR"