/** Shared coordinates for the pipeline diagram (SVG viewBox units). */
export const VIEW_W = 1240;
export const VIEW_H = 300;

export const NODE_W = 128;
export const NODE_H = 84;
export const NODE_TOP = 112;
export const NODE_MID = NODE_TOP + NODE_H / 2;
/** Bottom of the HTML label that sits under each node. */
export const LABEL_BOTTOM = 232;

const FIRST_X = 28;
const STEP = 211;

/** Left edge of stage i (0-based). */
export function stageX(i: number) {
  return FIRST_X + i * STEP;
}

/** Orchestration rail spanning extraction → warehouse. */
export const RAIL = {
  y: 54,
  x1: stageX(1),
  x2: stageX(4) + NODE_W,
};
