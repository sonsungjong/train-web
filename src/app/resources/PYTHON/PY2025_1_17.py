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

def sum_odd_levels(node, level=0):
    if node is None:
        return 0
    current_value = node.value if level % 2 == 1 else 0
    children_sum = sum(sum_odd_levels(child, level + 1) for child in node.children)
    return current_value + children_sum

values = [3, 5, 8, 12, 15, 18, 21]
root = build_tree(values)
result = sum_odd_levels(root)
print(result)