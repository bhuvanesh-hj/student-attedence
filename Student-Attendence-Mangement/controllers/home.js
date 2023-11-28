exports.getHomePage = async (req,res) => {
  try {
    res.sendFile("index.html", { root: "views" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
