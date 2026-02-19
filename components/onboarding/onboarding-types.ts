export type RiskLevel = "conservative" | "moderate" | "aggressive";

export type AlertFrequency = "realtime" | "hourly" | "daily";

export type OnboardingData = {
  profile: {
    displayName: string;
    bio: string;
  };
  risk: RiskLevel | null;
  portfolio: string[];
  alerts: {
    priceAlerts: boolean;
    riskThreshold: boolean;
    ruleTriggers: boolean;
    newsSentiment: boolean;
    frequency: AlertFrequency;
  } | null;
};

export const DEFAULT_ONBOARDING_DATA: OnboardingData = {
  profile: { displayName: "", bio: "" },
  risk: null,
  portfolio: [],
  alerts: null,
};
