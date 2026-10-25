import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../app.js';

describe('GET /api/health', () => {
  let server;
  let baseUrl;

  beforeAll(async () => {
    await new Promise((resolve) => {
      server = app.listen(0, resolve);
    });
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
      // Node 18 keeps fetch's keep-alive sockets open, which would delay close() by ~5s.
      server.closeAllConnections?.();
    });
  });

  it('returns 200 with an ok status', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('ok');
    expect(typeof body.uptime).toBe('number');
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  });

  it('returns a welcome message at the root', async () => {
    const res = await fetch(`${baseUrl}/`);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.message).toBeDefined();
  });
});
