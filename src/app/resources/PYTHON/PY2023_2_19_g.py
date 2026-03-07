text = "Information Processing Engineer"

part1 = text[:4]    # 'Info'
part2 = text[-8:]   # 'Engineer'
part3 = text[12:15] # 'Pro'

print(part1 + part3 + part2)


# 정답:
# InfoProEngineer


# 풀이:
# text = "Information Processing Engineer"
# part1 = text[:4]    → 인덱스 0~3 추출: "Info"
# part2 = text[-8:]   → 뒤에서 8번째부터 끝까지 추출: "Engineer"
# part3 = text[12:15] → 인덱스 12~14 추출: "Pro"
# part1 + part3 + part2 = "Info" + "Pro" + "Engineer" = "InfoProEngineer"