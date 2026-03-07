numbers = [2, 4, 6, 8]

result = list(map(lambda x: int(x / 2), numbers))
print(result)

# 정답:
# [1, 2, 3, 4]

# 풀이:
# numbers = [2, 4, 6, 8]
# lambda x: int(x / 2) → 각 원소(x)를 2로 나누고 정수형(int)으로 변환하는 함수
# 2 / 2 = 1.0 → int(1.0) = 1
# 4 / 2 = 2.0 → int(2.0) = 2
# 6 / 2 = 3.0 → int(3.0) = 3
# 8 / 2 = 4.0 → int(4.0) = 4
# map과 list를 거쳐 result에 [1, 2, 3, 4] 저장 및 출력
