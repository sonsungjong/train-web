print("파이썬 입출력")

num1, num2 = input().빈칸()
num1 = int(num1)
num2 = int(num2)
print(num1, num2)

num3 = num1 + num2
print(f"{num1} + {num2} = {num3}")

'''
입력값
2 3

출력값
2 3
2 + 3 = 5
'''

# 정답:
# split


# 풀이:
# `입력값`이 `2 3` 형태처럼 공백으로 구분된 문자열로 주어짐
# input()으로 읽어온 문자열을 두 개의 변수(num1, num2)로 각각 나누기 위해
# 내장 메서드인 split()을 사용하여 공백(스페이스) 기준으로 분리해 각각 언패킹함