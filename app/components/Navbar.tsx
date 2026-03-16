export default function NavBar(){
    return(
        <div className="z-50">
            <div className="flex flex-row justify-between items-center bg-white/50 backdrop-blur-2xl px-5 py-4 border-b border-b-slate-200 shadow-md">
                <p className="text-slate-900 text-2xl font-bold">Ki<span className="text-fuchsia-600">pin</span></p>
                <button className="cursor-pointer">- - -</button>
            </div>
        </div>
    )
}