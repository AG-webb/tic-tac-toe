const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const SET_AS_COMPLETED = "SET_AS_COMPLETED";

const initialState = {
    items: [
        {
            id: 1,
            title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, commodi! Ipsa assumenda praesentium, adipisci soluta maiores quasi aut! Voluptate repellendus velit fugit architecto quod atque quis ullam sapiente ex asperiores.",
            status: "ongoing",
        },
        {
            id: 2,
            title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, commodi! Ipsa assumenda praesentium, adipisci soluta maiores quasi aut! Voluptate repellendus velit fugit architecto quod atque quis ullam sapiente ex asperiores.",
            status: "ongoing",
        },
        {
            id: 3,
            title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, commodi! Ipsa assumenda praesentium, adipisci soluta maiores quasi aut! Voluptate repellendus velit fugit architecto quod atque quis ullam sapiente ex asperiores.",
            status: "ongoing",
        }
    ]
};

const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ITEM: 
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        id: state.items.length + 1,
                        title: action.title,
                        status: "ongoing",
                    }
                ],
            }
        case DELETE_ITEM: 
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.id),
            }
        case SET_AS_COMPLETED: 
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.id){
                        if(item.status === "ongoing") {
                            return {
                                ...item,
                                status: "completed",
                            }
                        } else {
                            return {
                                ...item,
                                status: "ongoing",
                            }
                        }
                    } else {
                        return item;
                    }
                })
            }
        default:
            return state;
    }
}

export const addItem = (title) => ({
    type: ADD_ITEM,
    title,
});

export const deleteItem = (id) => ({
    type: DELETE_ITEM,
    id,
});

export const setAsCompleted = (id) => ({
    type: SET_AS_COMPLETED,
    id,
});

export default mainReducer;

