import { useState, useMemo, useCallback } from "react";
import { 
  Calculator, 
  RefreshCw, 
  Copy, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Building2,
  Banknote,
  ArrowRightLeft,
  Layers,
  Check
} from "lucide-react";
import bmsLogo from "@/assets/bms-logo.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { InputField } from "@/components/calculator/InputField";
import { MetricCard } from "@/components/calculator/MetricCard";
import { BudgetChart } from "@/components/calculator/BudgetChart";
import { ValidationBadge } from "@/components/calculator/ValidationBadge";
import { StatusDropdown } from "@/components/calculator/StatusDropdown";
import { BreakdownTable } from "@/components/calculator/BreakdownTable";
import { ThemeToggle } from "@/components/calculator/ThemeToggle";

const defaultValues = {
  totalBudget: 100000,
  taxes: 18.33,
  overhead: 23.0,
  profit: 30.0,
  agencyFee: 10.0,
  exchangeRate: 5.50,
  cpmBid: 0.50,
  bidSync: 0.15,
};

type Status = "analysis" | "proposal" | "closed";

export default function Index() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("analysis");
  const [isBmsTheme, setIsBmsTheme] = useState(false);
  
  const [values, setValues] = useState(defaultValues);

  const updateValue = useCallback((key: keyof typeof values, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetValues = useCallback(() => {
    setValues(defaultValues);
    setStatus("analysis");
    toast({
      title: "Reset Complete",
      description: "All values have been reset to defaults.",
    });
  }, [toast]);

  // Calculations
  const calculations = useMemo(() => {
    const { totalBudget, taxes, overhead, profit, agencyFee, exchangeRate, cpmBid, bidSync } = values;
    
    // Deduction amounts
    const taxAmount = totalBudget * (taxes / 100);
    const overheadAmount = totalBudget * (overhead / 100);
    const profitAmount = totalBudget * (profit / 100);
    const agencyFeeAmount = totalBudget * (agencyFee / 100);
    
    // Available media budget
    const availableMediaBudget = totalBudget - taxAmount - overheadAmount - profitAmount - agencyFeeAmount;
    
    // Gross CPM in BRL
    const grossCpmBrl = (cpmBid * exchangeRate) + bidSync;
    
    // Total impressions
    const totalImpressions = availableMediaBudget > 0 && grossCpmBrl > 0 
      ? (availableMediaBudget / grossCpmBrl) * 1000 
      : 0;
    
    // Selling CPM
    const sellingCpm = totalImpressions > 0 
      ? (totalBudget / totalImpressions) * 1000 
      : 0;
    
    // Validation
    const totalPercentage = taxes + overhead + profit + agencyFee;
    const mediaPercentage = 100 - totalPercentage;
    const sumCheck = taxAmount + overheadAmount + profitAmount + agencyFeeAmount + availableMediaBudget;
    const isValid = Math.abs(sumCheck - totalBudget) < 0.01;

    return {
      taxAmount,
      overheadAmount,
      profitAmount,
      agencyFeeAmount,
      availableMediaBudget,
      grossCpmBrl,
      totalImpressions,
      sellingCpm,
      totalPercentage,
      mediaPercentage,
      isValid,
    };
  }, [values]);

  // Chart data
  const chartData = useMemo(() => [
    { name: "Media Investment", value: calculations.availableMediaBudget, color: "hsl(187, 85%, 53%)" },
    { name: "Taxes", value: calculations.taxAmount, color: "hsl(0, 72%, 51%)" },
    { name: "Overhead", value: calculations.overheadAmount, color: "hsl(38, 92%, 50%)" },
    { name: "Profit", value: calculations.profitAmount, color: "hsl(152, 69%, 45%)" },
    { name: "Agency Fee", value: calculations.agencyFeeAmount, color: "hsl(280, 65%, 60%)" },
  ], [calculations]);

  // Breakdown items
  const breakdownItems = useMemo(() => [
    { label: "Media Investment", percentage: calculations.mediaPercentage, value: calculations.availableMediaBudget, color: "hsl(187, 85%, 53%)" },
    { label: "Taxes", percentage: values.taxes, value: calculations.taxAmount, color: "hsl(0, 72%, 51%)" },
    { label: "Operational Overhead", percentage: values.overhead, value: calculations.overheadAmount, color: "hsl(38, 92%, 50%)" },
    { label: "Net Profit", percentage: values.profit, value: calculations.profitAmount, color: "hsl(152, 69%, 45%)" },
    { label: "Agency Fee / BV", percentage: values.agencyFee, value: calculations.agencyFeeAmount, color: "hsl(280, 65%, 60%)" },
  ], [calculations, values]);

  const copyProposal = useCallback(() => {
    const proposal = `
📊 *PROGRAMMATIC CAMPAIGN PROPOSAL*
━━━━━━━━━━━━━━━━━━━━━━

💰 *Investment Summary*
• Total Budget: R$ ${values.totalBudget.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
• Media Investment: R$ ${calculations.availableMediaBudget.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

📈 *Campaign Deliverables*
• Estimated Impressions: ${calculations.totalImpressions.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
• Selling CPM: R$ ${calculations.sellingCpm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

💵 *Cost Breakdown*
• Taxes (${values.taxes}%): R$ ${calculations.taxAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
• Overhead (${values.overhead}%): R$ ${calculations.overheadAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
• Profit (${values.profit}%): R$ ${calculations.profitAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
• Agency Fee (${values.agencyFee}%): R$ ${calculations.agencyFeeAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

⚙️ *Technical Parameters*
• Exchange Rate: R$ ${values.exchangeRate.toFixed(2)}/USD
• CPM Bid: US$ ${values.cpmBid.toFixed(2)}
• Tech Fee: R$ ${values.bidSync.toFixed(2)}
• Gross CPM: R$ ${calculations.grossCpmBrl.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

━━━━━━━━━━━━━━━━━━━━━━
_Generated by Programmatic Sales Estimator_
    `.trim();

    navigator.clipboard.writeText(proposal);
    setCopied(true);
    toast({
      title: "Copied to Clipboard",
      description: "Proposal summary ready to paste!",
    });
    setTimeout(() => setCopied(false), 2000);
  }, [values, calculations, toast]);

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${isBmsTheme ? 'bms-theme' : ''}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b border-border backdrop-blur-xl ${isBmsTheme ? 'bg-[#0A1F44]' : 'bg-background/80'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={bmsLogo} alt="BMS Logo" className="w-10 h-10 object-contain" />
              <div>
                <h1 className={`text-xl font-bold ${isBmsTheme ? 'text-white' : 'text-foreground'}`}>
                  Programmatic Sales Estimator
                </h1>
                <p className={`text-xs ${isBmsTheme ? 'text-white/70' : 'text-muted-foreground'}`}>
                  Media Investment & Margin Calculator
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle isBmsTheme={isBmsTheme} onToggle={setIsBmsTheme} />
              <div className="w-px h-6 bg-border" />
              <StatusDropdown value={status} onChange={setStatus} />
              <ValidationBadge 
                isValid={calculations.isValid} 
                message={calculations.isValid ? "Math Check OK" : "Check Values"}
                breakdown={[
                  { label: "Media Investment", percentage: calculations.mediaPercentage },
                  { label: "Taxes", percentage: values.taxes },
                  { label: "Overhead", percentage: values.overhead },
                  { label: "Profit", percentage: values.profit },
                  { label: "Agency Fee", percentage: values.agencyFee },
                ]}
                total={calculations.mediaPercentage + values.taxes + values.overhead + values.profit + values.agencyFee}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetValues}
                className="gap-2 border-border hover:bg-muted hover:text-foreground"
              >
                <RefreshCw className="w-4 h-4" />
                New Simulation
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Inputs */}
          <div className="lg:col-span-4 space-y-6">
            {/* Budget Input */}
            <Card className="p-6 bg-gradient-card border-border shadow-card animate-slide-up">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-primary" />
                Campaign Budget
              </h2>
              <InputField
                label="Total Budget"
                value={values.totalBudget}
                onChange={(v) => updateValue("totalBudget", v)}
                min={1000}
                max={10000000}
                step={1000}
                prefix="R$"
                suffix=""
                type="number"
                icon={<DollarSign className="w-4 h-4" />}
              />
            </Card>

            {/* Percentage Inputs */}
            <Card className="p-6 bg-gradient-card border-border shadow-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                Deductions & Margins
              </h2>
              <div className="space-y-6">
                <InputField
                  label="Taxes"
                  value={values.taxes}
                  onChange={(v) => updateValue("taxes", v)}
                  min={0}
                  max={50}
                  step={0.01}
                  icon={<Building2 className="w-4 h-4" />}
                />
                <InputField
                  label="Operational Overhead"
                  value={values.overhead}
                  onChange={(v) => updateValue("overhead", v)}
                  min={0}
                  max={50}
                  step={0.01}
                  icon={<Layers className="w-4 h-4" />}
                />
                <InputField
                  label="Net Profit Target"
                  value={values.profit}
                  onChange={(v) => updateValue("profit", v)}
                  min={0}
                  max={60}
                  step={0.01}
                  icon={<TrendingUp className="w-4 h-4" />}
                />
                <InputField
                  label="Agency Fee / BV"
                  value={values.agencyFee}
                  onChange={(v) => updateValue("agencyFee", v)}
                  min={0}
                  max={30}
                  step={0.01}
                  icon={<Building2 className="w-4 h-4" />}
                />
              </div>
            </Card>

            {/* Media Buying Inputs */}
            <Card className="p-6 bg-gradient-card border-border shadow-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-primary" />
                Media Buying Parameters
              </h2>
              <div className="space-y-6">
                <InputField
                  label="Exchange Rate (BRL/USD)"
                  value={values.exchangeRate}
                  onChange={(v) => updateValue("exchangeRate", v)}
                  min={1}
                  max={10}
                  step={0.01}
                  prefix="R$"
                  suffix=""
                  type="number"
                />
                <InputField
                  label="CPM Bid Price (USD)"
                  value={values.cpmBid}
                  onChange={(v) => updateValue("cpmBid", v)}
                  min={0.01}
                  max={20}
                  step={0.01}
                  prefix="US$"
                  suffix=""
                  type="number"
                />
                <InputField
                  label="Bid Sync / Tech Fee (BRL)"
                  value={values.bidSync}
                  onChange={(v) => updateValue("bidSync", v)}
                  min={0}
                  max={5}
                  step={0.01}
                  prefix="R$"
                  suffix=""
                  type="number"
                />
              </div>
            </Card>
          </div>

          {/* Main Dashboard - Results */}
          <div className="lg:col-span-8 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard
                title="Total Impressions"
                value={calculations.totalImpressions.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                subtitle="Estimated campaign reach"
                icon={<TrendingUp className="w-5 h-5" />}
                variant="primary"
              />
              <MetricCard
                title="Selling CPM"
                value={`R$ ${calculations.sellingCpm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                subtitle="Final price per 1,000 impressions"
                icon={<DollarSign className="w-5 h-5" />}
                variant="accent"
              />
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="Media Budget"
                value={`R$ ${calculations.availableMediaBudget.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                subtitle={`${calculations.mediaPercentage.toFixed(1)}% of total`}
              />
              <MetricCard
                title="Gross CPM (BRL)"
                value={`R$ ${calculations.grossCpmBrl.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                subtitle="Buy price per 1,000 impressions"
              />
              <MetricCard
                title="CPM Markup"
                value={calculations.grossCpmBrl > 0 
                  ? `${((calculations.sellingCpm / calculations.grossCpmBrl - 1) * 100).toFixed(1)}%` 
                  : "0%"
                }
                subtitle="Sell vs. Buy price margin"
              />
            </div>

            {/* Chart and Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-card border-border shadow-card animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Budget Allocation
                </h3>
                <BudgetChart data={chartData} />
              </Card>

              <Card className="p-6 bg-gradient-card border-border shadow-card animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Detailed Breakdown
                </h3>
                <BreakdownTable items={breakdownItems} total={values.totalBudget} />
              </Card>
            </div>

            {/* Copy Button */}
            <Card className="p-6 bg-gradient-card border-border shadow-card animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Export Proposal
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Copy a formatted summary for WhatsApp or Email
                  </p>
                </div>
                <Button 
                  onClick={copyProposal}
                  className="gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow-primary"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Proposal Summary
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Programmatic Sales Estimator • Built for high-performance media teams
        </div>
      </footer>
    </div>
  );
}
