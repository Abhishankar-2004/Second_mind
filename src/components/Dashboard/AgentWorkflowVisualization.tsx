import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Info,
  Activity,
  Settings,
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: "idle" | "working" | "completed" | "error";
  description: string;
  currentTask?: string;
  connections: string[];
  position: { x: number; y: number };
}

interface Connection {
  source: string;
  target: string;
  active: boolean;
  dataFlow: "bidirectional" | "source-to-target" | "target-to-source";
}

const AgentWorkflowVisualization = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "supervisor",
      name: "Supervisor Agent",
      type: "supervisor",
      status: "working",
      description:
        "Manages the agent workflow, assigns tasks, and iterates over cycles.",
      currentTask: "Coordinating hypothesis generation",
      connections: [
        "generation",
        "reflection",
        "ranking",
        "evolution",
        "proximity",
        "meta-review",
      ],
      position: { x: 400, y: 250 },
    },
    {
      id: "generation",
      name: "Generation Agent",
      type: "specialized",
      status: "working",
      description: "Creates initial hypotheses based on user input.",
      currentTask: "Generating new hypotheses",
      connections: ["supervisor", "reflection"],
      position: { x: 200, y: 150 },
    },
    {
      id: "reflection",
      name: "Reflection Agent",
      type: "specialized",
      status: "idle",
      description: "Filters and validates ideas using coherence analysis.",
      connections: ["supervisor", "generation", "ranking"],
      position: { x: 300, y: 100 },
    },
    {
      id: "ranking",
      name: "Ranking Agent",
      type: "specialized",
      status: "idle",
      description: "Scores ideas based on efficiency, cost, and feasibility.",
      connections: ["supervisor", "reflection", "evolution"],
      position: { x: 500, y: 100 },
    },
    {
      id: "evolution",
      name: "Evolution Agent",
      type: "specialized",
      status: "idle",
      description: "Refines hypotheses using web data trends.",
      connections: ["supervisor", "ranking", "proximity"],
      position: { x: 600, y: 150 },
    },
    {
      id: "proximity",
      name: "Proximity Agent",
      type: "specialized",
      status: "idle",
      description: "Links ideas to previous interactions and queries.",
      connections: ["supervisor", "evolution", "meta-review"],
      position: { x: 600, y: 350 },
    },
    {
      id: "meta-review",
      name: "Meta-Review Agent",
      type: "specialized",
      status: "idle",
      description:
        "Analyzes the system's performance and optimizes inefficiencies.",
      connections: ["supervisor", "proximity"],
      position: { x: 500, y: 400 },
    },
  ]);

  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewMode, setViewMode] = useState("network");

  // Generate connections based on agent data
  useEffect(() => {
    const newConnections: Connection[] = [];
    const addedPairs = new Set<string>();

    agents.forEach((agent) => {
      agent.connections.forEach((targetId) => {
        const pairKey = [agent.id, targetId].sort().join("-");
        if (!addedPairs.has(pairKey)) {
          addedPairs.add(pairKey);

          const dataFlow =
            agent.id === "supervisor" || targetId === "supervisor"
              ? "bidirectional"
              : "source-to-target";

          newConnections.push({
            source: agent.id,
            target: targetId,
            active:
              agent.status === "working" &&
              agents.find((a) => a.id === targetId)?.status === "working",
            dataFlow,
          });
        }
      });
    });

    setConnections(newConnections);
  }, [agents]);

  // Simulate agent status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prevAgents) => {
        return prevAgents.map((agent) => {
          // Randomly change some agent statuses for demonstration
          if (Math.random() > 0.7) {
            const statuses: ("idle" | "working" | "completed" | "error")[] = [
              "idle",
              "working",
              "completed",
              "error",
            ];
            const newStatus =
              statuses[Math.floor(Math.random() * statuses.length)];
            return { ...agent, status: newStatus };
          }
          return agent;
        });
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleRefresh = () => {
    // Simulate refreshing the visualization
    setAgents((prevAgents) => {
      return prevAgents.map((agent) => ({
        ...agent,
        status: Math.random() > 0.5 ? "working" : "idle",
      }));
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "idle":
        return "bg-gray-400";
      case "working":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getConnectionColor = (connection: Connection) => {
    return connection.active ? "stroke-blue-500" : "stroke-gray-300";
  };

  const getConnectionMarker = (connection: Connection) => {
    if (connection.dataFlow === "bidirectional") {
      return (
        <>
          <marker
            id={`arrowhead-${connection.source}-${connection.target}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={connection.active ? "#3b82f6" : "#d1d5db"}
            />
          </marker>
          <marker
            id={`arrowhead-reverse-${connection.source}-${connection.target}`}
            markerWidth="10"
            markerHeight="7"
            refX="1"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="10 0, 0 3.5, 10 7"
              fill={connection.active ? "#3b82f6" : "#d1d5db"}
            />
          </marker>
        </>
      );
    } else if (connection.dataFlow === "source-to-target") {
      return (
        <marker
          id={`arrowhead-${connection.source}-${connection.target}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={connection.active ? "#3b82f6" : "#d1d5db"}
          />
        </marker>
      );
    } else {
      return (
        <marker
          id={`arrowhead-${connection.source}-${connection.target}`}
          markerWidth="10"
          markerHeight="7"
          refX="1"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="10 0, 0 3.5, 10 7"
            fill={connection.active ? "#3b82f6" : "#d1d5db"}
          />
        </marker>
      );
    }
  };

  return (
    <Card className="w-full h-full bg-white">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Agent Workflow Visualization</h2>
        <div className="flex space-x-2">
          <Tabs
            value={viewMode}
            onValueChange={setViewMode}
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger value="network">Network View</TabsTrigger>
              <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            </TabsList>
          </Tabs>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <CardContent className="p-0 flex">
        <div className="relative w-3/4 h-[600px] overflow-hidden border-r">
          <Tabs value={viewMode} onValueChange={setViewMode} className="h-full">
            <TabsList className="hidden">
              <TabsTrigger value="network">Network View</TabsTrigger>
              <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            </TabsList>
            <TabsContent value="network" className="h-full m-0">
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                >
                  <defs>
                    {connections.map((connection) =>
                      getConnectionMarker(connection),
                    )}
                  </defs>
                  {connections.map((connection, index) => {
                    const sourceAgent = agents.find(
                      (a) => a.id === connection.source,
                    );
                    const targetAgent = agents.find(
                      (a) => a.id === connection.target,
                    );

                    if (!sourceAgent || !targetAgent) return null;

                    return (
                      <g key={`connection-${index}`}>
                        <line
                          x1={sourceAgent.position.x}
                          y1={sourceAgent.position.y}
                          x2={targetAgent.position.x}
                          y2={targetAgent.position.y}
                          className={`${getConnectionColor(connection)} stroke-2 transition-colors duration-300`}
                          markerEnd={
                            connection.dataFlow !== "target-to-source"
                              ? `url(#arrowhead-${connection.source}-${connection.target})`
                              : ""
                          }
                          markerStart={
                            connection.dataFlow === "bidirectional"
                              ? `url(#arrowhead-reverse-${connection.source}-${connection.target})`
                              : connection.dataFlow === "target-to-source"
                                ? `url(#arrowhead-${connection.source}-${connection.target})`
                                : ""
                          }
                        />
                      </g>
                    );
                  })}
                </svg>

                {agents.map((agent) => (
                  <motion.div
                    key={agent.id}
                    className={`absolute cursor-pointer rounded-lg p-2 ${agent.type === "supervisor" ? "bg-purple-100 border-purple-300" : "bg-blue-50 border-blue-200"} border-2 shadow-md transition-shadow hover:shadow-lg`}
                    style={{
                      left: agent.position.x - 60,
                      top: agent.position.y - 40,
                      width: 120,
                      height: 80,
                      zIndex: selectedAgent?.id === agent.id ? 10 : 1,
                    }}
                    onClick={() => handleAgentClick(agent)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-sm font-medium truncate w-full text-center">
                        {agent.name}
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${getStatusColor(agent.status)}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hierarchy" className="h-full m-0">
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <div className="mb-8">
                    <div className="inline-block p-4 bg-purple-100 border-2 border-purple-300 rounded-lg">
                      <div className="font-semibold">Supervisor Agent</div>
                      <div className="text-xs text-gray-500">
                        Manages workflow
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-8">
                    {agents
                      .filter((a) => a.id !== "supervisor")
                      .map((agent) => (
                        <div
                          key={agent.id}
                          className="p-3 bg-blue-50 border-2 border-blue-200 rounded-lg"
                        >
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {agent.description.substring(0, 30)}...
                          </div>
                          <div
                            className={`w-3 h-3 rounded-full mt-2 mx-auto ${getStatusColor(agent.status)}`}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="h-full m-0 p-4">
              <div className="h-full overflow-y-auto">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  {agents.map((agent, index) => (
                    <div key={agent.id} className="mb-6 ml-10 relative">
                      <div className="absolute -left-6 mt-1.5">
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}
                        ></div>
                      </div>
                      <div className="p-3 bg-white border rounded-lg shadow-sm">
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {agent.currentTask || "No active task"}
                        </div>
                        <Badge
                          variant={
                            agent.status === "working"
                              ? "default"
                              : agent.status === "completed"
                                ? "secondary"
                                : agent.status === "error"
                                  ? "destructive"
                                  : "outline"
                          }
                          className="mt-2"
                        >
                          {agent.status.charAt(0).toUpperCase() +
                            agent.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-1/4 p-4 overflow-y-auto h-[600px]">
          {selectedAgent ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {selectedAgent.name}
              </h3>
              <div className="flex items-center mb-4">
                <div
                  className={`w-3 h-3 rounded-full ${getStatusColor(selectedAgent.status)} mr-2`}
                />
                <span className="capitalize">{selectedAgent.status}</span>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Description
                </h4>
                <p className="text-sm">{selectedAgent.description}</p>
              </div>

              {selectedAgent.currentTask && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Current Task
                  </h4>
                  <p className="text-sm">{selectedAgent.currentTask}</p>
                </div>
              )}

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Connections
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.connections.map((connectionId) => {
                    const connectedAgent = agents.find(
                      (a) => a.id === connectionId,
                    );
                    return connectedAgent ? (
                      <Badge
                        key={connectionId}
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleAgentClick(connectedAgent)}
                      >
                        {connectedAgent.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center"
                >
                  <Activity className="h-4 w-4 mr-1" />
                  View Activity
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Configure
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <Info className="h-12 w-12 mb-4 text-gray-300" />
              <p>Select an agent to view details</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentWorkflowVisualization;
