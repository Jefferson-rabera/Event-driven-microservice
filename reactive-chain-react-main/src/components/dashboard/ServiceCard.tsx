import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle, XCircle, Clock } from "lucide-react";

interface ServiceCardProps {
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'loading';
  serviceType: 'order' | 'payment' | 'inventory' | 'notification';
  responseTime: number;
  requestCount: number;
  uptime: string;
}

const statusIcons = {
  healthy: CheckCircle,
  warning: Clock,
  error: XCircle,
  loading: Activity,
};

const statusColors = {
  healthy: 'success',
  warning: 'warning', 
  error: 'destructive',
  loading: 'muted',
} as const;

const serviceColors = {
  order: 'service-order',
  payment: 'service-payment', 
  inventory: 'service-inventory',
  notification: 'service-notification',
} as const;

export const ServiceCard = ({ 
  name, 
  status, 
  serviceType, 
  responseTime, 
  requestCount, 
  uptime 
}: ServiceCardProps) => {
  const StatusIcon = statusIcons[status];
  
  return (
    <Card className="p-6 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: `hsl(var(--${serviceColors[serviceType]}))` }}
          />
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <StatusIcon className={`h-5 w-5 text-${statusColors[status]}`} />
          <Badge variant={status === 'healthy' ? 'default' : 'destructive'}>
            {status}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Response Time</div>
          <div className="font-medium">{responseTime}ms</div>
        </div>
        <div>
          <div className="text-muted-foreground">Requests</div>
          <div className="font-medium">{requestCount.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Uptime</div>
          <div className="font-medium">{uptime}</div>
        </div>
      </div>
    </Card>
  );
};