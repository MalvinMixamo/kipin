"use client";

import React, { act, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// 1. Tipe Data
interface PieData {
  name: string;
  value: number;
}

// 2. Props Komponen
interface ElegantPieChartProps {
  pemasukkan: number;
  pengeluaran: number;
}

const ElegantPieChart = ({ pemasukkan, pengeluaran }: ElegantPieChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeData, setActiveData] = useState<PieData | null>(null);

  // Ubah input menjadi format array yang dibutuhkan D3
  const data: PieData[] = [
    { name: 'Pemasukkan', value: pemasukkan },
    { name: 'Pengeluaran', value: pengeluaran },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    // Bersihkan SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensi dan Radius
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    // Donut chart (innerRadius > 0)
    const donutWidth = 40; 

    // Warna Modern Elegan
    const color = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.name))
      .range(['#10B981', '#EF4444']); // Hijau Emerald & Merah Salam

    // 3. Persiapkan SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g") // Group untuk menengahkan
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 4. D3 Generators
    const pie = d3.pie<PieData>()
      .value(d => d.value)
      .sort(null); // Kunci: urutan pemasukkan-pengeluaran tetap

    const arc = d3.arc<d3.PieArcDatum<PieData>>()
      .innerRadius(radius - donutWidth) // Radius Dalam (membuat lubang)
      .outerRadius(radius);

    const arcHover = d3.arc<d3.PieArcDatum<PieData>>()
      .innerRadius(radius - donutWidth - 5)
      .outerRadius(radius + 5);

    // 5. Gambar Busur (Slices)
    const arcs = svg.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(d.data.name))
      .attr("stroke", "rgba(255,255,255,0.1)") // Border busur tipis
      .style("stroke-width", "2px")
      .style("cursor", "pointer")
      // Efek Interaktif (Hover)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arcHover as any);
        setActiveData(d.data); // Update angka tengah
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc as any);
        // Kembali ke tampilan default jika diinginkan, 
        // atau biarkan yang terakhir di-select (di sini saya hapus seleksi)
        setActiveData(null); 
      });

  }, [pemasukkan, pengeluaran]); // Re-render jika data berubah

  // 6. Tampilan Tengah (React Rendered)
  // Kita menumpuk Div di atas SVG dengan CSS absolute agar teks bisa di-style elegan
  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <svg className='' ref={svgRef}></svg>
      
      {/* Container Angka Tengah */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none', // Klik menembus teks
        fontFamily: 'sans-serif',
        color: 'white', // Pastikan kontras dengan background kaca
      }}>
        {activeData ? (
          <>
            <div className='text-sm uppercase text-white font-bold' style={{ fontSize: '14px', textTransform: 'uppercase' }}>
              {activeData.name}
            </div>
            <div className={` ${activeData.name === 'Pemasukkan' ? 'text-[#10B981] text-shadow-2xs text-shadow-[#2ff6b4]' : 'text-[#EF4444]'}`} style={{ 
              fontSize: '28px', 
              fontWeight: 'bold'
            }}>
              Rp {activeData.value.toLocaleString('id-ID')}
            </div>
          </>
        ) : (
          <>
            <div className='text-sm uppercase text-white font-bold'>Saldo</div>
            <div className='text-blue-400 font-bold text-[28px] text-shadow-2xs text-shadow-blue-300'>
              Rp {(pemasukkan - pengeluaran).toLocaleString('id-ID')}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ElegantPieChart;