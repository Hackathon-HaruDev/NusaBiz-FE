export const fetchTransactions = async (businessId: number) => {
  let token: string | null = null;
  try {
    token = localStorage.getItem("userToken");
  } catch (e) {
    return [];
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/businesses/${businessId}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(result.error?.message || "Failed fetching transactions");
    }

    return result.data.transactions || [];
  } catch (err) {
    return [];
  }
};
