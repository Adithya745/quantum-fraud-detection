import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

const Insights = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Key Insights & Findings</h2>
        <p className="text-muted-foreground mt-2">
          Analysis of Quantum vs Classical approaches in fraud detection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quantum Advantages */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Quantum Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm"><strong>High-Dimensional Feature Mapping:</strong> Quantum kernels can map data into spaces inaccessible to classical kernels, potentially identifying complex fraud patterns.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Fewer Parameters:</strong> VQC models often require fewer trainable parameters than deep neural networks for similar tasks.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Future Scalability:</strong> As quantum hardware improves (more qubits, less noise), performance is expected to surpass classical limits.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Classical Strengths */}
        <Card className="border-l-4 border-l-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              Classical Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Speed & Efficiency:</strong> Classical models (XGBoost, RF) train in seconds compared to minutes/hours for quantum simulations.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Proven Reliability:</strong> Ensemble methods like Random Forest are extremely robust against overfitting on tabular data.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Scalability Today:</strong> Can easily handle millions of transactions without hardware constraints.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="bg-muted/20">
        <CardHeader>
          <CardTitle>Recommendations & Future Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2 text-primary">For Production Deployment</h4>
            <p className="text-sm text-muted-foreground">
              Currently, <strong>XGBoost</strong> remains the best choice for immediate production deployment due to its superior accuracy (99.3%) and inference speed. 
              The Quantum model shows promise but is currently limited by simulation overhead and noise in real hardware.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 text-primary">For Research Exploration</h4>
            <p className="text-sm text-muted-foreground">
              Continue investigating <strong>Quantum Kernel Methods</strong> (QSVM) as they may offer better theoretical advantages than VQC for this specific type of structured data. 
              Focus on feature selection to reduce qubit requirements further.
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Next Steps
            </h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Implement error mitigation strategies for real quantum hardware tests.</li>
              <li>Explore hybrid neural networks (Quantum layer + Classical layers).</li>
              <li>Increase dataset size for quantum training using better encoding schemes.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
