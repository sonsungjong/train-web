numbers = [1,2,3]
double_map = {n: n*2 for n in numbers}
value_set = set(double_map.values())

numbers[0] = 99
double_map[2] = 7
value_set.add(99)

print(len(value_set & set(double_map.values())))


# 정답:
# 2


# 풀이:
# numbers = [1, 2, 3]
# double_map 생성: {1: 2, 2: 4, 3: 6} (각 요소를 2배한 딕셔너리)
# value_set 생성: {2, 4, 6} (double_map의 값들을 집합으로 변환)
# numbers[0] = 99 → (double_map 값에는 영향 없음)
# double_map[2] = 7 → 딕셔너리가 {1: 2, 2: 7, 3: 6} 으로 변경됨
# value_set.add(99) → 집합이 {2, 4, 6, 99} 로 변경됨
# set(double_map.values()) → {2, 6, 7}
# value_set & set(double_map.values()) → {2, 4, 6, 99} & {2, 6, 7} = {2, 6} (교집합)
# 교집합의 길이(len)는 2
