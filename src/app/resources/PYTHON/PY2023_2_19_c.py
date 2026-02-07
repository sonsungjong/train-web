"""
[연습문제] 2023년 2회 기출 대응
핵심 개념: 문자열 슬라이싱

- str[a:b] : 인덱스 a부터 b-1까지 추출
- str[:n]  : 처음부터 n-1까지
- str[n:]  : n부터 끝까지
- 인덱스는 0부터 시작
"""

# Q. 다음 코드의 실행 결과를 쓰시오.

#          0123456789...
s = "Information Technology Expert"
s1 = s[:4]
s2 = s[12:16]
s3 = s[22:]
result = s1 + s2 + s3
print(result)











# 정답: InfoTechExpert
# 풀이:
# s[:4]     → "Info"
#          I(0) n(1) f(2) o(3)
# s[12:16]  → "Tech"
#          T(12) e(13) c(14) h(15)
# s[22:]    → "Expert"
#          E(22) x(23) p(24) e(25) r(26) t(27)
# 결합: "Info" + "Tech" + "Expert" = "InfoTechExpert"
