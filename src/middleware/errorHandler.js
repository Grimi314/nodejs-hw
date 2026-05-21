export const errorHandler = (err, req, res) => {
  res.sratus(500).json({ message: `${err.message}` });
};
