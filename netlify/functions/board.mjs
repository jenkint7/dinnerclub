import { getStore } from "@netlify/blobs";
import { createHandler } from "../../lib/board.mjs";

// Strong consistency makes a read right after a save return what was just saved.
export default createHandler((name) => getStore({ name, consistency: "strong" }));

export const config = { path: "/api/board" };
