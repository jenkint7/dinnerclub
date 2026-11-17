// Board storage rules. Kept separate from the Netlify wrapper so it can be tested on its own.
export const COUPLE_IDS = ["ts", "tl", "dn1", "tk", "dn2", "jk"];
export const STATUSES = ["yes", "maybe", "no", "fri"];
const DATE = /^20\d\d-\d\d-\d\d$/;
const MAX_BODY_BYTES = 20000;
const MAX_DATES = 80;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export function createHandler(getStore) {
  return async function handler(req) {
    const store = getStore("dinner-club");

    if (req.method === "GET") {
      const couples = {};
      const { blobs } = await store.list();
      for (const blob of blobs) {
        if (!COUPLE_IDS.includes(blob.key)) continue;
        const value = await store.get(blob.key, { type: "json" });
        if (value && value.a) couples[blob.key] = { a: value.a };
      }
      return json({ couples });
    }

    if (req.method === "POST") {
      const text = await req.text();
      if (text.length > MAX_BODY_BYTES) return json({ error: "too large" }, 413);
      let body;
      try { body = JSON.parse(text); } catch { return json({ error: "bad json" }, 400); }
      if (!body || !COUPLE_IDS.includes(body.couple)) return json({ error: "unknown couple" }, 400);
      const entries = Object.entries(body.a && typeof body.a === "object" ? body.a : {});
      if (entries.length > MAX_DATES) return json({ error: "too many dates" }, 413);
      const clean = {};
      for (const [date, status] of entries) {
        if (DATE.test(date) && STATUSES.includes(status)) clean[date] = status;
      }
      await store.setJSON(body.couple, { a: clean });
      return json({ ok: true });
    }

    return json({ error: "method not allowed" }, 405);
  };
}
