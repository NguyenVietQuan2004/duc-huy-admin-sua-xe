// components/StatCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { MailIcon } from "lucide-react"; // hoặc dùng icon phù hợp
import { cn } from "@/lib/utils";

type StatCardProps = {
  icon?: React.ReactNode;
  title: string;
  value: number | string;
  className?: string;
};

export function StatCard({ icon, title, value, className }: StatCardProps) {
  return (
    <Card className={cn("p-4 flex items-center gap-4", className)}>
      <div className="bg-blue-100 text-blue-600 p-2 rounded-full">{icon || <MailIcon className="w-6 h-6" />}</div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </Card>
  );
}
