

export default function Credit({ name, user_id, saldo }: { name: string; user_id: number; saldo: number }){
    return (
        <div className="w-102 h-57 scale-75 md:scale-100 shadow-lg shadow-slate-300 drop-shadow-sm rounded-xl px-5 py-3 text-white flex flex-col bg-linear-to-br from-purple-600 via-pink-500 to-yellow-500">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col justify-center">
                    <p className="text-shadow-sm text-shadow-gray-400 text-sm">Card Holder</p>
                    <p className="mt-1 text-shadow-sm text-shadow-gray-400">{name ? name : "Malvin Pradhypta"}</p>
                </div>
                <p className="font-bold text-xl text-shadow-sm text-shadow-gray-400">KIPIN</p>
            </div>
            <div className="flex flex-col justify-center mt-5">
                <p className="text-shadow-sm text-shadow-gray-400 text-sm">Card Number</p>
                <div className="flex flex-row items-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <div key={item} className={`w-2 h-2 rounded-full bg-white shadow-gray-400 shadow-sm ${item === 1 ? "ml-0" : item % 4 === 1 ? "ml-3" : "ml-1"}`}></div>
                    ))}
                    <p className="ml-3 font-bold text-lg text-shadow-md text-shadow-gray-400">{user_id === 0 ? "0316" : user_id}</p>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between mt-5">
                <div className="flex flex-col justify-center">
                    <p className="text-shadow-sm text-shadow-gray-400">Balance</p>
                    <p className="font-bold text-xl text-shadow-sm text-shadow-gray-400">Rp {saldo ? saldo.toLocaleString() : "100.000"}</p>
                </div>
                <div className="flex flex-col justify-center text-right">
                    <p className="font-medium text-shadow-sm text-shadow-gray-400">Exp Date</p>
                    <p className="font-bold text-shadow-sm text-shadow-gray-400">03/26</p>
                </div>
            </div>
        </div>
    )
}