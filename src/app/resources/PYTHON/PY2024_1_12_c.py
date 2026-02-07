"""
[연습문제] 2024년 1회 기출 대응
핵심 개념: 반복문과 문자열 인덱싱

- 문자열[n] : n번째 문자 접근 (0부터 시작)
- for i in 리스트 : 리스트 각 요소 순회
- 문자열 + 문자열 : 문자열 결합(연결)
"""

# Q. 다음 코드의 실행 결과를 쓰시오.

fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]
result = ""
for f in fruits:
    result = result + f[0]
print(result)











# 정답: ABCDE
# 풀이: 각 단어의 인덱스 0(첫 번째 문자)를 누적
# "Apple"[0]→A, "Banana"[0]→B, "Cherry"[0]→C,
# "Date"[0]→D, "Elderberry"[0]→E
# "" + "A" + "B" + "C" + "D" + "E" = "ABCDE"
