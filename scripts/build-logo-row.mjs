// Builds the horizontal lockup the nav needs: the supplied logo is vertical
// (mark over HAMPI over SANCTUARY), and at nav height its wordmark is
// unreadable. This re-sets the client's own lettering beside the mark instead
// of substituting a look-alike font.
//
// Usage: node scripts/build-logo-row.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";

/** Source files, named by the brand colour each one carries. */
const SOURCES = {
  green: "public/logoVO_fondotransparente-04.png",
  sage: "public/logoVC_fondotransparente-07.png",
  bone: "public/logoM_fondotransparente-01.png",
};

/** Gap between mark and wordmark, as a share of the mark's height. */
const GAP_RATIO = 0.2;

const alphaAt = (png, x, y) => png.data[(png.width * y + x) * 4 + 3];

/** Rows that hold any ink, grouped into blocks separated by blank rows. */
function rowBlocks(png) {
  const inked = [];
  for (let y = 0; y < png.height; y++) {
    let any = false;
    for (let x = 0; x < png.width && !any; x++) {
      if (alphaAt(png, x, y) > 8) any = true;
    }
    inked.push(any);
  }

  const blocks = [];
  let start = null;
  for (let y = 0; y <= png.height; y++) {
    if (inked[y]) {
      if (start === null) start = y;
    } else if (start !== null) {
      blocks.push({ top: start, bottom: y - 1 });
      start = null;
    }
  }
  return blocks;
}

/**
 * Groups row blocks into the artwork's three elements. The mark carries
 * detached strokes, so blocks are split on the two widest blank gaps rather
 * than assumed to be one block each.
 */
function groupIntoElements(blocks, count) {
  const gaps = blocks
    .slice(1)
    .map((block, i) => ({ at: i + 1, size: block.top - blocks[i].bottom }))
    .sort((a, b) => b.size - a.size)
    .slice(0, count - 1)
    .map((gap) => gap.at)
    .sort((a, b) => a - b);

  const bounds = [0, ...gaps, blocks.length];
  return bounds.slice(1).map((end, i) => {
    const group = blocks.slice(bounds[i], end);
    return {
      top: Math.min(...group.map((b) => b.top)),
      bottom: Math.max(...group.map((b) => b.bottom)),
    };
  });
}

/** Tight bounding box of a row block. */
function boundingBox(png, block) {
  let left = png.width;
  let right = -1;
  for (let y = block.top; y <= block.bottom; y++) {
    for (let x = 0; x < png.width; x++) {
      if (alphaAt(png, x, y) <= 8) continue;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }
  return {
    left,
    top: block.top,
    width: right - left + 1,
    height: block.bottom - block.top + 1,
  };
}

function copyRegion(source, region, target, atX, atY) {
  for (let y = 0; y < region.height; y++) {
    for (let x = 0; x < region.width; x++) {
      const from = (source.width * (region.top + y) + region.left + x) * 4;
      if (source.data[from + 3] === 0) continue;
      const to = (target.width * (atY + y) + atX + x) * 4;
      target.data[to] = source.data[from];
      target.data[to + 1] = source.data[from + 1];
      target.data[to + 2] = source.data[from + 2];
      target.data[to + 3] = source.data[from + 3];
    }
  }
}

for (const [variant, file] of Object.entries(SOURCES)) {
  const source = PNG.sync.read(readFileSync(file));
  const blocks = rowBlocks(source);

  if (blocks.length < 3) {
    throw new Error(
      `${file}: expected mark, HAMPI and SANCTUARY, found ${blocks.length} blocks`,
    );
  }

  // Top to bottom in the supplied artwork. SANCTUARY is dropped: beside the
  // mark it would render around 4px tall and read as a smudge.
  const [mark, wordmark] = groupIntoElements(blocks, 3).map((block) =>
    boundingBox(source, block),
  );

  const gap = Math.round(mark.height * GAP_RATIO);
  const out = new PNG({
    width: mark.width + gap + wordmark.width,
    height: mark.height,
  });
  out.data.fill(0);

  copyRegion(source, mark, out, 0, 0);
  copyRegion(
    source,
    wordmark,
    out,
    mark.width + gap,
    Math.round((mark.height - wordmark.height) / 2),
  );

  const target = `public/logo-row-${variant}.png`;
  writeFileSync(target, PNG.sync.write(out));
  console.log(
    `${target}  ${out.width}x${out.height}` +
      `  (mark ${mark.width}x${mark.height}, wordmark ${wordmark.width}x${wordmark.height})`,
  );
}
