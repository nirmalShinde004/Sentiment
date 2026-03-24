import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Brain, BarChart3, TrendingUp, Quote } from "lucide-react";

export function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Turn Customer Reviews Into{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Actionable Insights
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              SentimentX uses AI-powered sentiment analysis to help companies understand what customers truly think about their products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Start Analyzing Reviews
                </Button>
              </Link>
              <Link to="/app">
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl rounded-full"></div>
            <img
  src="/images/h.jpeg"
  alt="Analytics Dashboard"
  className="relative rounded-2xl shadow-2xl border border-border/50"
/>
            {/* <img
              src="C:\Users\raned\Downloads\ProjectM\Frontend Development\h.jpeg"
              https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MzA4MTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080
              alt="Analytics Dashboard"
              className="relative rounded-2xl shadow-2xl border border-border/50"
            /> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to understand customer sentiment
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card glass>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Sentiment Analysis</h3>
            <p className="text-muted-foreground">
              Automatically detect positive, neutral, and negative reviews using advanced natural language processing.
            </p>
          </Card>
          
          <Card glass>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Product Insights</h3>
            <p className="text-muted-foreground">
              Understand customer opinions with keyword extraction and sentiment trends over time.
            </p>
          </Card>
          
          <Card glass>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
            <p className="text-muted-foreground">
              View review trends and sentiment distribution with beautiful, interactive charts.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to actionable insights
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-3">Enter Product URL</h3>
            <p className="text-muted-foreground">
              Simply paste the URL of your product or enter review text directly.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Analyzes Reviews</h3>
            <p className="text-muted-foreground">
              Our AI processes all reviews and extracts sentiment patterns.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Sentiment Insights</h3>
            <p className="text-muted-foreground">
              Receive detailed analytics with actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground">
            Trusted by companies worldwide
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card glass>
            <Quote className="w-8 h-8 text-primary mb-4" />
            <p className="text-muted-foreground mb-4">
              "SentimentX helped us understand our customers better and improve our product based on real feedback."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Product Manager, TechCorp</p>
              </div>
            </div>
          </Card>
          
          <Card glass>
            <Quote className="w-8 h-8 text-primary mb-4" />
            <p className="text-muted-foreground mb-4">
              "The insights we gained from SentimentX were invaluable. It's like having a team of analysts at your fingertips."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
              <div>
                <p className="font-semibold">Michael Chen</p>
                <p className="text-sm text-muted-foreground">CEO, StartupXYZ</p>
              </div>
            </div>
          </Card>
          
          <Card glass>
            <Quote className="w-8 h-8 text-primary mb-4" />
            <p className="text-muted-foreground mb-4">
              "Easy to use and incredibly powerful. SentimentX transformed how we approach customer feedback."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
              <div>
                <p className="font-semibold">Emily Rodriguez</p>
                <p className="text-sm text-muted-foreground">Marketing Director, GrowthCo</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card glass className="text-center py-16">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of companies using SentimentX to understand their customers
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg">
              Start Free Trial
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
