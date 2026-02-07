data = {'사과': 100, '바나나': 200, '딸기': 300}

data['파인애플'] = 400
data.update({'바나나': 500})
data.pop('딸기')
data['망고'] = 600
data['사과'] = 700

print(f"{len(data) + sum(data.values())}")

# 2204
