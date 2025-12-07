export const fetchUserAndBusiness = async () => {
const token = localStorage.getItem("userToken");
if (!token) throw new Error("User belum login.");

try {
    // --- FETCH USER ---
    const userRes = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    });

    const userData = await userRes.json();
    if (!userRes.ok || !userData.success) {
    throw new Error(userData.error?.message || "Gagal mengambil user");
    }

    const user = userData.data;

    // --- FETCH BUSINESS LIST ---
    const bizRes = await fetch(`${import.meta.env.VITE_BASE_URL}/businesses`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    });

    const bizData = await bizRes.json();
    if (!bizRes.ok || !bizData.success) {
    throw new Error(bizData.error?.message || "Gagal mengambil business");
    }

    const businesses = bizData.data; // array bisnis

    return { user, businesses };
} catch (err: any) {
    console.error("Fetch error:", err.message);
    throw err;
}
};
