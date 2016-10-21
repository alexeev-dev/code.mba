function loadElements(list) {
  for (let name in list) {
    let selector = list[name];
    if (typeof selector === 'string') {
      list[name] = $(selector);
    } else if (typeof selector === 'object') {
      loadElements(list[name]);
    }
  }
}

export {loadElements};
