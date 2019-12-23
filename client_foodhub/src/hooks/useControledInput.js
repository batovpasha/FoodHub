import { useState, useCallback } from 'react';

export const useControlledInput = defaultValue => {
    const [value, setValue] = useState(defaultValue);
    const onChange = useCallback(e => setValue(e.target.value), []);
    return [value, onChange, setValue];
};
