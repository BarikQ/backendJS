export const getKeynoteByHash = (req, res) => {
  try {
    const data = {
      data: {'keynote':req.params.keynoteHash}
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteKeynoteByHash = (req, res) => {
  try {
    const data = {
      hash: req.params.keynoteHash,
    };

    res.status(204).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};