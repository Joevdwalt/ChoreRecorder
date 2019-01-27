export const checkItem = itemIndex => (
    {
      type: 'CHECK_ITEM',
      payload: itemIndex,
    }
  );

export const refreshItems  = () => (
    {
      type: 'REFRESH_ITEMS',
      payload: {}
    }
);