import { NextResponse } from "next/server"
import { useEffect, useState } from "react"

interface modul{
    isActive: boolean,
    onClose: () => void,
    onRefresh: () => void
}

interface Category{
    id: number,
    name: string,
    type: string

}
export default function AddModul({isActive, onClose, onRefresh}:modul){
    const [categories, setCategories] = useState<Category[]>([])
    const incomeCategories = categories.filter(cat => cat.type.toLowerCase() === 'income')
    const expenseCategories = categories.filter(cat => cat.type.toLowerCase() === 'expense')
    const fetchCategory = async() => {
        try{
            const res = await fetch('/api/category', {method: 'GET'})
            const category = await res.json()
            setCategories(category)
        }catch(err){
            return NextResponse.json(err, {status: 500})
        }
    }

    const [selectedCategory, setSelectedCategory] = useState("");

// Helper component agar kode tidak berulang (Modular)
    const CategoryRadioGroup = ({ title, items, colorClass }: any) => (
    <div className="flex flex-col gap-3">
        <h3 className="font-bold text-yellow-500 uppercase text-xs tracking-wider">{title}</h3>
        <div className="grid grid-cols-2 gap-2">
        {items.map((category: any) => (
            <label key={category.id} className="cursor-pointer group">
            {/* Input Radio Tersembunyi */}
            <input
                type="radio"
                name="category"
                value={category.id}
                className="peer hidden"
                onChange={() => setSelectedCategory(category.id)}
                checked={selectedCategory === category.id}
                required
            />
            
            {/* Box Style Custom */}
            <div className={`
                px-4 py-2 rounded-xl border-2 text-center transition-all duration-200
                peer-checked:bg-white peer-checked:shadow-md
                ${selectedCategory === category.id ? colorClass : 'bg-gray-50 border-transparent text-gray-500'}
            `}>
                <p className="text-sm font-medium">{category.name}</p>
            </div>
            </label>
        ))}
        </div>
    </div>
    );


    useEffect(() => {fetchCategory()}, [])
    const [data, setData] = useState({
        amount: '',
        description: '',
        userId: '',
        categoryId: 0
    })
    if(!isActive){
        return(null)
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault()
        try{
            const res = await fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify({...data, categoryId: selectedCategory, userId: 1})
            })
            if(!res) alert('error')
            alert('data berhasil ditambahkan')
            onClose()
            onRefresh()
        }catch(err){
            alert('error')
            return NextResponse.json(err, {status: 400})
        }
    }
    return(
        <div className="absolute w-screen bg-black/20 top-0 left-0 h-screen">
            <div className="glass-container bg-slate-800 w-[90%] m-auto my-5">
                <form onSubmit={handleSubmit} className="flex flex-col p-6">
                    <label htmlFor="amount" className="text-yellow-500 font-bold">Jumlah (Rp)</label>
                    <input type="number" required name="amount" id="amount" className="focus-within:outline-none border-glass bg-transparent backdrop-blur-2xl rounded-lg px-2 py-2" onChange={(e) => setData({...data, amount: e.target.value})} />
                    <div className="flex flex-col mt-5">
                        <div className="space-y-8 p-4 border-glass rounded-lg">
                        {/* Section Income */}
                        <CategoryRadioGroup 
                        title="Pemasukan (Income)" 
                        items={incomeCategories} 
                        colorClass="border-emerald-500 text-emerald-600" 
                        />

                        <hr className="border-glass" />

                        {/* Section Expense */}
                        <CategoryRadioGroup 
                        title="Pengeluaran (Expense)" 
                        items={expenseCategories} 
                        colorClass="border-rose-500 text-rose-600" 
                        />
                    </div>
                    </div>
                    <label htmlFor="deskripsi" className="font-bold text-yellow-500 mt-5">Keterangan</label>
                    <input type="text"  onChange={(e) => setData({...data, description: e.target.value})} required placeholder="Cth: Membeli buah" className="border-glass px-3 py-2 rounded-md"/>

                    <div className="flex flex-row justify-between mt-4">
                        <button onClick={onClose} className="text-red-500 border border-red-500 px-3 py-2 rounded-md">Batal</button> //onClose error
                        <button type="submit" className="border border-yellow-500 text-yellow-500 px-3 py-2 rounded-md">Tambahkan</button>
                    </div>
                </form>
            </div>
        </div>
    )
}