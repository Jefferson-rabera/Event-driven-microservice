import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database, MessageSquare } from "lucide-react";

interface Event {
  id: string;
  type: string;
  service: string;
  timestamp: string;
  status: 'created' | 'updated' | 'failed';
  data: any;
}

interface EventFlowProps {
  events: Event[];
}

const eventColors = {
  created: 'event-created',
  updated: 'event-updated', 
  failed: 'event-failed',
} as const;

export const EventFlow = ({ events }: EventFlowProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Event Sourcing Stream</h2>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event, index) => (
          <div key={event.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: `hsl(var(--${eventColors[event.status]}))` }}
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{event.type}</span>
                <span className="text-xs text-muted-foreground">{event.timestamp}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-3 w-3" />
                <span>{event.service}</span>
                <Badge variant="outline" className="text-xs">
                  {event.status}
                </Badge>
              </div>
            </div>
            
            {index < events.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};