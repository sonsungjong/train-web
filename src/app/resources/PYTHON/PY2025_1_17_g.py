class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def search(node, target):
    if node is None:
        return False
    if node.val == target:
        return True
    # 재귀 호출 결과의 OR 연산
    return search(node.left, target) or search(node.right, target)

root = Node(10)
root.left = Node(5)
root.right = Node(20)

print(search(root, 5))


# 정답:
# True


# 풀이:
# search(10, 5) 탐색 시작 → node.val(10) != 5 이므로 좌/우 자식 재귀 탐색 진행
# search(node.left=5, 5) 호출 → node.val(5) == 5 이므로 True 반환
# OR 연산(or search(...))의 특성상 왼쪽 탐색이 True이므로 우측 자식 탐색(search(20, 5)) 결과와 상관없이 최종적으로 True 반환