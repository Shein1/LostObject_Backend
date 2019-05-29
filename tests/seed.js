function seed(model) {
  return model.User.create({
    username: "Shein",
    email: "shein@black.pool",
    password: "1234Azer",
    password_confirmation: "1234Azer"
  }).catch(e => {
    /* istanbul ignore next */
    console.log(e);
  });
}


module.exports = {
  seed,
};
