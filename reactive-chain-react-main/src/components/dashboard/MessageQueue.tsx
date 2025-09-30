import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, Rabbit, Coffee } from "lucide-react";

interface QueueStats {
  name: string;
  type: 'rabbitmq' | 'kafka';
  messagesInQueue: number;
  messagesPerSecond: number;
  consumers: number;
  utilization: number;
}

interface MessageQueueProps {
  queues: QueueStats[];
}

const queueIcons = {
  rabbitmq: Rabbit,
  kafka: Coffee,
};

export const MessageQueue = ({ queues }: MessageQueueProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Message Brokers</h2>
      </div>
      
      <div className="space-y-4">
        {queues.map((queue) => {
          const QueueIcon = queueIcons[queue.type];
          const utilizationColor = queue.utilization > 80 ? 'destructive' : 
                                 queue.utilization > 60 ? 'warning' : 'success';
          
          return (
            <div key={queue.name} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <QueueIcon className="h-4 w-4 text-accent" />
                  <span className="font-medium">{queue.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {queue.type.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Messages in Queue</div>
                  <div className="font-semibold">{queue.messagesInQueue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Messages per sec</div>
                  <div className="font-semibold">{queue.messagesPerSecond}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Consumers</div>
                  <div className="font-semibold">{queue.consumers}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Utilization</div>
                  <div className="font-semibold">{queue.utilization}%</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Queue Utilization</span>
                  <span>{queue.utilization}%</span>
                </div>
                <Progress 
                  value={queue.utilization} 
                  className={`h-2 bg-muted-foreground/20`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};