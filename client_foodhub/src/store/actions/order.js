import { createActions } from 'redux-actions';

export const { sendOrderStart, sendOrderFinish } = createActions({
    SEND_ORDER_START: () => ({}),
    SEND_ORDER_FINISH: () => ({}),
});
