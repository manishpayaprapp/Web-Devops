import './App.css'
import { Button } from './components/UI/Button.tsx'
import { PlusIcon } from './icons/PlusIcon.tsx'
import { ShareIcon } from './icons/ShareIcon.tsx'

function App() {

  return (
    <>
      <Button
        variant={"primary"}
        startIcon={<PlusIcon size={"lg"} />}
        endIcon={<ShareIcon size={"lg"} />}
        size="lg"
        title={"Share"}
      ></Button>

      <Button
        variant={"secondary"}
        startIcon={<PlusIcon size={"lg"} />}
        endIcon={<ShareIcon size={"lg"} />}
        size="lg"
        title={"Share1"}
      ></Button>
      <br />

      <Button
        variant={"primary"}
        startIcon={<PlusIcon />}
        endIcon={<ShareIcon />}
        size="sm"
        title={"Share2"}
      ></Button>


      <Button
        variant={"primary"}
        startIcon={<PlusIcon size={"md"} />}
        endIcon={<ShareIcon size={"md"} />}
        size="md"
        title={"Share3"}
      ></Button>
    </>
  )
}

export default App