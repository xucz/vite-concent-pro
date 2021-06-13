
function getInitialState() {
  return {
    value: 0,
    bigValue: 100,
    toInc: 2,
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
