print("사용자 입력: 10:20")

time_str = input()
hour, minute = time_str.split(':')
hour = int(hour)
minute = int(minute)

print(f"{hour + 1}시 {minute}분")


# 정답:
# 11시 20분


# 풀이:
# time_str = "10:20" (사용자 입력값)
# time_str.split(':') → [ '10', '20' ] 반환
# hour = "10", minute = "20"
# hour = int("10") = 10, minute = int("20") = 20 (각각 정수로 변환)
# f"{hour + 1}시 {minute}분" → f"{10+1}시 {20}분" = "11시 20분"