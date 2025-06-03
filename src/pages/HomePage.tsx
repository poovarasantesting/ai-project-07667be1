import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideArrowRight, LucideHome, LucideUsers, LucideSettings } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">Welcome to Our App</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A modern, responsive web application built with React and Tailwind CSS.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <LucideHome className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Easy to Use</CardTitle>
            <CardDescription>
              Our intuitive interface makes navigation simple and efficient.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Get started quickly with our streamlined workflow and helpful guides.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link to="/features">
                Learn more <LucideArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <LucideUsers className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Built for Teams</CardTitle>
            <CardDescription>
              Collaborate seamlessly with your team members in real-time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Share resources, assign tasks, and track progress together.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link to="/teams">
                Explore teams <LucideArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <LucideSettings className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Customizable</CardTitle>
            <CardDescription>
              Tailor the experience to match your specific needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Adjust settings, create custom workflows, and personalize your dashboard.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings">
                Configure now <LucideArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>

      <div className="text-center">
        <Button size="lg" asChild>
          <Link to="/get-started">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}