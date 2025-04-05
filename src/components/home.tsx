import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Brain,
  Database,
  Globe,
  BarChart2,
  Settings,
} from "lucide-react";
import AgentWorkflowVisualization from "./Dashboard/AgentWorkflowVisualization";
import HypothesisTrackingPanel from "./Dashboard/HypothesisTrackingPanel";
import MemoryStorageBrowser from "./Dashboard/MemoryStorageBrowser";
import SystemPerformanceMetrics from "./Dashboard/SystemPerformanceMetrics";

const Home = () => {
  const [activeTab, setActiveTab] = useState("agent-workflow");
  const [systemRunning, setSystemRunning] = useState(true);

  const toggleSystemStatus = () => {
    setSystemRunning(!systemRunning);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">The Second Mind</h1>
          <p className="text-sm text-muted-foreground">
            Multi-Agent Learning System
          </p>
        </div>

        <nav className="space-y-2 flex-1">
          <Button
            variant={activeTab === "agent-workflow" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("agent-workflow")}
          >
            <Brain className="mr-2 h-4 w-4" />
            Agent Workflow
          </Button>
          <Button
            variant={
              activeTab === "hypothesis-tracking" ? "secondary" : "ghost"
            }
            className="w-full justify-start"
            onClick={() => setActiveTab("hypothesis-tracking")}
          >
            <Activity className="mr-2 h-4 w-4" />
            Hypothesis Tracking
          </Button>
          <Button
            variant={activeTab === "memory-storage" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("memory-storage")}
          >
            <Database className="mr-2 h-4 w-4" />
            Memory Storage
          </Button>
          <Button
            variant={activeTab === "system-performance" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("system-performance")}
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            System Performance
          </Button>
        </nav>

        <div className="pt-4 border-t">
          <Button
            variant={systemRunning ? "destructive" : "default"}
            className="w-full"
            onClick={toggleSystemStatus}
          >
            {systemRunning ? "Pause System" : "Resume System"}
          </Button>
          <Button variant="outline" className="w-full mt-2">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {activeTab === "agent-workflow" &&
                  "Agent Workflow Visualization"}
                {activeTab === "hypothesis-tracking" &&
                  "Hypothesis Tracking Panel"}
                {activeTab === "memory-storage" && "Memory Storage Browser"}
                {activeTab === "system-performance" &&
                  "System Performance Metrics"}
              </h2>
              <p className="text-muted-foreground">
                {activeTab === "agent-workflow" &&
                  "Monitor real-time agent activities and connections"}
                {activeTab === "hypothesis-tracking" &&
                  "Track and analyze generated hypotheses"}
                {activeTab === "memory-storage" &&
                  "Browse and search system memory storage"}
                {activeTab === "system-performance" &&
                  "View system performance metrics and resource allocation"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`h-3 w-3 rounded-full ${systemRunning ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <span className="text-sm font-medium">
                {systemRunning ? "System Active" : "System Paused"}
              </span>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsContent value="agent-workflow">
            <AgentWorkflowVisualization systemRunning={systemRunning} />
          </TabsContent>
          <TabsContent value="hypothesis-tracking">
            <HypothesisTrackingPanel />
          </TabsContent>
          <TabsContent value="memory-storage">
            <MemoryStorageBrowser />
          </TabsContent>
          <TabsContent value="system-performance">
            <SystemPerformanceMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
