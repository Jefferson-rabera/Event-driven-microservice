import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  status: 'pending' | 'success' | 'failed' | 'compensating';
  steps: {
    service: string;
    status: 'completed' | 'pending' | 'failed';
    timestamp: string;
  }[];
  startedAt: string;
  duration?: number;
}

interface TransactionMonitorProps {
  transactions: Transaction[];
}

const statusIcons = {
  pending: Clock,
  success: CheckCircle,
  failed: XCircle,
  compensating: AlertTriangle,
};

const statusColors = {
  pending: 'warning',
  success: 'success',
  failed: 'destructive',
  compensating: 'warning',
} as const;

const stepStatusColors = {
  completed: 'success',
  pending: 'warning',
  failed: 'destructive',
} as const;

export const TransactionMonitor = ({ transactions }: TransactionMonitorProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Distributed Transactions</h2>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {transactions.map((transaction) => {
          const StatusIcon = statusIcons[transaction.status];
          
          return (
            <div key={transaction.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-4 w-4 text-${statusColors[transaction.status]}`} />
                  <span className="font-medium">{transaction.type}</span>
                  <span className="text-xs text-muted-foreground">#{transaction.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={transaction.status === 'success' ? 'default' : 'destructive'}>
                    {transaction.status}
                  </Badge>
                  {transaction.duration && (
                    <span className="text-xs text-muted-foreground">
                      {transaction.duration}ms
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                {transaction.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-background rounded">
                    <div 
                      className={`w-2 h-2 rounded-full bg-${stepStatusColors[step.status]}`}
                    />
                    <span className="text-sm font-medium flex-1">{step.service}</span>
                    <span className="text-xs text-muted-foreground">{step.timestamp}</span>
                    <Badge variant="outline" className="text-xs">
                      {step.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};