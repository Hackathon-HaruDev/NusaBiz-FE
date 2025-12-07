import { Loader2, Save, Trash2 } from "lucide-react";
import { ProfileFunction } from "../functions/profile_function";
import PasswordObscure from "../components/auth/obscure";
import { useRef } from "react";
import UploadAvatarModal from "../components/auth/uploadmodal";

const Profile: React.FC = () => {
    const {
        userFormData,
        businessFormData,
        oldPassword,
        newPassword,
        isDirty,
        isLoading,
        error,
        successMessage,
        handleUserChange,
        handleBusinessChange,
        setOldPassword,
        setNewPassword,
        handleSaveChanges,
        isModalOpen,
        toggleModal,
        handleImageFileChange,
        selectedImageFile,
        handleDeleteImage,
        handleUpdateProfileImage,
        showOldPassword,
        showNewPassword,
        toggleOldPasswordVisibility,
        toggleNewPasswordVisibility
    } = ProfileFunction();
    const inputClasses = "border border-gray-300 w-full bg-gray-100 p-3 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150";

    return(
        <>
            <form className="m-[3%]" onSubmit={handleSaveChanges}>
                <h1 className="text-3xl font-bold">Pengaturan Profil</h1>

                {(error || successMessage) && (
                    <div className={`mt-5 p-3 rounded-md ${error ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
                        {error || successMessage}
                    </div>
                )}

                <div className="border rounded-md flex flex-col p-3 mt-5 gap-5">
                    <h1 className="text-2xl font-bold">Informasi Pengguna</h1>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col items-center mb-3 px-8 gap-3">
                            <div className="w-40 h-40 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-lg mb-2">
                                <img 
                                    src={userFormData.profileImage} 
                                    alt="Profile" 
                                    className='rounded-full w-full h-full object-cover' 
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/cccccc/333333?text=N/A'; }}
                                />
                            </div>
                        <button 
                                    type="button"
                                    onClick={() => toggleModal(true)} 
                                    className="bg-(--primary) text-white font-semibold p-2 rounded-lg shadow-md hover:bg-[#3D4C66] transition duration-150 w-full"
                                    disabled={isLoading}
                                >
                                    Ubah Foto
                                </button>

                                <button 
                                    type="button"
                                    onClick={handleDeleteImage}
                                    className="bg-red-500 text-white font-semibold p-2 rounded-lg shadow-md hover:bg-red-600 transition duration-150 w-full flex items-center justify-center gap-2"
                                    disabled={isLoading}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Reset Foto
                                </button>
                        </div>
                        <div className="flex flex-col gap-4 w-full px-3">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                <input 
                                    id="fullName"
                                    type="text" 
                                    value={userFormData.fullName}
                                    onChange={handleUserChange}
                                    className={inputClasses}
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                                <input 
                                    id="whatsappNumber"
                                    type="text" 
                                    value={userFormData.whatsappNumber}
                                    onChange={handleUserChange}
                                    className={inputClasses}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border rounded-md flex flex-col p-3 mt-5 gap-5">
                    <h1 className="text-2xl font-bold">Informasi Pengguna</h1>
                    <div className="flex flex-col gap-4 w-full px-3">
                        <div>
                            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Nama Bisnis</label>
                            <input 
                                id="businessName"
                                type="text"
                                value={businessFormData.businessName}
                                onChange={handleBusinessChange}
                                className={inputClasses}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori Bisnis</label>
                            <input 
                                id="category"
                                type="text"
                                value={businessFormData.category}
                                onChange={handleBusinessChange}
                                className={inputClasses}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Lokasi Bisnis</label>
                            <input 
                                id="location"
                                type="text"
                                value={businessFormData.location}
                                onChange={handleBusinessChange}
                                className={inputClasses}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
                <div className="border rounded-md flex flex-col p-3 mt-5 gap-5">
                    <h1 className="text-2xl font-bold">Keamanan</h1>
                    <div className="flex flex-col gap-4 w-full px-3">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Login)</label>
                            <input 
                                id="email"
                                type="email" 
                                value={userFormData.email}
                                className={`${inputClasses} bg-gray-200 cursor-not-allowed`}
                            />
                        </div>
                        <div>
                            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Lama</label>
                            <div className="relative">
                                <input 
                                    id="oldPassword"
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className={`${inputClasses} pr-10`}
                                    placeholder="Diperlukan untuk menyimpan password baru"
                                    disabled={isLoading}
                                />
                                <PasswordObscure 
                                    isVisible={showOldPassword} 
                                    toggleFunction={toggleOldPasswordVisibility} 
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Baru</label>
                            <div className="relative">
                                <input 
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={`${inputClasses} pr-10`}
                                    placeholder="Masukkan kata sandi baru"
                                    disabled={isLoading}
                                />
                                <PasswordObscure 
                                    isVisible={showNewPassword} 
                                    toggleFunction={toggleNewPasswordVisibility} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {isDirty && (
                    <button 
                        type="submit"
                        className="fixed bottom-8 right-8 bg-(--primary) text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#3D4C66] transition duration-300 flex items-center gap-2 disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Simpan Perubahan
                            </>
                        )}
                    </button>
                )}
            </form>
            <UploadAvatarModal
                isOpen={isModalOpen}
                onClose={() => toggleModal(false)}
                currentImageUrl={userFormData.profileImage}
                onImageSelect={handleImageFileChange}
                onImageUpload={handleUpdateProfileImage}
                isLoading={isLoading}
                error={selectedImageFile && error ? error : null} 
            />
        </>
    )
}

export default Profile;