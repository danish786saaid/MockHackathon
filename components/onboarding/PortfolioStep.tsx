"use client";

const brokers = [
  { id: "binance", name: "Binance", desc: "Crypto exchange" },
  { id: "coinbase", name: "Coinbase", desc: "Crypto exchange" },
  { id: "ibkr", name: "Interactive Brokers", desc: "Stocks & more" },
  { id: "kraken", name: "Kraken", desc: "Crypto exchange" },
];

type Props = {
  selected: string[];
  onChange: (selected: string[]) => void;
  onSkip: () => void;
};

export default function PortfolioStep({ selected, onChange, onSkip }: Props) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Connect your portfolio
        </h2>
        <p className="mt-1 text-sm text-[#78716c]">
          Link exchanges or brokers to see your holdings in one place. Mock
          only — no real connections.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {brokers.map((broker) => {
          const isSelected = selected.includes(broker.id);
          return (
            <button
              key={broker.id}
              type="button"
              onClick={() => toggle(broker.id)}
              className={`glass-card p-4 flex items-center justify-between text-left transition-all ${
                isSelected
                  ? "ring-2 ring-[#ea580c]/50 border-[#ea580c]/30"
                  : "hover:border-white/[0.12]"
              }`}
            >
              <div>
                <h3 className="font-medium text-white">{broker.name}</h3>
                <p className="text-xs text-[#78716c]">{broker.desc}</p>
              </div>
              <div
                className={`h-5 w-9 rounded-full transition-colors ${
                  isSelected ? "bg-[#ea580c]" : "bg-white/10"
                }`}
              >
                <div
                  className={`mt-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                    isSelected ? "translate-x-4 ml-0.5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="text-sm text-[#78716c] hover:text-[#a8a29e] transition-colors"
      >
        Skip for now
      </button>
    </div>
  );
}
