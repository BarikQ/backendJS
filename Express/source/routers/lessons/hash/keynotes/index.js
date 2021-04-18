export const addKeynode = (req, res) => {
  try {
    const data = {
      data: req.body,
    };

      res.status(204).json(data);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};