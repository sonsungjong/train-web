matrix = [
    [1, 2],
    [3, 4, 5],
    [6]
]
result = {}

for idx, row in enumerate(matrix):
    if sum(row) % 2 == 0:
        result[idx] = len(row)

print(result)


# 정답:
# {1: 3, 2: 1}

# 풀이:
# 반복문 (idx, row) in enumerate(matrix) 로 조회하며 합(sum)이 짝수인지 확인:
# 0번행: [1, 2]       → 합=3 (홀수) → 통과
# 1번행: [3, 4, 5]    → 합=12(짝수) → result[1] = len([3,4,5]) = 3 저장
# 2번행: [6]          → 합=6 (짝수) → result[2] = len([6]) = 1 저장
# 최종 result 딕셔너리 = {1: 3, 2: 1}
