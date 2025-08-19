export function extractFirstParagraph(nodes: any): string {
  if (!nodes || !nodes.root || !nodes.root.children || !Array.isArray(nodes.root.children)) {
    return ''
  }

  // Assume the first node is a heading; look for the next paragraph
  for (let i = 0; i < nodes.root.children.length; i++) {
    const node = nodes.root.children[i]
    if (i === 0 && node.type !== 'heading') {
      // If first node is not a heading, return empty string
      return ''
    }
    if (i > 0 && node.type === 'paragraph' && node.children && Array.isArray(node.children)) {
      // Extract text from the first paragraph after the heading
      const text = node.children
        .map((child: any) => (child.type === 'text' && child.text ? child.text : ''))
        .join(' ')
        .trim()
        .replace(/\s+/g, ' ') // Clean up extra spaces
      return text
    }
  }
  return '' // Return empty string if no paragraph is found after the heading
}
