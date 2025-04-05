import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  BarChart3,
  Clock,
  Cpu,
  Download,
  LineChart,
  PieChart,
  Settings,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const MetricCard = ({
  title,
  value,
  description,
  icon,
  trend = "neutral",
  trendValue = "0%",
}: MetricCardProps) => {
  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-gray-500",
  };

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trendValue && (
          <div
            className={`mt-2 flex items-center text-xs ${trendColor[trend]}`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface AgentPerformanceProps {
  agentName: string;
  efficiency: number;
  tasksCompleted: number;
  averageResponseTime: string;
  memoryUsage: string;
}

const AgentPerformance = ({
  agentName = "Generation Agent",
  efficiency = 85,
  tasksCompleted = 124,
  averageResponseTime = "1.2s",
  memoryUsage = "256MB",
}: AgentPerformanceProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg">{agentName}</CardTitle>
        <CardDescription>Performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Efficiency</span>
            <span className="text-sm font-medium">{efficiency}%</span>
          </div>
          <Progress value={efficiency} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">
              Tasks Completed
            </span>
            <p className="text-lg font-medium">{tasksCompleted}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">
              Avg. Response Time
            </span>
            <p className="text-lg font-medium">{averageResponseTime}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Memory Usage</span>
            <p className="text-lg font-medium">{memoryUsage}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SystemPerformanceMetrics = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedAgent, setSelectedAgent] = useState("all");

  // Mock data for system metrics
  const systemMetrics = [
    {
      title: "System Uptime",
      value: "99.8%",
      description: "Last 30 days",
      icon: <Clock className="h-4 w-4" />,
      trend: "up" as const,
      trendValue: "0.2%",
    },
    {
      title: "CPU Usage",
      value: "42%",
      description: "Across all agents",
      icon: <Cpu className="h-4 w-4" />,
      trend: "down" as const,
      trendValue: "3%",
    },
    {
      title: "Hypotheses Generated",
      value: "1,248",
      description: "This month",
      icon: <BarChart3 className="h-4 w-4" />,
      trend: "up" as const,
      trendValue: "12%",
    },
    {
      title: "Avg. Cycle Time",
      value: "3.2s",
      description: "Per hypothesis",
      icon: <LineChart className="h-4 w-4" />,
      trend: "down" as const,
      trendValue: "0.4s",
    },
  ];

  // Mock data for agent performance
  const agentPerformanceData = [
    {
      agentName: "Generation Agent",
      efficiency: 92,
      tasksCompleted: 324,
      averageResponseTime: "0.8s",
      memoryUsage: "512MB",
    },
    {
      agentName: "Reflection Agent",
      efficiency: 88,
      tasksCompleted: 287,
      averageResponseTime: "1.1s",
      memoryUsage: "384MB",
    },
    {
      agentName: "Ranking Agent",
      efficiency: 95,
      tasksCompleted: 412,
      averageResponseTime: "0.6s",
      memoryUsage: "256MB",
    },
    {
      agentName: "Evolution Agent",
      efficiency: 84,
      tasksCompleted: 198,
      averageResponseTime: "2.3s",
      memoryUsage: "768MB",
    },
    {
      agentName: "Proximity Agent",
      efficiency: 90,
      tasksCompleted: 276,
      averageResponseTime: "1.4s",
      memoryUsage: "448MB",
    },
    {
      agentName: "Meta-Review Agent",
      efficiency: 87,
      tasksCompleted: 156,
      averageResponseTime: "1.8s",
      memoryUsage: "320MB",
    },
  ];

  return (
    <div className="w-full space-y-6 bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Performance Metrics</h2>

        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>System Performance Overview</CardTitle>
              <CardDescription>
                Overall system metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-gray-300" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Performance chart visualization would appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Hypothesis Processing</CardTitle>
                <CardDescription>Throughput and efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 mx-auto text-gray-300" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Processing chart would appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>
                  Recent warnings and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        Memory usage spike detected
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Evolution Agent - 15 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        System update completed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        All agents - 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        API rate limit approaching
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Web Data Integration - 4 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Agent-specific Metrics</h3>

            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="generation">Generation Agent</SelectItem>
                <SelectItem value="reflection">Reflection Agent</SelectItem>
                <SelectItem value="ranking">Ranking Agent</SelectItem>
                <SelectItem value="evolution">Evolution Agent</SelectItem>
                <SelectItem value="proximity">Proximity Agent</SelectItem>
                <SelectItem value="meta-review">Meta-Review Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentPerformanceData.map((agent, index) => (
              <AgentPerformance key={index} {...agent} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4 mt-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
              <CardDescription>
                System resources distribution across agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <PieChart className="h-16 w-16 mx-auto text-gray-300" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Resource allocation chart would appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Memory Usage</CardTitle>
                <CardDescription>Memory allocation by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentPerformanceData.map((agent, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{agent.agentName}</span>
                        <span className="text-sm font-medium">
                          {agent.memoryUsage}
                        </span>
                      </div>
                      <Progress
                        value={parseInt(agent.memoryUsage) / 10}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>CPU Utilization</CardTitle>
                <CardDescription>Processing power distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-gray-300" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      CPU utilization chart would appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Configure Alerts
        </Button>
      </div>
    </div>
  );
};

export default SystemPerformanceMetrics;
