'use client'
import { useEffect, useState, useMemo } from "react";

export default function Dashboard() {
    interface Transaction {
    id: number;
    description: string;
    amount: number; // Pastikan tipenya number/Decimal
    category: {
        type: 'income' | 'expense'; // Sesuaikan dengan enum di Prisma
    };
}
    const [datas, setDatas] = useState<Transaction[]>([]);

    const fetchTransaction = async () => {
        try {
            const res = await fetch(`/api/transaction`);
            const trans = await res.json();
            setDatas(trans);
        } catch (err) {
            alert('gagal mendapatkan data');
        }
    }

    useEffect(() => { fetchTransaction() }, []);

    // LOGIKA PENGELOMPOKKAN & PENJUMLAHAN
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
        <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-green-100 rounded shadow">
                    <h3 className="text-green-800">Total Income</h3>
                    <p className="text-2xl font-bold">Rp {stats.income.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-red-100 rounded shadow">
                    <h3 className="text-red-800">Total Expense</h3>
                    <p className="text-2xl font-bold">Rp {stats.expense.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-blue-100 rounded shadow">
                    <h3 className="text-blue-800">Balance</h3>
                    <p className="text-2xl font-bold">Rp {stats.balance.toLocaleString()}</p>
                </div>
            </div>

            {/* Contoh Map untuk list */}
            <div className="space-y-2">
                {datas.map((item) => (
                    <div key={item.id} className="border p-2 rounded flex justify-between">
                        <span>{item.description.toUpperCase()}</span>
                        <span className={item.category.type.toLowerCase() === 'income' ? 'text-green-600' : 'text-red-600'}>
                            {item.category.type.toLowerCase() === 'income' ? '+' : '-'} Rp {Number(item.amount).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}