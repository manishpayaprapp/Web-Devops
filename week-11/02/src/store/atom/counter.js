    import {atom} from 'recoil';

    export const atomCounter = atom ({
        default : 0,
        key : "counter"
    });