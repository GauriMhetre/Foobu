export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.expose = true;
  }
}

export function errorHandler(err, req, res, next) {
  // Log the full detail server-side only
  console.error('[ERROR]', err.message || err);

  const status = err.status || 500;
  // Send a safe, generic message if the error shouldn't be exposed
  const message = err.expose ? err.message : 'Internal server error';
  
  res.status(status).json({ error: message });
}
