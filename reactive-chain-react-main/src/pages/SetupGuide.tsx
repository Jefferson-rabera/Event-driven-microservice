import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Terminal, 
  Download, 
  Play, 
  CheckCircle, 
  ExternalLink,
  Folder,
  Code2
} from "lucide-react";

const SetupGuide = () => {
  const steps = [
    {
      title: "Install Dependencies",
      description: "Set up your development environment with required tools",
      commands: [
        "# Install Node.js (v18 or later)",
        "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
        "nvm install 18",
        "nvm use 18",
        "",
        "# Install Docker and Docker Compose",
        "# Windows: Download Docker Desktop from docker.com",
        "# macOS: brew install docker docker-compose", 
        "# Linux: sudo apt install docker.io docker-compose"
      ]
    },
    {
      title: "Project Structure Setup",
      description: "Create the microservices project structure",
      commands: [
        "mkdir event-driven-microservices",
        "cd event-driven-microservices",
        "",
        "# Create service directories",
        "mkdir -p services/order-service",
        "mkdir -p services/payment-service", 
        "mkdir -p services/inventory-service",
        "mkdir -p services/notification-service",
        "mkdir -p infrastructure",
        "mkdir -p shared/events",
        "mkdir -p shared/utils"
      ]
    },
    {
      title: "Infrastructure Setup (Docker Compose)",
      description: "Set up RabbitMQ, Kafka, and MongoDB using Docker",
      commands: [
        "# Create docker-compose.yml in infrastructure folder",
        "cd infrastructure",
        "touch docker-compose.yml",
        "",
        "# The docker-compose.yml will include:",
        "# - RabbitMQ (port 5672, management 15672)",
        "# - Kafka + Zookeeper (port 9092)",
        "# - MongoDB (port 27017)",
        "# - Redis for caching (port 6379)"
      ]
    },
    {
      title: "Order Service Implementation",
      description: "Create the order management microservice",
      commands: [
        "cd services/order-service",
        "npm init -y",
        "npm install express amqplib mongodb uuid",
        "npm install -D nodemon @types/node typescript",
        "",
        "# Implement:",
        "# - Order creation endpoint",
        "# - Event publishing to RabbitMQ",
        "# - Event sourcing with MongoDB"
      ]
    },
    {
      title: "Payment Service Implementation", 
      description: "Build payment processing with distributed transactions",
      commands: [
        "cd services/payment-service",
        "npm init -y",
        "npm install express amqplib mongodb stripe-mock",
        "",
        "# Implement:",
        "# - Payment processing logic",
        "# - Saga pattern for distributed transactions",
        "# - Compensation actions for failed payments"
      ]
    },
    {
      title: "Inventory & Notification Services",
      description: "Complete the microservices architecture",
      commands: [
        "# Inventory Service - Stock management",
        "cd services/inventory-service",
        "npm init -y",
        "npm install express amqplib mongodb",
        "",
        "# Notification Service - Email/SMS alerts", 
        "cd services/notification-service",
        "npm init -y", 
        "npm install express amqplib nodemailer"
      ]
    },
    {
      title: "Event Sourcing Implementation",
      description: "Set up event store and event replay capabilities",
      commands: [
        "# Create shared event definitions",
        "cd shared/events",
        "",
        "# Event types:",
        "# - OrderCreated, OrderUpdated, OrderCancelled",
        "# - PaymentRequested, PaymentProcessed, PaymentFailed",
        "# - InventoryReserved, InventoryReleased",
        "# - NotificationSent"
      ]
    },
    {
      title: "Message Brokers Configuration",
      description: "Configure RabbitMQ exchanges and Kafka topics",
      commands: [
        "# RabbitMQ Configuration:",
        "# - Command queues for each service",
        "# - Dead letter queues for failed messages",
        "# - Exchange routing for commands",
        "",
        "# Kafka Configuration:",
        "# - Event topics for event sourcing",
        "# - Consumer groups for each service",
        "# - Partition strategy for scalability"
      ]
    },
    {
      title: "Run the System",
      description: "Start all services and test the distributed system",
      commands: [
        "# Start infrastructure",
        "cd infrastructure",
        "docker-compose up -d",
        "",
        "# Start each microservice",
        "cd ../services/order-service && npm run dev",
        "cd ../services/payment-service && npm run dev", 
        "cd ../services/inventory-service && npm run dev",
        "cd ../services/notification-service && npm run dev"
      ]
    }
  ];

  const dockerCompose = `version: '3.8'
services:
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: password

  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:latest
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"`;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Complete Setup Guide</h1>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              ← Back to Dashboard
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">
            Step-by-step instructions to build your event-driven microservices system from scratch
          </p>
        </div>

        {/* Architecture Overview */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">System Architecture</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="p-3 bg-service-order/10 border border-service-order/20 rounded-lg text-center">
              <div className="w-3 h-3 bg-service-order rounded-full mx-auto mb-2" />
              <div className="text-sm font-medium">Order Service</div>
            </div>
            <div className="p-3 bg-service-payment/10 border border-service-payment/20 rounded-lg text-center">
              <div className="w-3 h-3 bg-service-payment rounded-full mx-auto mb-2" />
              <div className="text-sm font-medium">Payment Service</div>
            </div>
            <div className="p-3 bg-service-inventory/10 border border-service-inventory/20 rounded-lg text-center">
              <div className="w-3 h-3 bg-service-inventory rounded-full mx-auto mb-2" />
              <div className="text-sm font-medium">Inventory Service</div>
            </div>
            <div className="p-3 bg-service-notification/10 border border-service-notification/20 rounded-lg text-center">
              <div className="w-3 h-3 bg-service-notification rounded-full mx-auto mb-2" />
              <div className="text-sm font-medium">Notification Service</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Event Sourcing</Badge>
            <Badge variant="outline">CQRS Pattern</Badge>
            <Badge variant="outline">Saga Pattern</Badge>
            <Badge variant="outline">Message Brokers</Badge>
          </div>
        </Card>

        {/* Setup Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="h-4 w-4" />
                      <span className="text-sm font-medium">Commands</span>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code>{step.commands.join('\n')}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Docker Compose File */}
        <Card className="p-6 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Docker Compose Configuration</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Save this as <code className="bg-muted px-2 py-1 rounded">infrastructure/docker-compose.yml</code>
          </p>
          <div className="bg-muted rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{dockerCompose}</code>
            </pre>
          </div>
        </Card>

        {/* Key Concepts */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Key Concepts Implemented</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-success">Event Sourcing</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Events as source of truth</li>
                <li>• Event replay capabilities</li>
                <li>• Immutable event store</li>
                <li>• Temporal querying</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-warning">Distributed Transactions</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Saga orchestration pattern</li>
                <li>• Compensation actions</li>
                <li>• Two-phase commit alternative</li>
                <li>• Eventual consistency</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Message Brokers</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• RabbitMQ for commands</li>
                <li>• Kafka for event streaming</li>
                <li>• Dead letter queues</li>
                <li>• Message ordering</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-accent">Microservices</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Service independence</li>
                <li>• Database per service</li>
                <li>• API gateway pattern</li>
                <li>• Circuit breaker pattern</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Implement monitoring and observability</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Add API documentation with Swagger</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Implement distributed tracing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Add unit and integration tests</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SetupGuide;