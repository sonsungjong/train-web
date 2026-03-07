records = [
    [7,3,6],
    [2,8,5,1],
    [9,4],
    [3,6,2,5]
]

summary = {}

for idx, row in enumerate(records):
    total = sum(row)
    count = len(row)
    summary[idx] = (total, count)

print(summary)


# 정답:
# {0: (16, 3), 1: (16, 4), 2: (13, 2), 3: (16, 4)}


# 풀이:
# 반복문 (idx, row) in enumerate(records):
# 0번행: row=[7,3,6]     → total=16, count=3 → summary[0] = (16, 3)
# 1번행: row=[2,8,5,1]   → total=16, count=4 → summary[1] = (16, 4)
# 2번행: row=[9,4]       → total=13, count=2 → summary[2] = (13, 2)
# 3번행: row=[3,6,2,5]   → total=16, count=4 → summary[3] = (16, 4)
# 딕셔너리 구조로 데이터가 매핑됨
