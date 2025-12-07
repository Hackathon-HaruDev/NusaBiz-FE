/**
 * Business Setup Modal
 * Step-by-step form for business registration after user signup
 */

import {
  X,
  Building2,
  Tag,
  MapPin,
  Wallet,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { createBusiness } from "../../services/api/business.service";
import { createTransaction } from "../../services/api/transaction.service";
import { useNavigate } from "react-router-dom";
import { listed } from "../../constant/listed";

interface BusinessSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BusinessSetupModal: React.FC<BusinessSetupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!businessName.trim()) {
        alert("Nama bisnis wajib diisi!");
        return;
      }

      const initialCapital = currentBalance
        ? parseFloat(currentBalance.replace(/\./g, ""))
        : 0;

      const businessData = {
        business_name: businessName,
        category: category || undefined,
        location: location || undefined,
        current_balance: 0,
      };

      const createdBusiness = await createBusiness(businessData);

      localStorage.setItem("business_id", createdBusiness.id.toString());

      if (initialCapital > 0) {
        try {
          await createTransaction({
            type: "Income",
            category: "Modal",
            amount: initialCapital,
            description: "Modal awal",
          });
        } catch {}
      }

      alert("Bisnis berhasil didaftarkan! Selamat datang di NusaBiz.");
      onClose();
      navigate(listed.dashboard);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Gagal mendaftarkan bisnis. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRupiah = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleBalanceChange = (value: string) => {
    const formatted = formatRupiah(value);
    setCurrentBalance(formatted);
  };

  if (!isOpen) return null;

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return businessName.trim().length > 0;
      case 2:
        return true; // Category is optional
      case 3:
        return true; // Location is optional
      case 4:
        return true; // Balance is optional
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#1a2332] to-[#0f1621] w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="text-blue-500" size={28} />
              Setup Bisnis Anda
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Lengkapi informasi bisnis Anda
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`text-xs font-medium ${
                  step === currentStep
                    ? "text-blue-500"
                    : step < currentStep
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                Step {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Business Name */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <p className="text-blue-400 text-sm flex items-center gap-2">
                  <Building2 size={18} />
                  Langkah 1: Nama Bisnis Anda
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nama Bisnis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Contoh: Toko Berkah Jaya"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">
                  Nama bisnis yang akan ditampilkan di sistem
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Category */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
                <p className="text-purple-400 text-sm flex items-center gap-2">
                  <Tag size={18} />
                  Langkah 2: Kategori Bisnis
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kategori <span className="text-gray-500">(Opsional)</span>
                </label>
                <input
                  type="text"
                  list="business-categories"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Pilih atau ketik kategori"
                  autoFocus
                />
                <datalist id="business-categories">
                  <option value="Retail" />
                  <option value="F&B" />
                  <option value="Jasa" />
                  <option value="Manufaktur" />
                  <option value="Teknologi" />
                  <option value="Konsultan" />
                  <option value="Lainnya" />
                </datalist>
                <p className="text-xs text-gray-500 mt-2">
                  Jenis bisnis atau industri Anda
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-400 text-sm flex items-center gap-2">
                  <MapPin size={18} />
                  Langkah 3: Lokasi Bisnis
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lokasi <span className="text-gray-500">(Opsional)</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="Contoh: Jakarta, Indonesia"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">
                  Lokasi atau alamat bisnis Anda
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Current Balance */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <p className="text-yellow-400 text-sm flex items-center gap-2">
                  <Wallet size={18} />
                  Langkah 4: Modal Awal
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Modal Awal <span className="text-gray-500">(Opsional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={currentBalance}
                    onChange={(e) => handleBalanceChange(e.target.value)}
                    className="w-full bg-[#2C3E50] text-white rounded-lg pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                    placeholder="0"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Saldo awal bisnis Anda (bisa diisi 0 jika belum ada modal)
                </p>
              </div>

              {/* Summary */}
              <div className="bg-gray-800/50 rounded-lg p-4 mt-6 border border-gray-700">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Ringkasan:
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nama Bisnis:</span>
                    <span className="text-white font-medium">
                      {businessName || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Kategori:</span>
                    <span className="text-white">{category || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lokasi:</span>
                    <span className="text-white">{location || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Modal Awal:</span>
                    <span className="text-white">
                      Rp {currentBalance || "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-700/50 flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="flex-1 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Kembali
            </button>
          )}

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex-1 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isStepValid()
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              Lanjut
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isStepValid()}
              className={`flex-1 font-medium py-3 rounded-lg transition-colors ${
                isSubmitting || !isStepValid()
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              }`}
            >
              {isSubmitting ? "Menyimpan..." : "Selesai & Mulai"}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BusinessSetupModal;
