export const getPassword = () => {
  const { PASSWORD } = process.env;

  if (!PASSWORD) {
      throw new Error('Environment variable PORT should be specified');
  }

  const isValid = /^[3-9]{1}[0-9]{3}$/.test(PASSWORD);

  if (!isValid) {
      throw new Error(
          'Environment variable PORT should a number and be between 3000 and 9999',
      );
  }

  return PASSWORD;
};
