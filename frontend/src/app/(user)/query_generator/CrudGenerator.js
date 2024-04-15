const operations = {
  add: () => `new Model(req.body)
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });`,
  readAll: () => `Model.find()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });`,
  update: () => `Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });`,
  delete: () => `Model.findByIdAndDelete(req.params.id)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });`,
};


export {operations};