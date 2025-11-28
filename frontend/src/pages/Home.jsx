import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, ShieldCheck, Database, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { label: "Total Transactions", value: "284,807", icon: Activity, color: "text-blue-500" },
    { label: "Fraud Rate", value: "0.172%", icon: ShieldCheck, color: "text-red-500" },
    { label: "Features Reduced", value: "30 → 8", icon: Database, color: "text-green-500" },
    { label: "Models Compared", value: "4", icon: GitBranch, color: "text-purple-500" },
  ];

  const pipelineSteps = [
    { title: "Data Preprocessing", desc: "Scaling & Sampling" },
    { title: "Feature Selection", desc: "PCA & Correlation" },
    { title: "Quantum Encoding", desc: "ZZFeatureMap" },
    { title: "Classification", desc: "VQC vs Classical" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-background to-background border border-primary/10 p-8 md:p-12 text-center md:text-left">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Quantum-Enhanced <br /> Fraud Detection
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            A production-ready system leveraging Quantum Machine Learning (QML) to detect fraudulent transactions with high precision. 
            Comparing Classical algorithms against Variational Quantum Classifiers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/dataset">
              <Button size="lg" className="gap-2">
                Explore Dataset <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/quantum">
              <Button size="lg" variant="secondary" className="gap-2">
                View Quantum Model <AtomIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-primary/10 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Flowchart */}
      <Card>
        <CardHeader>
          <CardTitle>Project Pipeline</CardTitle>
          <CardDescription>End-to-end workflow from raw data to prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 py-8">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 hidden md:block" />
            
            {pipelineSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-background p-4 rounded-xl border border-border w-full md:w-48 z-10 shadow-sm">
                <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-3">
                  {index + 1}
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AtomIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="1" />
    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
  </svg>
);

export default Home;
