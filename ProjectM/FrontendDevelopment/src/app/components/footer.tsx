import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-xl mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SentimentX
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              AI-powered sentiment analysis for product reviews.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <div className="flex flex-col gap-2">
              <Link to="/features" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Features
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                About
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="flex flex-col gap-2">
              <Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Contact
              </Link>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Terms
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground text-sm">
          © 2026 SentimentX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
