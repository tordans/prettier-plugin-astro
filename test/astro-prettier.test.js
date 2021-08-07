import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { format } from './test-utils.js';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
const Prettier = suite('Prettier formatting');

const readFile = (path) => fs.readFile(fileURLToPath(new URL(`./fixtures${path}`, import.meta.url))).then((res) => res.toString().replace(/\r\n/g, '\n'));

/**
 * Utility to get `[src, out]` files
 * @param name {string}
 * @param ctx {any}
 */
const getFiles = async (name) => {
  const [src, out] = await Promise.all([readFile(`/in/${name}.astro`), readFile(`/out/${name}.astro`)]);
  return [src, out];
};

Prettier('can format a basic Astro file', async () => {
  const [src, out] = await getFiles('basic');
  assert.not.fixture(src, out);

  const formatted = format(src);
  assert.fixture(formatted, out);
});

Prettier('can format a basic Astro file with styles', async () => {
  const [src, out] = await getFiles('with-styles');
  assert.not.fixture(src, out);

  const formatted = format(src);
  assert.fixture(formatted, out);
});

Prettier('can format an Astro file with frontmatter', async () => {
  const [src, out] = await getFiles('frontmatter');
  assert.not.fixture(src, out);

  const formatted = format(src);
  assert.fixture(formatted, out);
});

Prettier('can format an Astro file with embedded JSX expressions', async () => {
  const [src, out] = await getFiles('embedded-expr');
  assert.not.fixture(src, out);

  const formatted = format(src);
  assert.fixture(formatted, out);
});

Prettier('can format an Astro file with a JSX expression in an attribute', async () => {
  const [src, out] = await getFiles('attribute-with-embedded-expr');
  assert.not.fixture(src, out);

  const formatted = format(src);
  assert.fixture(formatted, out);
});

Prettier.skip('can format an Astro file with a JSX expression and an HTML Comment', async () => {
  const [src, out] = await getFiles('expr-and-html-comment');
  assert.not.fixture(src, out);

  const formatted = format(src);
  assert.fixture(formatted, out);
});

Prettier.skip('can format an Astro file with a single style element', async () => {
  const [src, out] = await getFiles('single-style-element');
  assert.not.fixture(src, out);

  const formatted = format(src);
  assert.fixture(formatted, out);
});

Prettier.run();
