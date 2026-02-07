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

# 출력값 {0: (16, 3), 1: (16, 4), 2: (13, 2), 3: (16, 4)}
