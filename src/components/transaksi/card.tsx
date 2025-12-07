/**
 * Transaction Summary Card Component
 * Displays transaction totals (Income, Expense, Balance)
 */

interface CardProps {
  title: "PEMASUKAN" | "PENGELUARAN" | "SALDO";
  amount: number;
  color: string;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  amount,
  color,
  loading = false,
}) => {
  const prefix =
    title === "PEMASUKAN" ? "+ " : title === "PENGELUARAN" ? "- " : "";

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg border border-gray-100">
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-xs sm:text-sm font-semibold text-gray-700">
          {title}
        </h2>
        {loading ? (
          <div className="h-9 sm:h-10 bg-gray-200 animate-pulse rounded my-2"></div>
        ) : (
          <p className={`text-2xl sm:text-3xl font-bold my-2 ${color}`}>
            {prefix}Rp {formatCurrency(amount)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
