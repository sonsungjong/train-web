"""
[연습문제] 2023년 3회 기출 대응
핵심 개념: 문자열 split() 메서드

- split()    : 공백 기준으로 분리하여 리스트 반환
- split(',') : 특정 구분자 기준으로 분리
"""

# Q. 다음 코드의 (빈칸)에 들어갈 메서드를 쓰시오.

data = "apple,banana,cherry,grape"
fruits = data.____(',')

print("Fruits:", fruits)

"""
<실행결과>
Fruits: ['apple', 'banana', 'cherry', 'grape']
"""











# 정답: split
# fruits = data.split(',')
