
import {useRecoilValue, RecoilRoot } from "recoil";
import { networkNotificationAtom, notificationAtom, messageAtom, jobsAtom, meSelector} from "./store/counter";
function App(){
  return <>
  <RecoilRoot>
    <MainApp/>
  </RecoilRoot>
  </>
}
function MainApp(){
  const networkNotificationCount = useRecoilValue(networkNotificationAtom)
  const notificationCount = useRecoilValue(notificationAtom)
  const messageCount = useRecoilValue(messageAtom)
  const jobsCount = useRecoilValue(jobsAtom)
  const meCount  = useRecoilValue(meSelector)
  return <>
  <button>Home</button>
  <button>Network Notifiaction ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount })</button>
  <button>Jobs ({jobsCount})</button>
  <button>Message ({messageCount})</button>
  <button>Notification ({notificationCount})</button>
  <button>Me({meCount})</button>
  </>
}
export default App;