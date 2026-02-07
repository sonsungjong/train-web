"""
[연습문제] 2024년 2회 기출 대응
핵심 개념: 함수, 문자열 슬라이싱을 이용한 패턴 검색, f-string

- x[i:i+n] : 부분 문자열 추출
- len(x) : 문자열 길이
- f"..." : f-string 포맷팅 (변수 값을 문자열 안에 삽입)
"""

# Q. 다음 코드의 실행 결과를 쓰시오.

def countPattern(text, pattern):
    result = 0
    for i in range(len(text)):
        temp = text[i:i + len(pattern)]
        if temp == pattern:
            result += 1
    return result

s = "xyzxyzxyz"
p1 = "xy"
p2 = "yz"
out = f"xy{countPattern(s, p1)}yz{countPattern(s, p2)}"
print(out)











# 정답: xy3yz3
# 풀이:
# "xy" 검색: "xyzxyzxyz" 에서 인덱스 0,3,6 → 3회
# "yz" 검색: "xyzxyzxyz" 에서 인덱스 1,4,7 → 3회
# f-string 결과: "xy" + "3" + "yz" + "3" = "xy3yz3"
