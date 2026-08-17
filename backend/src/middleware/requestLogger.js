export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    // Only log method, path, status, and duration (no sensitive data)
    console.log(`[REQ] ${req.method} ${req.originalUrl} ${res.statusCode} — ${Date.now() - start}ms`);
  });
  next();
}
