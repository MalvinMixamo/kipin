import NavBar from "./components/Navbar"
import Credit from "./components/credit"
import BarChart from "./components/chart"
export default function Page(){
    return(
        <div className="flex flex-col relative">
            <NavBar></NavBar>
            <div className="md:mx-20  md:mt-40 p-10 flex flex-col items-center md:items-start justify-between   md:flex-row">
                <div className="flex items-center relative justify-center">
                    <h1 className="mt-10 text-4xl md:text-5xl md:w-92 md:text-left font-black text-slate-700 text-center w-82">Best way to tracking <span className="text-fuchsia-600">Money</span></h1>
                    <div className="absolute bottom-1 -z-50 w-20 h-20 rounded-full blur-[30px] bg-fuchsia-500 left-auto"></div>
                </div>
                <Credit name={""} user_id={0} saldo={0}></Credit>
            </div>
        </div>
    )
}