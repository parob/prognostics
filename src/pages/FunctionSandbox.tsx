
import React, { useState } from 'react';
import { Code, Play, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FunctionSandbox = () => {
  const [runtime, setRuntime] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    // Simulate function execution
    setTimeout(() => {
      setOutput('Function executed successfully!\nOutput: Hello from the sandbox');
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <Code className="h-8 w-8" />
            <span>Function Sandbox</span>
          </h1>
          <p className="text-slate-600">Test and debug your functions in a safe environment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Code Editor</CardTitle>
                <div className="flex space-x-2">
                  <Select value={runtime} onValueChange={setRuntime}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleRun} disabled={isRunning}>
                    <Play className="h-4 w-4 mr-1" />
                    {isRunning ? 'Running...' : 'Run'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={runtime === 'python' ? 'def main():\n    print("Hello, World!")\n    return "Success"' : 'function main() {\n    console.log("Hello, World!");\n    return "Success";\n}'}
                rows={20}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-green-400 p-4 rounded-md font-mono text-sm min-h-[400px]">
                {output || 'Click "Run" to execute your function...'}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save as Function
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FunctionSandbox;
