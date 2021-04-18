export const get = (req, res) => {
  try {
    res.status(200).json({ data: ['Lessons']});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const post = (req, res) => {
  try {
    res.status(201).json({ data: req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};