import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/5 flex items-center justify-center backdrop-blur-sm">
      <Loader2 className="h-8 w-8 animate-spin text-red-600" />
    </div>
  );
}
