import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function EmiCalculatorWidget() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const p = amount;
  const r = rate / 12 / 100;
  const n = tenure * 12;
  const emi = Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  return (
    <Card className="p-6 border-none shadow-xl rounded-3xl bg-white">
      <h3 className="font-semibold text-xl mb-6 text-primary tracking-tight">EMI Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Loan Amount (₹)</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="h-12 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Rate (%)</label>
            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="h-12 rounded-xl" />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Tenure (Yrs)</label>
            <Input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="h-12 rounded-xl" />
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Monthly EMI</div>
          <div className="text-3xl font-semibold text-primary">₹{emi.toLocaleString()}</div>
        </div>
      </div>
    </Card>
  );
}
