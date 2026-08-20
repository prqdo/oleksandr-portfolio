import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Oleksandr's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Oleksandr Sehechenko · Web Developer<\/title>/i);
  assert.match(html, /Looks good/);
  assert.match(html, /Works better/);
  assert.match(html, /Junior Specialist in Computer Engineering/);
  assert.match(html, /fusiiion@protonmail\.com/);
  assert.match(html, /tel:\+491604274683/);
  assert.match(html, /github\.com\/prqdo/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
