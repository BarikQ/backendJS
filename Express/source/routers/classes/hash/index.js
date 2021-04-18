export const getByHash = (req, res) => {
  try {
    const data = {
      data: {'hash':req.params.classHash}
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const putByHash = (req, res) => {
  try {
    const data = {
      data: {'hash':req.params.classHash},
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

    };

    res.status(204).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};