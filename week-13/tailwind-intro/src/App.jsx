import './App.css'

function App() {
  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-stretch gap-2">
        <div className="p-6 w-full bg-white rounded-2xl shadow-lg flex items-center space-x-4">
          <div className="rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 overflow-hidden shrink-0">
          <img className="h-full w-full object-cover" src="https://static.vecteezy.com/system/resources/previews/004/600/593/non_2x/cartoon-animal-design-panda-skateboarding-cute-mascot-logo-vector.jpg" alt="Panda skateboarding" />
          </div>
          <div className="font-medium">
            <h2 className="text-2xl text-gray-900">Panada Gang</h2>
            <p className="text-slate-600">Hi from panda gang</p>
          </div>
        </div>
        <button className="bg-sky-500 text-center text-white w-full rounded-2xl py-2 hover:bg-white hover:text-gray-700">next</button>
        <div className="rounded-2xl bg-white overflow-hidden flex flex-col md:flex-row items-center">
          <div className="h-48 w-full sm:h-56 md:h-40 md:w-1/2 lg:h-44 shrink-0 overflow-hidden">
            <img className="h-full w-full object-cover" src="https://static.vecteezy.com/system/resources/previews/004/600/385/non_2x/cartoon-animal-design-bulldog-skateboarding-cute-mascot-logo-vector.jpg" alt="Bulldog skateboarding" />
          </div>
          <div className="flex-1 w-full min-h-20 py-8 text-center text-gray-900">AN AWESOME CARD</div>
        </div>
      </div>
    </div>
  )
}

export default App