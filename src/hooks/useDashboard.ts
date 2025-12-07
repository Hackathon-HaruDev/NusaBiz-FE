import { useEffect, useState } from "react";
import { fetchUserAndBusiness } from "../functions/fetchUserAndBusiness";
import { fetchTransactions } from "../functions/fetchTransactions";
import type { User } from "../types/user";
import type { Business } from "../types/business";
import type { Transaction } from "../types/transaction";

export const useDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);     

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const { user, businesses } = await fetchUserAndBusiness();
        setUser(user);
        setBusinesses(businesses);

        const active = businesses[0];
        if (active) {
          const trx = await fetchTransactions(active.id);
          setTransactions(trx);
        }

      } catch (err: any) {
        
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    user,
    businesses,
    activeBusiness: businesses[0],
    transactions,
    loading,      
  };
};
