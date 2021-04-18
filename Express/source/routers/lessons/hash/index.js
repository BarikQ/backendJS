export const getByHash = (req, res) => {
  try {
    const data = {
      data: {lesson:'object', hash: req.params.lessonHash},
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const putByHash = (req, res) => {
  try {
    const data = {
      data: {'hash':req.params.lessonHash},
      body: req.body,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteByHash = (req, res) => {
  try {
    const data = {
      data: req.body,
    };

    res.status(204).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
