interface props {
  title: "PEMASUKAN" | "PENGELUARAN" | "SALDO";
  amount: string;
  color: string;
}

const Card: React.FC<props> = ({ title, amount, color }) => {
  const prefix =
    title === "PEMASUKAN" ? "+ " : title === "PENGELUARAN" ? "- " : "";

  return (
    <div className="card bg-white shadow-lg rounded-lg border border-gray-100">
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-xs sm:text-sm font-semibold text-gray-700">
          {title}
        </h2>
        <p className={`text-2xl sm:text-3xl font-bold my-2 ${color}`}>
          {prefix}Rp {amount}
        </p>
      </div>
    </div>
  );
};
export default Card;
