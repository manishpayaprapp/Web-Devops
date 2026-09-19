// sm, md, lg, xl, 2xl

export function SidebarClass1() {
    return <div className="flex">
        <div className="transition-all ease-in-out duration-200 md:w-96  h-screen w-0 ">
            <button className="transition-all duration-1000 hover:p-16 p-8 bg-pink-600 hover:bg-sky-400 mx-5 rounded-xl my-5" >Sidebar</button>
        </div>
        <div className="bg-green-800 h-screen flex-1">
            Content
        </div>
    </div>
}