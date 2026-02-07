nums = [2, 4, 6]
triple_map = {n: n*3 for n in nums}
val_set = set(triple_map.values())

nums[0] = 50
triple_map[4] = 15
val_set.add(50)

print(len(val_set & set(triple_map.values())))


# 정답: 2
# 풀이:
# 초기: triple_map = {2:6, 4:12, 6:18}, val_set = {6, 12, 18}
#
# 수정 후:
#   nums[0] = 50       → nums 변경, triple_map에 영향 없음
#   triple_map[4] = 15 → triple_map = {2:6, 4:15, 6:18}
#   val_set.add(50)    → val_set = {6, 12, 18, 50}
#
# set(triple_map.values()) = {6, 15, 18}
# val_set & {6, 15, 18} = {6, 12, 18, 50} & {6, 15, 18} = {6, 18}
# len({6, 18}) = 2
