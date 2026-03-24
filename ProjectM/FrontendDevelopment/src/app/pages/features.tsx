import { Card } from "../components/ui/card";
import { Brain, Database, Key, BarChart3, History, GitCompare } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI Sentiment Detection",
      description: "Advanced machine learning models trained on millions of reviews to accurately detect sentiment patterns and emotional tones.",
    },
    {
      icon: Database,
      title: "Review Aggregation",
      description: "Automatically collect and aggregate reviews from multiple sources to get a comprehensive view of customer sentiment.",
    },
    {
      icon: Key,
      title: "Keyword Extraction",
      description: "Identify the most mentioned keywords and topics to understand what matters most to your customers.",
    },
    {
      icon: BarChart3,
      title: "Sentiment Percentage Analytics",
      description: "Detailed breakdown of positive, neutral, and negative sentiment with interactive visualizations.",
    },
    {
      icon: History,
      title: "Historical Product Reports",
      description: "Track sentiment trends over time and see how your product perception changes with updates and improvements.",
    },
    {
      icon: GitCompare,
      title: "Comparison Analytics",
      description: "Compare sentiment across different products, time periods, or customer segments for deeper insights.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Everything You Need for{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sentiment Analysis
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our comprehensive suite of features helps you understand customer sentiment at scale
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} glass className="hover:scale-105 transition-transform duration-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      <Card glass className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
            <p className="text-muted-foreground mb-6">
              Our powerful analytics dashboard gives you real-time insights into customer sentiment with beautiful, intuitive visualizations.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Real-time sentiment tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Interactive charts and graphs</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Exportable reports</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>API access for integration</span>
              </li>
            </ul>
          </div>
          <div className="relative h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MzA4MTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Dashboard Preview"
              className="relative w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
