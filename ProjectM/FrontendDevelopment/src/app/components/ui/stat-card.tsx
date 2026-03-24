import { Card } from "./card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ icon: Icon, label, value, trend, trendUp }: StatCardProps) {
  return (
    <Card glass>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
}
