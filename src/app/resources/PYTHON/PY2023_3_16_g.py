data = "Red,Green,Blue,Yellow"
colors = data.split(",")
print(colors[1])


# 정답:
# Green



# 풀이:
# data = "Red,Green,Blue,Yellow"
# data.split(",") → 쉼표(,)를 기준으로 문자열을 자름: ['Red', 'Green', 'Blue', 'Yellow']
# colors 리스트의 인덱스는 0부터 시작하므로, colors[1]은 "Green"
# print(colors[1]) → "Green" 출력