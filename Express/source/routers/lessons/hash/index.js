export const getByHash = (req, res) => {
  try {
      res.status(200).json({ data: {'lesson':'object'} });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

export const putByHash = (req, res) => {
  try {
      res.status(200).json({
         data: {'hash':req.params.lessonHash},
         body: req.body,
      });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

export const deleteByHash = (req, res) => {
  try {
      res.status(204).send('(no example available)');
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};
