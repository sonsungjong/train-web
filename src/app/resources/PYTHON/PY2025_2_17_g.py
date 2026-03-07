keys = ['a', 'b', 'c']
my_dict = {k: 0 for k in keys}

# 값 변경
my_dict['a'] = 1
my_dict['b'] = 2

set_a = {0, 1}
set_b = set(my_dict.values())

# 교집합의 길이 출력
print(len(set_a & set_b))

# 정답:
# 2


# 풀이:
# 초기 my_dict = {'a': 0, 'b': 0, 'c': 0}
# my_dict['a'] = 1, my_dict['b'] = 2 로 값 변경 
# → my_dict = {'a': 1, 'b': 2, 'c': 0}
# set_a = {0, 1}
# set_b = set(my_dict.values()) = set([1, 2, 0]) = {0, 1, 2}
# set_a & set_b (교집합) = {0, 1} & {0, 1, 2} = {0, 1}
# 교집합의 길이(len) = 2