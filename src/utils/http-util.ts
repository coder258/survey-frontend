export const genFormData = (body: { [key: string]: any }): FormData => {
  const formData = new FormData();
  for (const [key, val] of Object.entries(body)) {
    formData.append(key, val);
  }

  return formData;
};
