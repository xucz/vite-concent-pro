
function getInitialState() {
  return {
    num: 1,
    desc: 'this is a demo model!!!!!',
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
