import React, { useState, useEffect } from "react";
import APICall from "./callapi";

export const ProfileFunction = () => {
  const [initialUser, setInitialUser] = useState<any>(null);
  const [initialBusiness, setInitialBusiness] = useState<any>(null);

  const [userFormData, setUserFormData] = useState<any>({
    fullName: "",
    whatsappNumber: "",
    email: "",
    profileImage: "",
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [businessFormData, setBusinessFormData] = useState<any>({
    businessName: "",
    category: "",
    location: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userData = await APICall("/users/me");

        const businessData = await APICall("/businesses");
        const primaryBusiness = businessData?.[0] || {};

        const mappedUser = {
          fullName: userData.full_name || "",
          whatsappNumber: userData.whatsapp_number || "",
          email: userData.email || "",
          profileImage:
            userData.image ||
            "https://placehold.co/400x400/cccccc/333333?text=N/A",
        };

        const mappedBusiness = {
          businessName: primaryBusiness.business_name || "",
          category: primaryBusiness.category || "",
          location: primaryBusiness.location || "",
          businessId: primaryBusiness.id,
        };

        setInitialUser(mappedUser);
        setUserFormData(mappedUser);
        setInitialBusiness(mappedBusiness);
        setBusinessFormData(mappedBusiness);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!initialUser || !initialBusiness) return;

    const isUserDataChanged =
      userFormData.fullName !== initialUser.fullName ||
      userFormData.whatsappNumber !== initialUser.whatsappNumber;

    const isBusinessDataChanged =
      businessFormData.businessName !== initialBusiness.businessName ||
      businessFormData.category !== initialBusiness.category ||
      businessFormData.location !== initialBusiness.location;

    const isPasswordChanged = !!(oldPassword && newPassword);

    setIsDirty(isUserDataChanged || isBusinessDataChanged || isPasswordChanged);
  }, [
    userFormData,
    businessFormData,
    oldPassword,
    newPassword,
    initialUser,
    initialBusiness,
    selectedImageFile,
  ]);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFormData({ ...userFormData, [e.target.id]: e.target.value });
    setError(null);
    setSuccessMessage("");
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessFormData({ ...businessFormData, [e.target.id]: e.target.value });
    setError(null);
    setSuccessMessage("");
  };

  const toggleModal = (open: boolean) => {
    setIsModalOpen(open);
    setError(null);
    setSuccessMessage("");
    if (!open) {
      setSelectedImageFile(null);
      setUserFormData((prev: any) => ({
        ...prev,
        profileImage:
          initialUser?.profileImage ||
          "https://placehold.co/400x400/cccccc/333333?text=N/A",
      }));
    }
  };

  const handleImageFileChangeFromModal = (file: File | null) => {
    if (file) {
      setSelectedImageFile(file);
      setUserFormData((prev: any) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    } else {
      setSelectedImageFile(null);
      setUserFormData((prev: any) => ({
        ...prev,
        profileImage:
          initialUser?.profileImage ||
          "https://placehold.co/400x400/cccccc/333333?text=N/A",
      }));
    }
  };

  const handleDeleteImage = () => {
    setSelectedImageFile(null);
    setUserFormData((prev: any) => ({
      ...prev,
      profileImage:
        initialUser?.profileImage ||
        "https://placehold.co/400x400/cccccc/333333?text=N/A",
    }));
    toggleModal(false);
  };

  const handleUpdateProfileImage = async (): Promise<any> => {
    if (!selectedImageFile) return Promise.resolve(null);

    const formData = new FormData();
    formData.append("avatar", selectedImageFile);

    const isUserDataChanged =
      userFormData.fullName !== initialUser.fullName ||
      userFormData.whatsappNumber !== initialUser.whatsappNumber;
    if (isUserDataChanged) {
      formData.append("full_name", userFormData.fullName);
      formData.append("whatsapp_number", userFormData.whatsappNumber);
    }

    try {
      const data = await APICall("/users/me", "PUT", formData, true);

      const newImage = data.image || userFormData.profileImage;

      const updatedUser = {
        ...userFormData,
        profileImage: newImage,
        fullName: data.full_name || userFormData.fullName,
        whatsappNumber: data.whatsapp_number || userFormData.whatsappNumber,
      };

      setUserFormData(updatedUser);
      setInitialUser(updatedUser);
      setSelectedImageFile(null);

      return Promise.resolve(updatedUser);
    } catch (err: any) {
      throw new Error(`Gagal mengunggah foto: ${err.message}`);
    }
  };

  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty || isLoading) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    const updatePromises = [];
    let finalUserUpdate = initialUser;
    let finalBusinessUpdate = initialBusiness;

    if (selectedImageFile) {
      updatePromises.push(
        handleUpdateProfileImage().then((updatedUser) => {
          if (updatedUser) finalUserUpdate = updatedUser;
        })
      );
    }

    const userPayload = {
      full_name: userFormData.fullName,
      whatsapp_number: userFormData.whatsappNumber,
    };
    const isUserDataChanged =
      userFormData.fullName !== initialUser.fullName ||
      userFormData.whatsappNumber !== initialUser.whatsappNumber;

    if (isUserDataChanged && !selectedImageFile) {
      updatePromises.push(
        APICall("/users/me", "PUT", userPayload).then(() => {
          finalUserUpdate = {
            ...userFormData,
            profileImage: finalUserUpdate.profileImage,
          };
        })
      );
    } else if (isUserDataChanged && selectedImageFile) {
    }

    const businessPayload = {
      business_name: businessFormData.businessName,
      category: businessFormData.category,
      location: businessFormData.location,
    };
    const isBusinessDataChanged =
      businessFormData.businessName !== initialBusiness.businessName ||
      businessFormData.category !== initialBusiness.category ||
      businessFormData.location !== initialBusiness.location;

    if (isBusinessDataChanged && initialBusiness.businessId) {
      updatePromises.push(
        APICall(
          `/businesses/${initialBusiness.businessId}`,
          "PUT",
          businessPayload
        ).then(() => {
          finalBusinessUpdate = businessFormData;
        })
      );
    }

    const isPasswordChanged = oldPassword && newPassword;
    if (isPasswordChanged) {
      if (newPassword.length < 8) {
        setError("Password baru minimal 8 karakter.");
        setIsLoading(false);
        return;
      }
      updatePromises.push(
        APICall("/users/me/password", "PUT", {
          currentPassword: oldPassword,
          newPassword: newPassword,
        }).then(() => {})
      );
    }

    try {
      if (!isDirty && updatePromises.length === 0) {
        throw new Error("Tidak ada perubahan yang perlu disimpan.");
      }

      await Promise.all(updatePromises);

      setInitialUser(finalUserUpdate);
      setInitialBusiness(finalBusinessUpdate);
      setOldPassword("");
      setNewPassword("");
      setSuccessMessage("Semua perubahan berhasil disimpan!");
    } catch (err: any) {
      setError(err.message || "Terjadi kegagalan saat menyimpan.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    handleImageFileChange: handleImageFileChangeFromModal,
    selectedImageFile,
    handleDeleteImage,
    handleUpdateProfileImage,
    toggleOldPasswordVisibility,
    toggleNewPasswordVisibility,
    showOldPassword,
    showNewPassword,
  };
};
