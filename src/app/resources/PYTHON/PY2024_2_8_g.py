def check_pattern(text, pattern):
    count = 0
    p_len = len(pattern)
    for i in range(len(text) - p_len + 1):
        if text[i : i + p_len] == pattern:
            count += 1
    return count

target = "banana"
p = "ana"
print(check_pattern(target, p))

# 2