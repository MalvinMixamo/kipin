import Link from 'next/link';
import { LucideIcon } from 'lucide-react'; // Import tipe data icon

interface NavItemProps {
  label: string;
  // Gunakan LucideIcon alih-alii any agar properti size/className terbaca
  icon: LucideIcon; 
  isActive: boolean;
  href: string;
}

export default function NavBottom({ label, icon: Icon, isActive, href }: NavItemProps) {
  return (
    <Link href={href || ''} className="flex flex-col items-center justify-center relative w-full h-full">
      {/* {isActive ? (
        
      ) : (
        <div className="flex flex-col items-center">
          <Icon size={24} className="text-gray-400" />
          <span className="mt-1 text-xs text-gray-400 font-medium">{label}</span>
        </div>
      )} */}
      <div className="flex flex-col items-center">
          {/* Lingkaran Putih yang Menonjol */}
          {/* Pastikan warna border-4 sama dengan warna background utama aplikasimu */}
          <div className={`absolute ${isActive ? '-top-8 bg-slate-800 rounded-full  shadow-md border-[6px] border-[#1e1e2f]' : 'top-0 text-gray-400 border-none'} p-3 transition-[top]`}>
            <Icon size={24} className={`${isActive ? 'text-[#7C3AED] fill-[#7C3AED]/20' : 'text-gray-400 fill-none' }`} />
          </div>
          {/* Margin top besar untuk memberi ruang bagi icon yang melayang */}
          <span className={`mt-8 text-xs font-bold ${isActive ? 'text-[#7C3AED]' : 'text-gray-400' }`}>{label}</span>
        </div>
    </Link>
  );
}