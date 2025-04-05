import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  Filter,
  Database,
  Network,
  Clock,
  Tag,
} from "lucide-react";

interface MemoryItem {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  domain: string;
  connections: string[];
  tags: string[];
}

interface MemoryConnection {
  source: string;
  target: string;
  strength: number;
}

const MemoryStorageBrowser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [activeTab, setActiveTab] = useState("knowledge-graph");

  // Mock data for demonstration
  const mockMemories: MemoryItem[] = [
    {
      id: "1",
      title: "Solar Energy Efficiency",
      content:
        "Research on improving solar panel efficiency through new materials.",
      timestamp: "2023-06-15T10:30:00",
      domain: "renewable-energy",
      connections: ["2", "5"],
      tags: ["solar", "efficiency", "materials"],
    },
    {
      id: "2",
      title: "Battery Storage Solutions",
      content:
        "Analysis of next-generation battery technologies for renewable energy storage.",
      timestamp: "2023-06-18T14:45:00",
      domain: "renewable-energy",
      connections: ["1", "3"],
      tags: ["battery", "storage", "technology"],
    },
    {
      id: "3",
      title: "AI in Climate Modeling",
      content: "Applications of machine learning in climate prediction models.",
      timestamp: "2023-07-02T09:15:00",
      domain: "artificial-intelligence",
      connections: ["2", "4"],
      tags: ["AI", "climate", "prediction"],
    },
    {
      id: "4",
      title: "Neural Networks for Pattern Recognition",
      content:
        "Advancements in neural network architectures for complex pattern recognition.",
      timestamp: "2023-07-10T16:20:00",
      domain: "artificial-intelligence",
      connections: ["3", "6"],
      tags: ["neural-networks", "pattern-recognition"],
    },
    {
      id: "5",
      title: "Wind Turbine Optimization",
      content:
        "Research on optimizing wind turbine design for various environmental conditions.",
      timestamp: "2023-07-22T11:10:00",
      domain: "renewable-energy",
      connections: ["1"],
      tags: ["wind", "turbine", "optimization"],
    },
    {
      id: "6",
      title: "Reinforcement Learning Applications",
      content:
        "Practical applications of reinforcement learning in industrial automation.",
      timestamp: "2023-08-05T13:40:00",
      domain: "artificial-intelligence",
      connections: ["4"],
      tags: ["reinforcement-learning", "automation"],
    },
  ];

  const mockConnections: MemoryConnection[] = [
    { source: "1", target: "2", strength: 0.8 },
    { source: "1", target: "5", strength: 0.6 },
    { source: "2", target: "3", strength: 0.7 },
    { source: "3", target: "4", strength: 0.9 },
    { source: "4", target: "6", strength: 0.5 },
  ];

  // Filter memories based on search query, time filter, and domain
  const filteredMemories = mockMemories.filter((memory) => {
    const matchesSearch =
      searchQuery === "" ||
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesDomain =
      selectedDomain === "all" || memory.domain === selectedDomain;

    // Simple time filter logic (would be more sophisticated in a real implementation)
    const matchesTime =
      selectedTimeFilter === "all" ||
      (selectedTimeFilter === "recent" &&
        new Date(memory.timestamp) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesDomain && matchesTime;
  });

  const handleMemorySelect = (memory: MemoryItem) => {
    setSelectedMemory(memory);
  };

  const getRelatedMemories = (memoryId: string) => {
    const connectionIds =
      mockMemories.find((m) => m.id === memoryId)?.connections || [];
    return mockMemories.filter((m) => connectionIds.includes(m.id));
  };

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Memory Storage Browser</CardTitle>
            <CardDescription>
              Explore the system's memory storage and knowledge connections
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={selectedTimeFilter}
              onValueChange={setSelectedTimeFilter}
            >
              <SelectTrigger className="w-36">
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="recent">Recent (30 days)</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="w-40">
                <Tag className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Knowledge Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="renewable-energy">
                  Renewable Energy
                </SelectItem>
                <SelectItem value="artificial-intelligence">
                  Artificial Intelligence
                </SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="knowledge-graph">
              <Network className="mr-2 h-4 w-4" />
              Knowledge Graph
            </TabsTrigger>
            <TabsTrigger value="memory-list">
              <Database className="mr-2 h-4 w-4" />
              Memory Database
            </TabsTrigger>
            <TabsTrigger value="connections">
              <Filter className="mr-2 h-4 w-4" />
              Memory Connections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="knowledge-graph" className="w-full">
            <div className="border rounded-lg p-4 h-[400px] flex items-center justify-center bg-muted/10">
              <div className="text-center">
                <Network className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                <h3 className="text-lg font-medium mb-2">
                  Knowledge Graph Visualization
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Interactive visualization of memory connections would be
                  displayed here, showing relationships between different
                  knowledge nodes.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="memory-list">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">
              <div className="col-span-1 border rounded-lg">
                <ScrollArea className="h-[400px] w-full">
                  <div className="p-4">
                    <h3 className="font-medium mb-3">
                      Memory Items ({filteredMemories.length})
                    </h3>
                    {filteredMemories.length > 0 ? (
                      <div className="space-y-2">
                        {filteredMemories.map((memory) => (
                          <div
                            key={memory.id}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${selectedMemory?.id === memory.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted"}`}
                            onClick={() => handleMemorySelect(memory)}
                          >
                            <h4 className="font-medium">{memory.title}</h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {memory.content}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(memory.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No memories found matching your criteria
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              <div className="col-span-2 border rounded-lg">
                {selectedMemory ? (
                  <div className="p-4 h-full flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-medium">
                        {selectedMemory.title}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(selectedMemory.timestamp).toLocaleString()}
                        <Badge variant="outline" className="ml-2">
                          {selectedMemory.domain.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Content</h4>
                      <p className="text-muted-foreground">
                        {selectedMemory.content}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMemory.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <h4 className="font-medium mb-2">Related Memories</h4>
                      {getRelatedMemories(selectedMemory.id).length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {getRelatedMemories(selectedMemory.id).map(
                            (memory) => (
                              <div
                                key={memory.id}
                                className="p-2 border rounded-md cursor-pointer hover:bg-muted/50"
                                onClick={() => handleMemorySelect(memory)}
                              >
                                <h5 className="font-medium text-sm">
                                  {memory.title}
                                </h5>
                                <p className="text-xs text-muted-foreground truncate">
                                  {memory.content}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No related memories found
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Select a memory item to view details
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="connections">
            <div className="border rounded-lg p-4 h-[400px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-3">Memory Connections</h3>
                  <ScrollArea className="h-[320px]">
                    <div className="space-y-2">
                      {mockConnections.map((connection, index) => {
                        const sourceMemory = mockMemories.find(
                          (m) => m.id === connection.source,
                        );
                        const targetMemory = mockMemories.find(
                          (m) => m.id === connection.target,
                        );
                        return (
                          <div key={index} className="p-3 border rounded-md">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">
                                {sourceMemory?.title} → {targetMemory?.title}
                              </div>
                              <Badge
                                variant={
                                  connection.strength > 0.7
                                    ? "default"
                                    : "outline"
                                }
                              >
                                {Math.round(connection.strength * 100)}%
                                strength
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              Connection based on shared concepts and references
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-3">Connection Visualization</h3>
                  <div className="h-[320px] flex items-center justify-center bg-muted/10 rounded-md">
                    <div className="text-center">
                      <Network className="h-12 w-12 mx-auto mb-3 text-primary/60" />
                      <p className="text-muted-foreground max-w-xs mx-auto">
                        Interactive visualization of selected memory connections
                        would be displayed here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MemoryStorageBrowser;
