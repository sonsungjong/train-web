str = "Python engineer information processing"
str_1 = str[:3]
str_2 = str[4:6]
str_3 = str[28:]
str_f = str_1 + str_2 + str_3
print(str_f)


# 정답:
# Pytonprocessing


# 풀이:
# str = "Python engineer information processing"
# str_1 = str[:3]   → 인덱스 0,1,2 문자열 추출: "Pyt"
# str_2 = str[4:6]  → 인덱스 4,5 문자열 추출: "on"
# str_3 = str[28:]  → 인덱스 28부터 끝까지 추출: "processing"
# str_f = "Pyt" + "on" + "processing" = "Pytonprocessing"
