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

# True