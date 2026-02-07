keys = ['a', 'b', 'c']
my_dict = {k: 0 for k in keys}

# 값 변경
my_dict['a'] = 1
my_dict['b'] = 2

set_a = {0, 1}
set_b = set(my_dict.values())

# 교집합의 길이 출력
print(len(set_a & set_b))


# 2