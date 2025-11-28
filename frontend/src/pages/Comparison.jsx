import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy } from 'lucide-react';

const Comparison = () => {
  const data = [
    { model: "Logistic Regression", accuracy: 0.942, f1: 0.941, auc: 0.96 },
    { model: "Random Forest", accuracy: 0.991, f1: 0.991, auc: 0.99 },
    { model: "XGBoost", accuracy: 0.993, f1: 0.993, auc: 0.99 },
    { model: "Quantum VQC", accuracy: 0.915, f1: 0.913, auc: 0.93 },
  ];

  const bestPerformers = [
    { metric: "Best Accuracy", model: "XGBoost", value: "99.3%" },
    { metric: "Best F1-Score", model: "XGBoost", value: "99.3%" },
    { metric: "Best ROC-AUC", model: "Random Forest", value: "0.99" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quantum vs Classical Comparison</h2>
        <p className="text-muted-foreground mt-2">
          Benchmarking the experimental Quantum model against established Classical baselines.
        </p>
      </div>

      {/* Best Performers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bestPerformers.map((item, index) => (
          <Card key={index} className="bg-gradient-to-br from-card to-muted border-primary/10">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.metric}</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{item.model}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Model Performance Overview</CardTitle>
          <CardDescription>Comparing key metrics across all models</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="model" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[0.8, 1]} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
              />
              <Legend />
              <Bar dataKey="accuracy" name="Accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1" name="F1-Score" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="auc" name="ROC-AUC" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>F1-Score</TableHead>
                <TableHead>ROC-AUC</TableHead>
                <TableHead>Training Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.model}>
                  <TableCell className="font-medium">{row.model}</TableCell>
                  <TableCell>{(row.accuracy * 100).toFixed(1)}%</TableCell>
                  <TableCell>{(row.f1 * 100).toFixed(1)}%</TableCell>
                  <TableCell>{row.auc}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.model.includes("Quantum") ? "~45 mins" : "< 1 min"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comparison;
