// Local development only.
//
// Netlify's dev tooling loses its storage connection whenever Vite restarts the dev
// server (the old server wipes the new one's settings as it shuts down), which shows
// up as MissingBlobsEnvironmentError. Instead we run our own local storage server,
// kept on globalThis so it survives restarts. Data lives in .netlify/blobs-serve.

type DevOptions = { siteID: string; token: string; edgeURL: string; uncachedEdgeURL: string };

export function devBlobsOptions(): Promise<DevOptions> {
  const g = globalThis as typeof globalThis & { __localBlobs?: Promise<DevOptions> };
  g.__localBlobs ??= (async () => {
    const { BlobsServer } = await import('@netlify/blobs/server');
    const token = 'local-dev';
    const server = new BlobsServer({ directory: '.netlify/blobs-serve', token });
    const { port } = await server.start();
    const url = `http://localhost:${port}`;
    return { siteID: 'local', token, edgeURL: url, uncachedEdgeURL: url };
  })();
  return g.__localBlobs;
}
