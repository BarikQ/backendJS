export const getKeynoteByHash = (req, res) => {
  try {
      res.status(200).json({ data: {'keynote':req.params.keynoteHash} });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

export const deleteKeynoteByHash = (req, res) => {
  try {
      res.status(204).send('(no example available)');
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};
