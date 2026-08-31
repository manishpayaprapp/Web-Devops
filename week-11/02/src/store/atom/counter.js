    import {atom, selector} from 'recoil';

    export const atomCounter = atom ({
        default : 0,
        key : "counter"
    });
    export const evenSelector = selector({
        key : "isEvenSelector",
        get : ({get}) => {
            const currentCount = get(atomCounter);
            return currentCount % 2 == 0;
        }
    })