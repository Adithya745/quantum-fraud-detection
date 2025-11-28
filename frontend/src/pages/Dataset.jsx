import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowDown, Filter, Database, Scale, CheckCircle } from 'lucide-react';

const Dataset = () => {
  const data = [
    { name: 'Legitimate', value: 284315, color: '#1f77b4' }, // Quantum Blue
    { name: 'Fraudulent', value: 492, color: '#ff7f0e' },   // Warning Orange
  ];

  const pipelineSteps = [
    { 
      icon: Database, 
      title: "Raw Data Ingestion", 
      desc: "Loading creditcard.csv (284,807 rows)" 
    },
    { 
      icon: Filter, 
      title: "Data Cleaning", 
      desc: "Removing duplicates & null values" 
    },
    { 
      icon: Scale, 
      title: "Undersampling", 
      desc: "Balancing classes to 1:1 ratio for training" 
    },
    { 
      icon: ArrowDown, 
      title: "Dimensionality Reduction", 
      desc: "PCA: Reducing 30 features to 8 principal components" 
    },
    { 
      icon: CheckCircle, 
      title: "Train/Test Split", 
      desc: "80% Training, 20% Testing" 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dataset Analysis</h2>
        <p className="text-muted-foreground mt-2">
          Understanding the Credit Card Fraud Detection dataset structure and preprocessing pipeline.
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">284,807</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fraudulent Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">492</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Legitimate Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">284,315</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Imbalance Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">577:1</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Class Distribution Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Class Distribution</CardTitle>
            <CardDescription>Extreme imbalance in original dataset</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Preprocessing Pipeline</CardTitle>
            <CardDescription>Steps taken to prepare data for Quantum & Classical models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pipelineSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <step.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold leading-none">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="bg-muted/30 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Why is Imbalance a Challenge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In fraud detection, legitimate transactions vastly outnumber fraudulent ones (99.83% vs 0.17%). 
            Standard models trained on this data would achieve 99.83% accuracy by simply predicting "Legitimate" for every transaction, 
            failing to detect any fraud. We use <strong>Undersampling</strong> and <strong>SMOTE</strong> techniques to balance the training set, 
            allowing models to learn the characteristics of fraud effectively.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dataset;
