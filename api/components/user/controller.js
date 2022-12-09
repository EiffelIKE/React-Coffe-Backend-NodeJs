const TABLA = "user";

module.exports = function (injectStore) {
  let store = injectStore ? injectStore : require("../../../store/fake");

  function list() {
    return store.list(TABLA);
  }

  return {
    list,
  };
};
