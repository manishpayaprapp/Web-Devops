import { atom, selector } from 'recoil';

export const networkNotificationAtom = atom({
    key : "nNCounter",
    default : 104
})
export const notificationAtom = atom({
    key : "nCounter",
    default : 12
})
export const jobsAtom = atom({
    key : "jCounter",
    default : 0
})
export const messageAtom  = atom({
    key : "mCounter",
    default : 89
})
export const meSelector = selector({
    key : "meSelector",
    get :({get}) =>{
        const notificationCount = get(notificationAtom)
        const networkNotificationCount =get(networkNotificationAtom)
        const jobsCount = get(jobsAtom)
        const messageCount = get(messageAtom)
        return notificationCount + networkNotificationCount + jobsCount + messageCount;
    }
})