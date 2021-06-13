
function getInitialState() {
  return {
    small: 1,
    big: 100,
    loading: false,
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
