"""
[연습문제] 2025년 1회 기출 대응
핵심 개념: 트리 구조, 재귀 함수, 레벨별 합계

- 이진 트리에서 부모 인덱스 = (자식 인덱스 - 1) // 2
- 루트 = 레벨 0, 자식 = 레벨 1, 그 아래 = 레벨 2 ...
- 기출은 홀수 레벨 합, 연습문제는 짝수 레벨 합

트리 구조 (values = [10, 20, 30, 40, 50, 60, 70]):
          10          ← 레벨 0 (짝수)
         /  \\
       20    30       ← 레벨 1 (홀수)
      / \\   / \\
    40  50 60  70     ← 레벨 2 (짝수)
"""

# Q. 다음 코드의 실행 결과를 쓰시오.

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []

def build_tree(values):
    nodes = [TreeNode(v) for v in values]
    for i in range(1, len(values)):
        parent_index = (i - 1) // 2
        nodes[parent_index].children.append(nodes[i])
    return nodes[0]

def sum_even_levels(node, level=0):
    if node is None:
        return 0
    current_value = node.value if level % 2 == 0 else 0
    children_sum = sum(sum_even_levels(child, level + 1) for child in node.children)
    return current_value + children_sum

values = [10, 20, 30, 40, 50, 60, 70]
root = build_tree(values)
result = sum_even_levels(root)
print(result)











# 정답: 230
# 풀이:
# 레벨 0 (짝수): 10 ✔
# 레벨 1 (홀수): 20, 30 ✘
# 레벨 2 (짝수): 40, 50, 60, 70 ✔
# 짝수 레벨 합 = 10 + 40 + 50 + 60 + 70 = 230
