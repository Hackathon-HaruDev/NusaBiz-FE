export const fetchUserAndBusiness = async () => {
  let token: string | null = null;
  try {
    token = localStorage.getItem("userToken");
  } catch (e) {
    throw new Error(
      "Tidak dapat mengakses storage. Pastikan cookie dan storage diizinkan."
    );
  }
  if (!token) throw new Error("User belum login.");

  try {
    const userRes = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await userRes.json();
    if (!userRes.ok || !userData.success) {
      throw new Error(userData.error?.message || "Gagal mengambil user");
    }

    const user = userData.data;

    const bizRes = await fetch(`${import.meta.env.VITE_BASE_URL}/businesses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const bizData = await bizRes.json();
    if (!bizRes.ok || !bizData.success) {
      throw new Error(bizData.error?.message || "Gagal mengambil business");
    }

    const businesses = bizData.data;

    return { user, businesses };
  } catch (err: any) {
    throw err;
  }
};
