export const getVideoByHash = (req, res) => {
  try {
      res.status(200).json({ data: {'video':req.params.videoHash} });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

export const deleteVideoByHash = (req, res) => {
  try {
      res.status(204).send('(no example available)');
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};
