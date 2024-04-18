
// Password must be at least 8 characters long and contain at least one number, one letter, and one special character.
export const passwordRegex = /^(?=(?:\S*\d))(?=(?:\S*[A-Za-z]))(?=\S*[^A-Za-z0-9])\S{8,}/; 