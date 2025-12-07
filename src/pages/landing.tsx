import React from "react";
import Header from "../components/landing/header";
import { BotIcon, ChartLineIcon, icons, LayoutDashboardIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/landing/footer";

const LandingPage:React.FC = () => {
    const navigate = useNavigate()
    const beranda = [
        {
            icon: <LayoutDashboardIcon size={170} strokeWidth={1.75}/>,
            title: "Dashboard Interaktif",
            desc: "Menampilkan data data terkait bisnis Anda"
        },
        {
            icon: <BotIcon size={170} strokeWidth={1.75}/>,
            title: "Asisten Bisnis AI",
            desc: "Asisten pembantu dan konsultan cerdas untuk bisnis anda"
        },
        {
            icon: <ChartLineIcon size={170} strokeWidth={1.75}/>,
            title: "Managemen Keuangan Cerdas",
            desc: "Mengawasi keuangan anda dan memberikan saran efektif untuk pengembangan bisnis anda"
        }
    ]
    return(        
        <div className="text-white bg-(--primary)">
            <Header />
                <main className="flex flex-col snap-y snap-mandatory pt-[70px]">
                    <section id="Beranda" className="h-screen scroll-mt-20 items-center text-center flex flex-col ">
                        <div className="items-center text-center flex flex-col">
                            <p className="text-4xl w-[70%] font-black py-5">Kembangkan dan Kelola Bisnis Menggunakan NusaBiz</p>
                            <p className="text-xl opacity-70">Kelola Bisnis dengan AI</p>
                            <button className="bg-(--secondary) p-3 font-bold mt-6 rounded-2xl text-xl w-[25%]" onClick={()=>navigate("/auth")}>
                                Gabung Sekarang
                            </button>   
                        </div>
                        <div className="flex flex-row justify-between mt-50">
                            {beranda.map((data)=>(
                                <div className="flex flex-col items-center w-[30%]">
                                    <div>{data.icon}</div>
                                    <p className="text-3xl font-medium">{data.title}</p>
                                    <p className="text-xl opacity-60 w-[90%]">{data.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>  
                    <section id="Tentang" className="h-screen scroll-mt-20 flex flex-row gap-5 px-10 pb-10 scale-80">
                        <div className="w-[40%]">
                            <img src="/images/landing/chat.png" className="border border-[#e5e5e5] rounded-xl" />
                        </div>
                        <div className="flex flex-col gap-5 text-2xl w-full py-2">
                            <p className="text-4xl font-semibold">Apa itu NusaBiz?</p>
                            <p>NusaBiz adalah platform manajemen keuangan dan analisis bisnis berbasis web yang membantu UMKM Indonesia mengelola usaha dengan lebih mudah dan lebih cerdas. Aplikasi ini menyederhanakan pencatatan transaksi, pengelolaan stok, dan pemantauan performa bisnis melalui dashboard real-time.</p>
                            <p>Dengan dukungan AI, nusaBiz memberikan insight otomatis, rekomendasi strategi, serta simulasi “what-if” untuk membantu pemilik usaha mengambil keputusan yang lebih tepat.</p>
                            <p>Tujuan kami adalah menghadirkan solusi keuangan yang praktis, terjangkau, dan cerdas — agar pelaku UMKM dapat fokus menjalankan bisnis, sementara nusaBiz menangani detail perhitungannya.</p>
                        </div>
                    </section>
                    <section id="Fitur" className="h-full scroll-mt-20 flex flex-col gap-5 px-10 pb-10 scale-80">
                        <p className="text-4xl font-semibold">Fitur NusaBiz?</p>
                        <div className="flex flex-col gap-9">
                            <div className="flex flex-row items-center gap-4">
                                <img src="/images/landing/dashboard.png" className="w-[50%] border border-[#e5e5e5] rounded-xl"/>
                                <div className="border border-[#e5e5e5] p-7 flex flex-col gap-2 h-fit rounded-2xl">
                                    <p className="text-3xl">DASHBOARD - Interaktif</p>
                                    <p className="text-xl">Dashboard nusaBiz dirancang untuk memberikan gambaran lengkap tentang kondisi bisnis secara cepat dan mudah dipahami. Pemilik usaha tidak perlu lagi menghitung manual atau membuka banyak halaman—semua informasi penting tersaji dalam satu layar yang rapi dan real-time.</p>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse items-center  gap-4">
                                <img src="/images/landing/dashboard.png" className="w-[50%] border border-[#e5e5e5] rounded-xl"/>
                                <div className="border border-[#e5e5e5] p-7 flex flex-col gap-2 h-fit rounded-2xl">
                                    <p className="text-3xl">Kelola Keuangan Pintar </p>
                                    <p className="text-xl">nusaBiz memudahkan pemilik usaha untuk mencatat setiap pemasukan dan pengeluaran secara cepat dan akurat. Sistem transaksi dibuat dinamis, sehingga menampilkan field sesuai jenis transaksi—mulai dari penjualan produk hingga pengeluaran operasional. Semua perhitungan seperti total pendapatan, total pengeluaran, hingga update stok dilakukan otomatis oleh sistem.</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <img src="/images/landing/dashboard.png" className="w-[50%] border border-[#e5e5e5] rounded-xl"/>
                                <div className="border border-[#e5e5e5] p-7 flex flex-col gap-2 h-fit rounded-2xl">
                                    <p className="text-3xl">Analisis Bisnis Berbasis AI</p>
                                    <p className="text-xl">Fitur analisis nusaBiz dirancang untuk membantu pemilik usaha melihat gambaran besar dari performa bisnis mereka. Sistem akan membaca seluruh data transaksi pengguna, mulai dari pemasukan, pengeluaran, stok, hingga tren penjualan, lalu mengubahnya menjadi insight yang mudah dipahami. Dengan teknologi AI, nusaBiz tidak hanya menampilkan angka, tetapi juga menjelaskan arti di balik data tersebut: apa yang berjalan baik, apa yang perlu diperbaiki, dan bagaimana bisnis bisa tumbuh lebih optimal.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </main>
        </div>
    )
}
export default LandingPage