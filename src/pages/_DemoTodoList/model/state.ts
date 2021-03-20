function getInitialState() {
  return {
    value: 0,
    bigValue: 100,
    keyword: '',
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
