a = [1, 3, 5]
a.append(7)
a.insert(2, 4)
a.remove(3)
a.extend([8, 9])
print(len(a))











# 정답: 6
# 풀이:
# [1, 3, 5]           → 3개
# append(7)    → [1, 3, 5, 7]       → 4개
# insert(2, 4) → [1, 3, 4, 5, 7]    → 5개
# remove(3)    → [1, 4, 5, 7]       → 4개
# extend(...)  → [1, 4, 5, 7, 8, 9] → 6개
# len(a) = 6