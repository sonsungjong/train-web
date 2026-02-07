print("사용자 입력: 10:20")

time_str = input()
hour, minute = time_str.split(':')
hour = int(hour)
minute = int(minute)

print(f"{hour + 1}시 {minute}분")

# 11시 20분