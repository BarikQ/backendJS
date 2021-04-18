export const login = (req, res) => {
  try {
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send('Чёт не так');
  }
};

export const logout = (req, res) => {
  try {
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send('Чёт не так');
  }
};