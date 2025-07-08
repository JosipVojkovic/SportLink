export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  return regex.test(password);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPasswordMatching = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  const regex = /^\+[1-9]\d{6,14}$/;

  return regex.test(cleaned);
}
