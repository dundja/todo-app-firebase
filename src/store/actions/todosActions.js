import * as actions from "./actionTypes";

// add a todo
export const addTodo = data => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const todosList = await firestore
        .collection("todos")
        .doc(userId)
        .get();

    dispatch({ type: actions.ADD_TODO_START });
    try {
        console.log(todosList.data());
        const newTodo = {
            id: new Date().valueOf(),
            todo: data.todo
        };

        if (todosList.data() === undefined) {
            firestore
                .collection("todos")
                .doc(userId)
                .set({
                    todos: [newTodo]
                });
        } else {
            firestore
                .collection("todos")
                .doc(userId)
                .update({
                    todos: [...todosList.data().todos, newTodo]
                });
        }

        dispatch({ type: actions.ADD_TODO_SUCCESS });

        return true;
    } catch (err) {
        dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
    }
};
