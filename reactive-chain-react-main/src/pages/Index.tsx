import { useState, useEffect } from "react";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { EventFlow } from "@/components/dashboard/EventFlow";
import { MessageQueue } from "@/components/dashboard/MessageQueue";
import { TransactionMonitor } from "@/components/dashboard/TransactionMonitor";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Server, 
  Database, 
  MessageSquare,
  Play,
  Pause,
  RefreshCw,
  Terminal
} from "lucide-react";

const Index = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for demonstration
  const services = [
    {
      name: "Order Service",
      status: "healthy" as const,
      serviceType: "order" as const,
      responseTime: 45,
      requestCount: 1250,
      uptime: "99.9%"
    },
    {
      name: "Payment Service", 
      status: "healthy" as const,
      serviceType: "payment" as const,
      responseTime: 32,
      requestCount: 890,
      uptime: "99.8%"
    },
    {
      name: "Inventory Service",
      status: "warning" as const,
      serviceType: "inventory" as const,
      responseTime: 78,
      requestCount: 2100,
      uptime: "97.5%"
    },
    {
      name: "Notification Service",
      status: "healthy" as const,
      serviceType: "notification" as const,
      responseTime: 28,
      requestCount: 3400,
      uptime: "99.9%"
    }
  ];

  const events = [
    {
      id: "evt_001",
      type: "OrderCreated",
      service: "Order Service",
      timestamp: "14:32:15",
      status: "created" as const,
      data: { orderId: "ORD-001", amount: 150.00 }
    },
    {
      id: "evt_002", 
      type: "PaymentRequested",
      service: "Payment Service",
      timestamp: "14:32:16",
      status: "created" as const,
      data: { orderId: "ORD-001", amount: 150.00 }
    },
    {
      id: "evt_003",
      type: "InventoryReserved", 
      service: "Inventory Service",
      timestamp: "14:32:17",
      status: "updated" as const,
      data: { orderId: "ORD-001", items: 3 }
    },
    {
      id: "evt_004",
      type: "PaymentProcessed",
      service: "Payment Service", 
      timestamp: "14:32:18",
      status: "created" as const,
      data: { orderId: "ORD-001", status: "success" }
    },
    {
      id: "evt_005",
      type: "NotificationSent",
      service: "Notification Service",
      timestamp: "14:32:19", 
      status: "created" as const,
      data: { orderId: "ORD-001", type: "email" }
    }
  ];

  const queues = [
    {
      name: "order.commands",
      type: "rabbitmq" as const,
      messagesInQueue: 12,
      messagesPerSecond: 45,
      consumers: 3,
      utilization: 67
    },
    {
      name: "payment.events",
      type: "kafka" as const,
      messagesInQueue: 8,
      messagesPerSecond: 78,
      consumers: 5,
      utilization: 34
    },
    {
      name: "inventory.commands",
      type: "rabbitmq" as const,
      messagesInQueue: 23,
      messagesPerSecond: 92,
      consumers: 4,
      utilization: 89
    }
  ];

  const transactions = [
    {
      id: "txn_001",
      type: "Order Fulfillment",
      status: "success" as const,
      startedAt: "14:32:15",
      duration: 4500,
      steps: [
        { service: "Order Service", status: "completed" as const, timestamp: "14:32:15" },
        { service: "Payment Service", status: "completed" as const, timestamp: "14:32:16" },
        { service: "Inventory Service", status: "completed" as const, timestamp: "14:32:17" },
        { service: "Notification Service", status: "completed" as const, timestamp: "14:32:19" }
      ]
    },
    {
      id: "txn_002", 
      type: "Order Fulfillment",
      status: "pending" as const,
      startedAt: "14:35:22",
      steps: [
        { service: "Order Service", status: "completed" as const, timestamp: "14:35:22" },
        { service: "Payment Service", status: "pending" as const, timestamp: "14:35:23" },
        { service: "Inventory Service", status: "pending" as const, timestamp: "" },
        { service: "Notification Service", status: "pending" as const, timestamp: "" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setLastUpdated(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Server className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Event-Driven Microservices</h1>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              <Activity className="h-3 w-3 mr-1" />
              {services.filter(s => s.status === 'healthy').length}/{services.length} Services
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/setup'}
              >
                <Terminal className="h-4 w-4" />
                Setup Guide
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isRunning ? 'Pause' : 'Resume'}
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground mt-2">
          Real-time monitoring of distributed transactions with event sourcing, RabbitMQ, and Kafka
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {services.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <EventFlow events={events} />
        <MessageQueue queues={queues} />
      </div>

      {/* Transaction Monitor */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <TransactionMonitor transactions={transactions} />
      </div>

      {/* Quick Setup Guide */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Quick Setup Guide</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="p-3 bg-muted rounded-lg">
            <div className="font-medium mb-1">1. Install Dependencies</div>
            <div className="text-muted-foreground">Docker, Node.js, npm</div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="font-medium mb-1">2. Setup Brokers</div>
            <div className="text-muted-foreground">RabbitMQ, Kafka containers</div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="font-medium mb-1">3. Build Services</div>
            <div className="text-muted-foreground">4 Node.js microservices</div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="font-medium mb-1">4. Event Store</div>
            <div className="text-muted-foreground">MongoDB event sourcing</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
