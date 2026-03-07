city = ["Seoul", "Gyeonggi", "Incheon", "Daejeonn", "Daegu", "Busan"]
str = "S"
for i in city:
    str = str + i[1]
print(str)


# 정답:
# Seynaau



# 풀이:
# city = ["Seoul", "Gyeonggi", "Incheon", "Daejeonn", "Daegu", "Busan"]
# 초기 str = "S"
# 반복문(for i in city):
# i="Seoul"    → i[1]="e" → str = "S" + "e" = "Se"
# i="Gyeonggi" → i[1]="y" → str = "Se" + "y" = "Sey"
# i="Incheon"  → i[1]="n" → str = "Sey" + "n" = "Seyn"
# i="Daejeonn" → i[1]="a" → str = "Seyn" + "a" = "Seyna"
# i="Daegu"    → i[1]="a" → str = "Seyna" + "a" = "Seynaa"
# i="Busan"    → i[1]="u" → str = "Seynaa" + "u" = "Seynaau"
# 최종 str 출력 → "Seynaau"