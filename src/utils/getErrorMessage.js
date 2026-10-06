export default function getErrorMessage(error, fallback = 'Something went wrong.') {
  const data = error?.response?.data;

  if (typeof data === 'string' && data.trim()) return data;
  if (data?.message) return data.message;
  if (typeof data?.error === 'string') return data.error;
  if (Array.isArray(data?.errors) && data.errors.length) {
    const first = data.errors[0];
    return typeof first === 'string' ? first : first?.message || fallback;
  }
  if (error?.code === 'ERR_NETWORK') return 'Cannot reach the server. Check your connection.';

  return fallback;
}
