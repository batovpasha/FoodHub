import { createActions } from 'redux-actions';

export const { sendOrderStart, sendOrderSuccess, sendOrderFail } = createActions({
    SEND_ORDER_START: (data) => ({ data }),
    SEND_ORDER_SUCCESS: (status) => ({ status }),
    SEND_ORDER_FAIL: (status) => ({ status }),
});
