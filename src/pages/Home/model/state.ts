
function getInitialState() {
  return {
    value: 0,
    bigValue: 100,
    barData: [] as any[],
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
