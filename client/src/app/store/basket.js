import { createSlice } from "@reduxjs/toolkit";
import basketService from "../service/basket.service";
// import isOutdated from "../utils/isOutdated";
const basketSlice = createSlice({
    name: "basket",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
        // lastFetch: null
    },
    reducers: {
        basketRequested: (state) => {
            state.isLoading = true;
        },
        basketReceved: (state, action) => {
            state.entities = action.payload;
            // state.lastFetch = Date.now();
            state.isLoading = false;
        },
        basketRequestFiled: (state, action) => {
            state.error = action.payload._id;
            state.isLoading = false;
        }
    }
});

const { reducer: basketReducer, actions } = basketSlice;
const { basketRequested, basketReceved, basketRequestFiled } = actions;

export const loadBasketList = () => async (dispatch) => {
    // const { lastFetch } = getState().basket;
    // if (isOutdated(lastFetch)) {
    dispatch(basketRequested());
    try {
        const { content } = await basketService.fetchAll();
        console.log(content);
        dispatch(basketReceved(content));
    } catch (error) {
        dispatch(basketRequestFiled(error.message));
    }
    // }
};

export default basketReducer;
