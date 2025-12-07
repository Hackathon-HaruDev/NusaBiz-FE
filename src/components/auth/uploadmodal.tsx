import React, { useState } from 'react';
import { X, UploadCloud, Trash2, Loader2, Save } from 'lucide-react';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentImageUrl: string;
    onImageSelect: (file: File | null) => void;
    onImageUpload: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const UploadAvatarModal: React.FC<UploadModalProps> = ({
    isOpen,
    onClose,
    currentImageUrl,
    onImageSelect,
    onImageUpload,
    isLoading,
    error,
}) => {
    const [localFile, setLocalFile] = useState<File | null>(null);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setLocalFile(file);
            onImageSelect(file);
        }
    };
    
    const handleDelete = () => {
        setLocalFile(null);
        onImageSelect(null);
        onClose();
    };

    const handleSave = async () => {
        if (!localFile) return;
        try {
            await onImageUpload();
            setLocalFile(null);
        } catch (e) {
            
        }
    };

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                <div className="flex justify-between items-center pb-3 mb-4">
                    <h2 className="text-xl font-bold">Ubah Foto Profil</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="w-48 h-48 rounded-full bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
                        <img 
                            src={localFile ? URL.createObjectURL(localFile) : currentImageUrl} 
                            alt="Pratinjau Avatar" 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/cccccc/333333?text=N/A'; }}
                        />
                    </div>
                    
                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}

                    <label className="w-full cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-150 flex items-center justify-center gap-2 disabled:bg-gray-400" htmlFor="file-upload">
                        <UploadCloud className="w-5 h-5" />
                        {localFile ? 'Ganti File' : 'Pilih File Baru'}
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={isLoading}
                        />
                    </label>

                    {localFile && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-150 flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            <Trash2 className="w-5 h-5" />
                            Hapus File yang Dipilih
                        </button>
                    )}
                </div>

                <div className="mt-6 pt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-(--primary) text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-[#3D4C66] transition duration-150 flex items-center gap-2 disabled:bg-gray-400"
                        disabled={isLoading || !localFile}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {isLoading ? 'Mengunggah...' : 'Simpan Foto'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadAvatarModal;