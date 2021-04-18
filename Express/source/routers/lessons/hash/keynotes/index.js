export const addKeynode = (req, res) => {
  try {
      res.status(204).send('(no example available)');
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};