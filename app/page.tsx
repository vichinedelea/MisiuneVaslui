"use client";

import Image from "next/image";
import './globals.css';
import { useState, useEffect } from "react";

export default function Home() {
  const targetAmount = 30000;
  const [progressValue, setProgressValue] = useState(0);

  const calculatePercentage = (sum: number) => sum ? (sum / targetAmount) * 100 : 0;

  // Fetch progress from API route
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("/api/progress");
        const data = await res.json();
        if (typeof data.progress === 'number') setProgressValue(data.progress);
        else setProgressValue(0);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setProgressValue(0);
      }
    };
    fetchProgress();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('RO08BTRLRONCRT0668242601')
      .then(() => alert('Cont RON copiat!'))
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="flex flex-col justify-center items-center text-center p-4 bg-[#fff7f1] min-h-screen">
      
      {/* Titlu */}
      <h1 className="text-5xl font-serif mb-2" style={{ color: '#336600' }}>
        Încălzește un înger
      </h1>

      {/* Subtitlu mai jos, verde mai deschis */}
      <p className="text-xl font-BerkshireSwash mb-4" style={{ color: '#666633' }}>
        lemne și cadouri – Vaslui 2025
      </p>

      {/* Termen limită păstrat */}
      <p className="text-xl font-BerkshireSwash text-[#693b23] mb-6">
        Termen limită: 15 Decembrie
      </p>

      {/* Imagine */}
      <Image src="/theMissionTruck.png" alt="Cadouri si lemne pentru Vaslui" width={200} height={200} className="mb-6" />

      {/* Progress bar */}
      <p className="text-xl text-[#693b23] mb-4">
        <b>{progressValue} lei</b> strânși pentru lemne și cadouri din 40.000 lei
      </p>
      <progress value={calculatePercentage(progressValue)} max={100} className="w-full max-w-lg h-6 mb-6 bg-gray-200"></progress>

      {/* Buton donație */}
      <button
        className="bg-[#b94d14] text-[#ffffff] text-xl font-BerkshireSwash py-3 px-6 rounded-[30px] hover:bg-[#c57e3c] mb-6"
        onClick={handleCopy}
      >
        Copiază contul și donează pentru lemne și cadouri
      </button>

      <p className="text-sm text-[#693b23] mb-4">
        *progress bar-ul este actualizat aproximativ o dată la 3 ore
      </p>

      {/* Informații cont */}
      <div className="text-left text-[#693b23] md:mx-[25%]">
        <p className="text-xl font-BerkshireSwash mb-4">
          Asociația Speranța Fără Frontiere
        </p>
        <h2 className="text-base mb-1">Cont RON</h2>
        <p className="text-base mb-4">RO08BTRLRONCRT0668242601</p>

        <h2 className="text-base mb-1">Cont EUR</h2>
        <p className="text-base mb-4">RO55BTRLEURCRT0668242601</p>

        <h2 className="text-base mb-1">Cont USD</h2>
        <p className="text-base mb-4">RO59BTRLUSDCRT0668242601</p>

        <p className="text-base mb-4">
          Donațiile colectate anul acesta vor fi folosite exclusiv pentru achiziția de lemne de foc și cadouri pentru familiile din Vaslui.
        </p>
        <p className="text-base mb-1">Vă rugăm să menționați în transfer &quot;donație Vaslui&quot; pentru a fi direcționați către această cauză. Vă mulțumim!</p>
        <p className="text-base mb-1">Pentru donații cash: 0723 999 950 - Dumitru Hrișca</p>
      </div>

    </div>
  );
}
