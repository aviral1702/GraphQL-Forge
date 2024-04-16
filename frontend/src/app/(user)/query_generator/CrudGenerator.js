const crudOperations = {
  add: (entityName) => `new ${entityName}Model(args)
                .save()
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });`,
  // readAll: () => `Model.find()
  //       .then((result) => {
  //         res.status(200).json(result);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         res.status(500).json(err);
  //       });`,
  update: (entityName) => `${entityName}Model.findByIdAndUpdate(args.id, { new: true })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });`,
  delete: (entityName) => `${entityName}Model.findByIdAndDelete(args.id).then((res) => {
    if (res) {
        return true;
    }
})
return false;   `,
};

export { crudOperations };
