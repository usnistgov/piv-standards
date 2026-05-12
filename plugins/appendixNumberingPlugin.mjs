import { visit } from 'unist-util-visit';
//const visit = (await import(new URL('node_modules/unist-util-visit/index.js', import.meta.url))).default;

// Matches any `{...}` that contains `.appendix`
const APPENDIX_REGEX = /\{[^}]*\.appendix[^}]*\}/;

// Matches exactly `{ .appendix }` or with extra whitespace
const APPENDIX_ONLY_REGEX = /^\{\s*\.appendix\s*\}$/;

function toLetter(value) {
  return String.fromCharCode('A'.charCodeAt(0) + value - 1);
}

// Format: Numbered headingCounts [#,#,#,#,#,#] to A → A.1 → A.1.1, etc.
function formatAppendixEnumerator(headingCounts) {
  const levels = headingCounts.slice();
  while (levels[levels.length - 1] === 0) levels.pop();
  return [toLetter(levels[0]), ...levels.slice(1)].join('.');
}

function findAndCleanAppendixMarker(node) {
  if (!node || typeof node !== 'object') return false;

  if (node.type === 'text' && typeof node.value === 'string') {
    const matches = node.value.match(APPENDIX_REGEX);
    if (matches) {
      for (const match of matches) {
        if (APPENDIX_ONLY_REGEX.test(match)) {
          node.value = node.value.replace(match, '').trim();
        } else {
          const cleaned = match.replace(/\.appendix/, '').replace(/\s+}/, '}');
          node.value = node.value.replace(match, cleaned).trim();
        }
      }
      return true;
    }
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      if (findAndCleanAppendixMarker(child)) return true;
    }
  }
  return false;
}

const appendixPlugin = {
  name: 'Appendix Numbering Plugin',
  transforms: [
    {
      name: 'appendix-heading-numbering',
      doc: 'Adds letter-based numbering for headings marked with {.appendix} and all subsequent headings.',
      stage: 'document',
      plugin: (_, utils) => {
        // Read frontmatter setting for title-included-in-content
        const titleOffset = utils?.frontmatter?.numbering?.title?.enabled ? 0 : 1;
        let inAppendix = false;
        const headingCounts = [0, 0, 0, 0, 0, 0]; // for heading levels 1–6

        return (tree) => {
          visit(tree, 'heading', (node, index, parent) => {
            if (!parent || typeof index !== 'number') return;

            //console.log('Processing heading:', node);

            // Skip headings marked unnumbered- e.g., if the .nonumber plugin marked them
            // Also skip if the node has already been enumerated. The first appendix will be
            //  be visited twice due to splicing the raw appendix node.
            if (node.enumerated === false || node.enumerator) return;

            // Look for {.appendix}-- remove it if found and return true
            const foundAppendix = findAndCleanAppendixMarker(node);

            // If we're not in an appendix, skip the heading
            if (!foundAppendix && !inAppendix) {
              return;
            }

            // Flag that we're in an appendix
            if (foundAppendix && !inAppendix) {
              inAppendix = true;
              headingCounts.fill(0);
              // Insert raw node with \appendix
              // **** This will cause unist-util-visit to visit node again ****
              parent.children.splice(index, 0, {
                type: 'raw',
                tex: '\\appendix\n',
              });
              index += 1;
            }

            // set index as the array index corresponding to adjusted heading depth of node
            const rawDepth = node.depth ?? 1;
            const adjustedDepth = rawDepth - titleOffset;
            const header_index = adjustedDepth - 1;

            // increment the heading counts
            headingCounts[header_index] += 1;
            headingCounts.fill(0, header_index + 1);

            const enumerator = formatAppendixEnumerator(headingCounts);
            node.enumerator = enumerator;
            node.enumerated = true;
            node.data ??= {};
            node.data.isAppendix = true;

            // insert appendix block attribute to help with Appendix headings formatting
            //   Will be used in a CSS to place Appendix before the enumerator
            parent.children.splice(index, 1, {
              type: 'block',
              class: 'appendix',
              children: [node],
            });
            //console.log(`[appendix plugin] Subheading: " → ${enumerator}`);
            //console.log(`[appendix plugin] Heading Counts: "${headingCounts}"`);
            //console.log(`[appendix plugin] rawDepth: "${rawDepth}" index: "${header_index}`);
          });
        };
      },
    },
  ],
};

export default appendixPlugin;
