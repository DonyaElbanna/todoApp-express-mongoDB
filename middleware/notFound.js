const notFound = (req, res) => {
  res
    .status(404)
    .send(
      "<div style='width:fit-content; margin:auto; margin-top: 15rem'><h1>Page Not Found</h1><p>What's worse, a hilarious 404 page can't be found either</p></div>"
    );
};

module.exports = notFound;
