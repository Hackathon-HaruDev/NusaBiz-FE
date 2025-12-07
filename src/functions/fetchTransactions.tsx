export const fetchTransactions = async (businessId: number) => {
  const token = localStorage.getItem("userToken");

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/businesses/${businessId}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(result.error?.message || "Failed fetching transactions");
    }

    // FIX DI SINI ❗❗❗
    return result.data.transactions || [];

  } catch (err) {
    console.error("Fetch transaksi error:", err);
    return [];
  }
};
