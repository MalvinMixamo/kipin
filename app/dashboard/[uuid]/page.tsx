'use client'
import { useEffect, useState, useMemo } from "react";
import ElegantPieChart from "@/app/components/chart";
import NavBottom from "@/app/components/Nav-bottom";
import { Home, Search, Clock, User } from "lucide-react";
import AddModul from "@/app/components/addModul";
import { NextResponse } from "next/server";

export const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "History", href: "/history", icon: Clock },
  { label: "Profile", href: "/profile", icon: User },
];

export default function Dashboard() {
    const [showModul, setShowModul] = useState(false)
    interface Transaction {
        id: number;
        description: string;
        amount: number;
        category: {
            type: 'income' | 'expense';
        };
    }


    const [datas, setDatas] = useState<Transaction[]>([]);
    const [activeTab, setActiveTab] = useState("Home");

    const fetchTransaction = async () => {
        try {
            const res = await fetch(`/api/transaction`);
            const trans = await res.json();
            setDatas(trans);
        } catch (err) {
            return NextResponse.json(err)
        }
    }

    const handleDeleteTrans = async(e: any) => {
        try{
            if(confirm('Kamu yakin mau hapus transaksi ini?')){
                await fetch(`/api/transaction/${e}`, {
                    method: 'DELETE'
                })
                fetchTransaction()
            }          
        }catch(err: any){
            return NextResponse.json(err, {status: 400})
        }
    }

    useEffect(() => { fetchTransaction() }, []);

    const stats = useMemo(() => {
        const income = datas
        .filter(item => item.category.type.toLowerCase() === 'income')
        .reduce((sum, item) => sum + Number(item.amount), 0);
        console.log(income)

        const expense = datas
            .filter(item => item.category.type.toLowerCase() === 'expense')
            .reduce((sum, item) => sum + Number(item.amount), 0);

        return { income, expense, balance: income - expense };
    }, [datas]);
    return (
        <div className={`p-6 relative ${showModul ? 'overflow-hidden h-[95vh]' : 'overflow-scroll'}`}>
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 col-span-3 bg-transparent glass-container rounded shadow">
                    <h3 className="text-blue-400">Balance</h3>
                    <p className="text-2xl font-bold">Rp {stats.balance.toLocaleString()}</p>
                </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-10 p-2 bg-transparent glass-container">
                <ElegantPieChart 
                    pemasukkan={stats.income} 
                    pengeluaran={stats.expense} 
                />
                <div className="flex flex-row justify-between w-[85%]">
                    <div className="flex flex-row items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Pengeluaran
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        Pemasukkan
                    </div>

                </div>
            </div>
            <div className="space-y-2 mt-10 glass-container bg-transparent overflow-y-scroll mb-32">
                <button onClick={() => setShowModul(true)} className="mt-3 ml-3 bg-amber-500 w-fit px-2 py-3 rounded-md">+ Transaksi</button>
                {datas.map((item) => (
                    <div key={item.id} className="py-5 px-3 rounded flex justify-between border-b border-b-white/10 w-xl items-center">
                        <span>{item.description.toUpperCase()}</span>
                        <span>{item.category.type.toLowerCase() === 'income' ? 'Pemasukkan' : 'Pengeluaran'}</span>
                        <span className={item.category.type.toLowerCase() === 'income' ? 'text-green-600' : 'text-red-600'}>
                            {item.category.type.toLowerCase() === 'income' ? '+' : '-'} Rp {Number(item.amount).toLocaleString()}
                        </span>
                        <button
                            onClick={() => handleDeleteTrans(item.id)} 
                            className="bg-red-400 px-3 py-2 rounded-md cursor-pointer hover:bg-red-700 transition-all"
                        >
                            Hapus
                        </button>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex justify-center">
            <nav className="relative glass-container bg-slate-800 w-full max-w-md h-20 rounded-[30px] shadow-2xl flex items-center justify-around px-2">
                {NAV_ITEMS.map((item) => (
                <div key={item.label} onClick={() => setActiveTab(item.label)} className="flex-1 h-full">
                    <NavBottom 
                        label={item.label} 
                        icon={item.icon} 
                        href={''}
                        isActive={activeTab === item.label} 
                    />
                </div>
                ))}
            </nav>
            </div>
            <AddModul isActive={showModul} onClose={() => setShowModul(false)} onRefresh={fetchTransaction}></AddModul>
        </div>
    );
}