# Multi-Agent Collaborative Learning System - "The Second Mind"

A React dashboard for monitoring and interacting with a sophisticated multi-agent AI system that generates, refines, and evolves hypotheses through iterative cycles using specialized AI agents and real-time web data.

## Features

- Interactive agent workflow visualization showing real-time status and connections between specialized agents
- Hypothesis tracking panel displaying generated ideas with rankings, refinements, and evolution
- Memory storage browser for viewing past interactions and knowledge connections
- Web data integration panel showing sources and extracted insights
- System performance metrics with visualizations of agent efficiency and resource allocation

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v8 or higher recommended)

## Installation

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install
```

## Development

```bash
# Start the development server
npm run dev
```

This will start the Vite development server. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173/).

## Building for Production

```bash
# Build the project
npm run build
```

This will create a production-ready build in the `dist` directory.

```bash
# Preview the production build locally
npm run preview
```

## Additional Commands

```bash
# Run TypeScript type checking
tsc

# Lint the codebase
npm run lint

# Generate Supabase types (requires SUPABASE_PROJECT_ID environment variable)
npm run types:supabase
```

## Project Structure

- `src/components/Dashboard/` - Main dashboard components
  - `AgentWorkflowVisualization.tsx` - Agent network visualization
  - `HypothesisTrackingPanel.tsx` - Hypothesis tracking and management
  - `MemoryStorageBrowser.tsx` - Knowledge graph and memory database
  - `SystemPerformanceMetrics.tsx` - System performance monitoring
- `src/components/ui/` - UI components based on Radix UI
- `src/lib/` - Utility functions and shared code

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI components
- Recharts for data visualization
- React Router for navigation
- React Hook Form for form handling
- Framer Motion for animations

## Environment Variables

The project may require the following environment variables:

- `VITE_BASE_PATH` - Base path for production deployment (optional)
- `SUPABASE_PROJECT_ID` - Required for generating Supabase types

## Deployment

After building the project with `npm run build`, you can deploy the contents of the `dist` directory to any static hosting service.

```bash
# Example deployment using a static file server
npm run build
npx serve -s dist
```

## License

[License information]
