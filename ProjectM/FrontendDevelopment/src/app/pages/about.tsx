import { Card } from "../components/ui/card";
import { Target, Eye, Lightbulb } from "lucide-react";

export function About() {
  const team = [
    { name: "Alex Thompson", role: "CEO & Founder", initials: "AT" },
    { name: "Sarah Chen", role: "CTO", initials: "SC" },
    { name: "Michael Rodriguez", role: "Head of AI", initials: "MR" },
    { name: "Emily Parker", role: "Head of Product", initials: "EP" },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push the boundaries of AI and NLP technology to deliver cutting-edge sentiment analysis.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We believe in clear, honest communication about our methods, capabilities, and limitations.",
    },
    {
      icon: Target,
      title: "Customer Insights",
      description: "Our mission is to help businesses truly understand their customers and make data-driven decisions.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          About{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SentimentX
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to help businesses understand their customers through advanced AI-powered sentiment analysis
        </p>
      </div>

      <Card glass className="mb-16 p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-4">
            In today's digital age, customer reviews are more important than ever. They shape purchasing decisions, 
            build brand reputation, and provide invaluable feedback for product improvement.
          </p>
          <p className="text-lg text-muted-foreground">
            SentimentX was created to help businesses harness the power of this feedback through advanced AI and 
            natural language processing. We transform thousands of reviews into clear, actionable insights that drive 
            better business decisions.
          </p>
        </div>
      </Card>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Sentiment Analysis Matters</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card glass>
            <h3 className="text-xl font-semibold mb-3">Understand Customer Needs</h3>
            <p className="text-muted-foreground">
              Identify what customers love and what they want improved. Make product decisions based on real feedback, 
              not assumptions.
            </p>
          </Card>
          <Card glass>
            <h3 className="text-xl font-semibold mb-3">Track Brand Health</h3>
            <p className="text-muted-foreground">
              Monitor how sentiment changes over time. Catch potential issues early and celebrate your wins.
            </p>
          </Card>
          <Card glass>
            <h3 className="text-xl font-semibold mb-3">Competitive Advantage</h3>
            <p className="text-muted-foreground">
              Understand how your products compare to competitors and identify opportunities for differentiation.
            </p>
          </Card>
          <Card glass>
            <h3 className="text-xl font-semibold mb-3">Data-Driven Decisions</h3>
            <p className="text-muted-foreground">
              Replace gut feelings with concrete data. Our analytics help you prioritize improvements that matter most.
            </p>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member) => (
            <Card key={member.name} glass className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                {member.initials}
              </div>
              <h3 className="font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card key={value.title} glass>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
