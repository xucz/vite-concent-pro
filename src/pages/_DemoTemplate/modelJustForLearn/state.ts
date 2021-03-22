
function getInitialState() {
  return {
    desc: 'I am an empty module',
    loading: false,
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
