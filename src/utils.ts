export const logEvent = (event: { name: string; data?: Record<string, any> }) => {
  const msg = `[Log] ${event.name}:`;
  const payload = event.data ? JSON.stringify(event.data) : '{}';
  if (event.name === 'error') {
    console.error(msg, payload);
  } else if (event.name.includes('warn')) {
    console.warn(msg, payload);
  } else {
    console.log(msg, payload);
  }
};

export const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

// Safe error sanitization
export const getSafeErrorMessage = (err: any) => {
  const msg = err.message || '';
  if (msg.includes('not found')) return 'User Not Found';
  if (msg.includes('401') || msg.includes('403')) return 'GitHub Auth Error';
  if (msg.includes('rate limit')) return 'GitHub Rate Limit';
  return 'System Error';
};

