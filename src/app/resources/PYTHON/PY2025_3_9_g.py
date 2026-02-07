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

# {1: 3, 2: 1}
