import { visit } from 'unist-util-visit';

const NONUMBER_REGEX = /\{[^}]*\.nonumber[^}]*\}/;
const NONUMBER_ONLY_REGEX = /^\{\s*\.nonumber\s*\}$/;

/**
 * Recursively search for `.nonumber` in text nodes and clean it.
 * Sets node.enumerated = false if found.
 */
function removeNoNumberMarker(node) {
  if (!node || typeof node !== 'object') return false;

  if (node.type === 'text' && typeof node.value === 'string') {
    const matches = node.value.match(NONUMBER_REGEX);
    if (matches) {
      for (const match of matches) {
        if (NONUMBER_ONLY_REGEX.test(match)) {
          // If it's only .nonumber, remove the whole { ... }
          node.value = node.value.replace(match, '').trim();
        } else {
          // Otherwise, remove only .nonumber, preserve rest of the {}
          const cleaned = match.replace(/\.nonumber/, '').replace(/\s+}/, '}');
          node.value = node.value.replace(match, cleaned).trim();
        }
      }
      return true;
    }
    return false;
  }

  for (const child of node.children ?? []) {
    if (removeNoNumberMarker(child)) return true;
  }

  return false;
}

const plugin = {
  name: 'Disable Numbering Plugin',
  transforms: [
    {
      name: 'disable-heading-numbering',
      doc: 'Disables numbering on headings with {.nonumber}, but keeps other classes intact.',
      stage: 'document',
      plugin: () => (tree) => {
        visit(tree, 'heading', (node) => {
          const found = removeNoNumberMarker(node);
          if (found) {
            node.enumerated = false;
          }
        });
      },
    },
  ],
};

export default plugin;
