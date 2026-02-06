numbers = [1,2,3]
double_map = {n: n*2 for n in numbers}
value_set = set(double_map.values())

numbers[0] = 99
double_map[2] = 7
value_set.add(99)

print(len(value_set & set(double_map.values())))

# Output: 2
