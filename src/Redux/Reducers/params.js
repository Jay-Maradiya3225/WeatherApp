const params = (state = {}, action) => {
  switch (action.type) {
    default:
      return {...state, ...(action.payload || {})};
  }
};

export default params;
