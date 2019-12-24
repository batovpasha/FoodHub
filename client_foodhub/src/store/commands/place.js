export const addPlace = data => async (dispatch, _getState, { placeAPI }) => {
    try {
        await placeAPI.addPlace(data);
    } catch (error) {
        console.error(error);
    }
};
