import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    default: 'h-12 w-12',
    lg: 'h-24 w-24',
  };

  return (
    <div className="flex items-center justify-center py-8" role="status" aria-label="Loading...">
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
    </div>
  );
}
