export const LoginLoader = async (): Promise<null> => {
  return new Promise((resolve) => {
    const sessionCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('connect.sid='));

    if (sessionCookie) window.location.href = '/dashboard';

    resolve(null);
  });
};
