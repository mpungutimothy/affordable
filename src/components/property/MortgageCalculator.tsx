import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Property } from '../../lib/supabase';

const MortgageCalculator = ({ property }: { property: Property }) => {
  const [totalAmount, setTotalAmount] = useState(property.price);
  const [downPayment, setDownPayment] = useState(property.price * 0.2);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculatePayment = () => {
    const principal = totalAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      const payment =
        (principal *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-2xl p-8">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-6 h-6 text-[#FFD700]" />
        <h2 className="text-2xl font-serif text-[#FFD700]">
          Mortgage Calculator
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Total Amount (UGX)
          </label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Down Payment (UGX)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.1"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Loan Term (Years)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
            />
          </div>
        </div>

        <button
          onClick={calculatePayment}
          className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#50C878] text-[#0a0a0a] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all"
        >
          Calculate
        </button>

        {monthlyPayment > 0 && (
          <div className="bg-[#0a0a0a] border border-[#FFD700]/30 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-1">
              Monthly Payment (Principal & Interest)
            </div>
            <div className="text-3xl font-bold text-[#FFD700]">
              UGX {monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              This is an estimate. Contact us for accurate mortgage terms.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
