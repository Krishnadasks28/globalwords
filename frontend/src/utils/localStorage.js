export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("global_words_state");

    if (serializedState == null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state : ", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("global_words_state", serializedState);
  } catch (err) {
    console.error("error in saving state : ", err);
  }
};
