# IZZAT editor — browser preview

This directory adds a small mobile-responsive web layer to the IZZAT Concat fork.
It is **not the native Concat editor running in a browser**. The native Rust,
Slint and FFmpeg engine has not been connected or replaced.

## Available behavior

- Local video selection, playback and in/out points.
- 9:16, 16:9 and square output; contain or center crop.
- Fixed text overlay and a generated eight-second demonstration.
- Experimental real-time export through canvas + MediaRecorder + Web Audio.
- Explicit support detection and JSON editing-decision download.
- No uploads, storage service, analytics, paid model calls or external assets.

MP4 or WebM is chosen from the browser's supported codecs. Mobile Safari support
must be checked on the actual device. Export requires keeping the page visible;
backgrounding cancels it. Export is real-time and is not frame-accurate FFmpeg
rendering. The decision JSON is an IZZAT preview format, **not** a Concat project.
The demo is silent; imported videos route their audio through Web Audio.

## Local verification

From the repository root:

```sh
node --check web/editor.js
node --test web/tests/*.test.mjs
python -m http.server 4173 --directory web
```

Open localhost:4173, choose the demonstration, trim from 1 to 3 seconds, add text,
export and play the downloaded file. Then repeat with a real MP4 containing audio.
Verify output duration, audio sync, all aspect ratios, cancellation, file replacement,
unsupported-codec handling and a 390px-wide viewport. Node checks do not establish
that those browser/media checks pass.

## Cloudflare deployment

The assets-only `wrangler.jsonc` targets the requested custom domain. No Vercel,
Railway, separate project management or memory service is introduced.

With an existing authorized Cloudflare connection and Wrangler available:

```sh
cd web
wrangler deploy --dry-run
wrangler deploy
```

Before deployment inspect the existing DNS, custom-domain ownership and any
Worker/Tunnel route for editor.izzatglobal.com. Do not overwrite a live service
without recording its prior configuration. If no matching Worker exists this
creates `izzat-editor`; otherwise reconcile the existing target first. Follow the
account's publication approval requirements. No deployment is performed by CI.

## Native engine follow-up

The verified native API uses JSON-RPC 2.0 over line transports, not browser HTTP:
`src/crates/concat-api/src/rpc.rs` and `message.rs` (API 0.2).
An authenticated runtime adapter, local-file ingestion/storage and explicit project
translation are required before enabling native preview/export. Cloudflare Workers
serve/control the web layer; do not assume Rust GUI/FFmpeg can run inside a Worker.
Keep the current disconnected indicator until an actual adapter health/version
handshake and end-to-end native rendering have passed. Never expose raw unauthenticated
TCP RPC, machine paths or API secrets to the browser.

License: AGPL-3.0-or-later, consistent with the parent repository. Native upstream
provenance and notices are preserved. This preview does not claim upstream branding.
