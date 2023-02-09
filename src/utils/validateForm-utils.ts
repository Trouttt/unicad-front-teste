const validateText = (text: string): boolean => {
  if (text.length < 3) return false;
  return true;
};

export { validateText };
