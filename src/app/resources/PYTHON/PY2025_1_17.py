class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []

def build_tree(values):
    nodes = [TreeNode(v) for v in values]
    