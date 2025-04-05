import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpDown,
  Filter,
  Download,
  ChevronRight,
  BarChart2,
  Clock,
  FileText,
} from "lucide-react";

interface Hypothesis {
  id: string;
  title: string;
  description: string;
  ranking: number;
  category: string;
  confidence: number;
  timestamp: string;
  status: "active" | "archived" | "refined";
  agentContributions: {
    agentName: string;
    contribution: string;
    timestamp: string;
  }[];
  evolutionHistory: {
    version: number;
    description: string;
    timestamp: string;
    changes: string;
  }[];
  supportingEvidence: {
    source: string;
    relevance: number;
    description: string;
  }[];
}

const HypothesisTrackingPanel = () => {
  const [selectedTab, setSelectedTab] = useState("current");
  const [selectedHypothesis, setSelectedHypothesis] =
    useState<Hypothesis | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sortField, setSortField] = useState("ranking");
  const [sortDirection, setSortDirection] = useState("desc");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for hypotheses
  const hypotheses: Hypothesis[] = [
    {
      id: "1",
      title: "Neural Network Optimization for Edge Devices",
      description:
        "A new approach to optimize neural networks for deployment on resource-constrained edge devices without significant accuracy loss.",
      ranking: 92,
      category: "AI",
      confidence: 87,
      timestamp: "2023-06-15T10:30:00Z",
      status: "active",
      agentContributions: [
        {
          agentName: "Generation Agent",
          contribution: "Initial hypothesis formulation",
          timestamp: "2023-06-15T10:30:00Z",
        },
        {
          agentName: "Ranking Agent",
          contribution: "Assigned high priority based on market trends",
          timestamp: "2023-06-15T11:15:00Z",
        },
        {
          agentName: "Evolution Agent",
          contribution:
            "Refined with latest research on quantization techniques",
          timestamp: "2023-06-16T09:45:00Z",
        },
      ],
      evolutionHistory: [
        {
          version: 1,
          description: "Initial hypothesis on neural network compression",
          timestamp: "2023-06-15T10:30:00Z",
          changes: "Created",
        },
        {
          version: 2,
          description: "Added quantization-aware training component",
          timestamp: "2023-06-16T09:45:00Z",
          changes: "Enhanced with specific techniques",
        },
        {
          version: 3,
          description: "Incorporated hardware-specific optimizations",
          timestamp: "2023-06-17T14:20:00Z",
          changes: "Expanded scope",
        },
      ],
      supportingEvidence: [
        {
          source: "arXiv:2305.12345",
          relevance: 95,
          description: "Recent paper on efficient neural networks",
        },
        {
          source: "Industry report: Edge AI Market 2023",
          relevance: 88,
          description: "Market analysis showing growing demand",
        },
        {
          source: "TinyML Conference proceedings",
          relevance: 92,
          description: "Similar approaches showing promising results",
        },
      ],
    },
    {
      id: "2",
      title: "Sustainable Energy Storage Solutions",
      description:
        "Novel materials for high-capacity, environmentally friendly energy storage with reduced rare earth elements.",
      ranking: 88,
      category: "Energy",
      confidence: 82,
      timestamp: "2023-06-14T08:45:00Z",
      status: "active",
      agentContributions: [
        {
          agentName: "Generation Agent",
          contribution: "Initial hypothesis formulation",
          timestamp: "2023-06-14T08:45:00Z",
        },
        {
          agentName: "Reflection Agent",
          contribution: "Validated against existing research",
          timestamp: "2023-06-14T10:30:00Z",
        },
        {
          agentName: "Proximity Agent",
          contribution: "Linked to previous materials science queries",
          timestamp: "2023-06-15T13:15:00Z",
        },
      ],
      evolutionHistory: [
        {
          version: 1,
          description: "Initial hypothesis on sustainable batteries",
          timestamp: "2023-06-14T08:45:00Z",
          changes: "Created",
        },
        {
          version: 2,
          description: "Focused on sodium-ion alternatives",
          timestamp: "2023-06-15T13:15:00Z",
          changes: "Narrowed scope",
        },
      ],
      supportingEvidence: [
        {
          source: "Nature Materials publication",
          relevance: 90,
          description: "Recent advances in sodium-ion batteries",
        },
        {
          source: "Clean Energy Initiative report",
          relevance: 85,
          description: "Policy support for sustainable energy storage",
        },
        {
          source: "Materials database analysis",
          relevance: 88,
          description: "Availability of alternative materials",
        },
      ],
    },
    {
      id: "3",
      title: "Automated Crop Disease Detection",
      description:
        "Computer vision system for early detection of crop diseases using smartphone cameras and edge computing.",
      ranking: 85,
      category: "Agriculture",
      confidence: 79,
      timestamp: "2023-06-12T14:20:00Z",
      status: "refined",
      agentContributions: [
        {
          agentName: "Generation Agent",
          contribution: "Initial hypothesis formulation",
          timestamp: "2023-06-12T14:20:00Z",
        },
        {
          agentName: "Evolution Agent",
          contribution: "Added edge computing component",
          timestamp: "2023-06-13T11:30:00Z",
        },
        {
          agentName: "Meta-Review Agent",
          contribution: "Suggested improvements to detection accuracy",
          timestamp: "2023-06-14T16:45:00Z",
        },
      ],
      evolutionHistory: [
        {
          version: 1,
          description: "Initial hypothesis on crop disease detection",
          timestamp: "2023-06-12T14:20:00Z",
          changes: "Created",
        },
        {
          version: 2,
          description: "Added edge computing for offline operation",
          timestamp: "2023-06-13T11:30:00Z",
          changes: "Added feature",
        },
        {
          version: 3,
          description: "Improved detection algorithm with transfer learning",
          timestamp: "2023-06-14T16:45:00Z",
          changes: "Enhanced accuracy",
        },
      ],
      supportingEvidence: [
        {
          source: "Agricultural AI Conference 2023",
          relevance: 87,
          description: "Similar approaches in developed regions",
        },
        {
          source: "FAO report on crop losses",
          relevance: 92,
          description: "Economic impact of early detection",
        },
        {
          source: "Field test results from pilot program",
          relevance: 85,
          description: "Preliminary accuracy metrics",
        },
      ],
    },
    {
      id: "4",
      title: "Personalized Microbiome Therapeutics",
      description:
        "Tailored probiotic treatments based on individual gut microbiome analysis for improved efficacy.",
      ranking: 78,
      category: "Healthcare",
      confidence: 75,
      timestamp: "2023-06-10T09:15:00Z",
      status: "archived",
      agentContributions: [
        {
          agentName: "Generation Agent",
          contribution: "Initial hypothesis formulation",
          timestamp: "2023-06-10T09:15:00Z",
        },
        {
          agentName: "Ranking Agent",
          contribution: "Moderate priority due to regulatory challenges",
          timestamp: "2023-06-10T11:45:00Z",
        },
      ],
      evolutionHistory: [
        {
          version: 1,
          description: "Initial hypothesis on microbiome therapeutics",
          timestamp: "2023-06-10T09:15:00Z",
          changes: "Created",
        },
        {
          version: 2,
          description: "Added personalization component",
          timestamp: "2023-06-11T13:30:00Z",
          changes: "Expanded scope",
        },
      ],
      supportingEvidence: [
        {
          source: "Microbiome research journal",
          relevance: 88,
          description: "Clinical studies on targeted probiotics",
        },
        {
          source: "Healthcare market analysis",
          relevance: 75,
          description: "Growing consumer interest in gut health",
        },
        {
          source: "Regulatory framework assessment",
          relevance: 70,
          description: "Challenges in personalized treatments",
        },
      ],
    },
    {
      id: "5",
      title: "Quantum-Resistant Encryption for IoT",
      description:
        "Lightweight cryptographic methods resistant to quantum computing attacks for Internet of Things devices.",
      ranking: 90,
      category: "Cybersecurity",
      confidence: 85,
      timestamp: "2023-06-08T16:40:00Z",
      status: "active",
      agentContributions: [
        {
          agentName: "Generation Agent",
          contribution: "Initial hypothesis formulation",
          timestamp: "2023-06-08T16:40:00Z",
        },
        {
          agentName: "Reflection Agent",
          contribution: "Validated technical feasibility",
          timestamp: "2023-06-09T10:15:00Z",
        },
        {
          agentName: "Ranking Agent",
          contribution: "High priority due to security implications",
          timestamp: "2023-06-09T14:30:00Z",
        },
      ],
      evolutionHistory: [
        {
          version: 1,
          description: "Initial hypothesis on quantum-resistant encryption",
          timestamp: "2023-06-08T16:40:00Z",
          changes: "Created",
        },
        {
          version: 2,
          description: "Focused on lattice-based methods for IoT",
          timestamp: "2023-06-09T14:30:00Z",
          changes: "Narrowed scope",
        },
        {
          version: 3,
          description: "Added resource optimization for constrained devices",
          timestamp: "2023-06-10T11:20:00Z",
          changes: "Enhanced practicality",
        },
      ],
      supportingEvidence: [
        {
          source: "NIST post-quantum cryptography standards",
          relevance: 95,
          description: "Alignment with emerging standards",
        },
        {
          source: "IoT security vulnerability report",
          relevance: 90,
          description: "Current weaknesses in IoT encryption",
        },
        {
          source: "Quantum computing timeline analysis",
          relevance: 85,
          description: "Urgency assessment for implementation",
        },
      ],
    },
  ];

  // Filter and sort hypotheses
  const filteredHypotheses = hypotheses
    .filter((h) =>
      selectedTab === "current"
        ? h.status === "active"
        : selectedTab === "archived"
          ? h.status === "archived"
          : h.status === "refined",
    )
    .filter((h) => categoryFilter === "all" || h.category === categoryFilter)
    .filter(
      (h) =>
        h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortField as keyof Hypothesis];
      const bValue = b[sortField as keyof Hypothesis];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleHypothesisSelect = (hypothesis: Hypothesis) => {
    setSelectedHypothesis(hypothesis);
    setDetailsOpen(true);
  };

  const categories = [
    "AI",
    "Energy",
    "Agriculture",
    "Healthcare",
    "Cybersecurity",
  ];

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Hypothesis Tracking</CardTitle>
            <CardDescription>
              Monitor and analyze system-generated hypotheses
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download size={16} />
            Export Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="refined">Refined</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search hypotheses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon">
                  <Filter size={18} />
                </Button>
              </div>
            </div>

            <TabsContent value="current" className="mt-0">
              <HypothesisTable
                hypotheses={filteredHypotheses}
                handleSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
                onSelect={handleHypothesisSelect}
              />
            </TabsContent>
            <TabsContent value="refined" className="mt-0">
              <HypothesisTable
                hypotheses={filteredHypotheses}
                handleSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
                onSelect={handleHypothesisSelect}
              />
            </TabsContent>
            <TabsContent value="archived" className="mt-0">
              <HypothesisTable
                hypotheses={filteredHypotheses}
                handleSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
                onSelect={handleHypothesisSelect}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Hypothesis Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedHypothesis && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    {selectedHypothesis.title}
                    <Badge className="ml-2">
                      {selectedHypothesis.category}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription className="text-base mt-2">
                    {selectedHypothesis.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-6">
                  {/* Hypothesis Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">
                        Ranking
                      </div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold">
                          {selectedHypothesis.ranking}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">
                          /100
                        </span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">
                        Confidence
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-2xl font-bold">
                            {selectedHypothesis.confidence}%
                          </span>
                        </div>
                        <Progress
                          value={selectedHypothesis.confidence}
                          className="h-2"
                        />
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">
                        Created
                      </div>
                      <div className="flex items-center">
                        <Clock
                          size={16}
                          className="mr-2 text-muted-foreground"
                        />
                        <span>
                          {new Date(
                            selectedHypothesis.timestamp,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs for different sections */}
                  <Tabs defaultValue="evolution" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="evolution">
                        Evolution History
                      </TabsTrigger>
                      <TabsTrigger value="evidence">
                        Supporting Evidence
                      </TabsTrigger>
                      <TabsTrigger value="contributions">
                        Agent Contributions
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="evolution" className="mt-4">
                      <div className="space-y-4">
                        {selectedHypothesis.evolutionHistory.map(
                          (history, index) => (
                            <div
                              key={index}
                              className="border-l-2 border-primary pl-4 pb-4"
                            >
                              <div className="flex justify-between">
                                <div className="font-medium">
                                  Version {history.version}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(history.timestamp).toLocaleString()}
                                </div>
                              </div>
                              <div className="mt-1">{history.description}</div>
                              <Badge variant="outline" className="mt-2">
                                {history.changes}
                              </Badge>
                            </div>
                          ),
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="evidence" className="mt-4">
                      <div className="space-y-4">
                        {selectedHypothesis.supportingEvidence.map(
                          (evidence, index) => (
                            <div
                              key={index}
                              className="bg-slate-50 p-4 rounded-lg"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">
                                    {evidence.source}
                                  </div>
                                  <div className="mt-1">
                                    {evidence.description}
                                  </div>
                                </div>
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  {evidence.relevance}% relevant
                                </Badge>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="contributions" className="mt-4">
                      <div className="space-y-4">
                        {selectedHypothesis.agentContributions.map(
                          (contribution, index) => (
                            <div key={index} className="border p-4 rounded-lg">
                              <div className="flex justify-between">
                                <div className="font-medium">
                                  {contribution.agentName}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(
                                    contribution.timestamp,
                                  ).toLocaleString()}
                                </div>
                              </div>
                              <div className="mt-1">
                                {contribution.contribution}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

interface HypothesisTableProps {
  hypotheses: Hypothesis[];
  handleSort: (field: string) => void;
  sortField: string;
  sortDirection: string;
  onSelect: (hypothesis: Hypothesis) => void;
}

const HypothesisTable = ({
  hypotheses,
  handleSort,
  sortField,
  sortDirection,
  onSelect,
}: HypothesisTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("title")}
                className="flex items-center"
              >
                Hypothesis
                {sortField === "title" && (
                  <ArrowUpDown
                    size={16}
                    className={`ml-2 ${sortDirection === "asc" ? "rotate-180" : ""}`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("category")}
                className="flex items-center"
              >
                Category
                {sortField === "category" && (
                  <ArrowUpDown
                    size={16}
                    className={`ml-2 ${sortDirection === "asc" ? "rotate-180" : ""}`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("ranking")}
                className="flex items-center"
              >
                Ranking
                {sortField === "ranking" && (
                  <ArrowUpDown
                    size={16}
                    className={`ml-2 ${sortDirection === "asc" ? "rotate-180" : ""}`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("confidence")}
                className="flex items-center"
              >
                Confidence
                {sortField === "confidence" && (
                  <ArrowUpDown
                    size={16}
                    className={`ml-2 ${sortDirection === "asc" ? "rotate-180" : ""}`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("timestamp")}
                className="flex items-center"
              >
                Date
                {sortField === "timestamp" && (
                  <ArrowUpDown
                    size={16}
                    className={`ml-2 ${sortDirection === "asc" ? "rotate-180" : ""}`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hypotheses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                No hypotheses found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            hypotheses.map((hypothesis) => (
              <TableRow
                key={hypothesis.id}
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => onSelect(hypothesis)}
              >
                <TableCell className="font-medium">
                  <div className="line-clamp-2">{hypothesis.title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
                    {hypothesis.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{hypothesis.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <BarChart2 size={16} className="mr-2 text-primary" />
                    <span>{hypothesis.ranking}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{hypothesis.confidence}%</span>
                    </div>
                    <Progress value={hypothesis.confidence} className="h-2" />
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(hypothesis.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(hypothesis);
                    }}
                  >
                    <ChevronRight size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HypothesisTrackingPanel;
