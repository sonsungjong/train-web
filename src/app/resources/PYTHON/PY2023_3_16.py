sentence = "Hello World! Python is awesome."
words = sentence.(빈칸)

print("Splitted Words:", words)

'''
<실행결과>
Splitted Words: ['Hello', 'World!', 'Python', 'is', 'awesome.']
'''

# 정답:
# split()



# 풀이:
# sentence = "Hello World! Python is awesome."
# 문자열을 ['Hello', 'World!', 'Python', 'is', 'awesome.'] 리스트로 변환해야 함
# 문자열 내장 메서드인 split()을 인자 없이 사용하면, 공백(스페이스, 탭, 엔터 등)을 기준으로 문자열을 잘라 리스트를 반환함