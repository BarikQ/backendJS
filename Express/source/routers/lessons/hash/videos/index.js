export const addVideo = (req, res) => {
  try {
    const data = {

    };

    res.status(204).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};