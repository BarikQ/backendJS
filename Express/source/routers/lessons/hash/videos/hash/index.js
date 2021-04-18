export const getVideoByHash = (req, res) => {
  try {
    const data = {
      data: {'video':req.params.videoHash}
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVideoByHash = (req, res) => {
  try {
    const data = {
      hash: req.params.videoHash,
    };

    res.status(204).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
