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
