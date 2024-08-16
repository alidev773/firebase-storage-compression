const generateUniqueImageName = (extension: string): string => {
  const timestamp = new Date().getTime();

  const randomNum = Math.floor(Math.random() * 10000);

  const uniqueIdentifier = `${timestamp}-${randomNum}`;

  const imageName = `${uniqueIdentifier}.${extension}`;

  return imageName;
};

export { generateUniqueImageName };

