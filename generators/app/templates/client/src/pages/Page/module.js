/**
 * Following the duck pattern, actions, constants and reducers are in the same file called module.js
 * 
 * See: https://github.com/erikras/ducks-modular-redux
 * 
 */

 /**
 * Constants should be scoped to their module: use the string Page/ADD_ITEM instead of ADD_ITEM
 */
const ADD_ITEM = 'Page/ADD_ITEM';

export function addItem(item) {
  return {
    type: ADD_ITEM,
    payload: item,
  };
}

const initialState = {
  list: [
    { id: 1, label: 'item1' },
    { id: 2, label: 'item2' },
  ],
};

/**
 * Following the duck pattern, the module.js file should export a reducer as a default function
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        list: [
          ...state.list,
          { id: state.list.length + 1, label: action.payload },
        ],
      };
    default:
      return state;
  }
}
