import { getStore } from "@netlify/blobs";
import { createHandler } from "../../lib/board.mjs";

export default createHandler(getStore);

export const config = { path: "/api/board" };
