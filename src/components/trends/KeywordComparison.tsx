import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface KeywordComparisonProps {
  onCompare: (keywords: string[]) => void;
}

const KeywordComparison = ({ onCompare }: KeywordComparisonProps) => {
  const [keywords, setKeywords] = useState<string[]>(['']);
  
  console.log("Current keywords:", keywords);

  const addKeyword = () => {
    if (keywords.length < 5) {
      setKeywords([...keywords, '']);
    }
  };

  const removeKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
    onCompare(newKeywords);
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = keywords.map((k, i) => i === index ? value : k);
    setKeywords(newKeywords);
    onCompare(newKeywords);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Compare Keywords</h3>
        {keywords.length < 5 && (
          <Button
            variant="outline"
            size="sm"
            onClick={addKeyword}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Keyword
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        {keywords.map((keyword, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={keyword}
              onChange={(e) => updateKeyword(index, e.target.value)}
              placeholder={`Keyword ${index + 1}`}
              className="flex-1"
            />
            {keywords.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeKeyword(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordComparison;