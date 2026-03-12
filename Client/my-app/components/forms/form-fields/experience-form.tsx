'use client';

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ExperienceFormProps {
  selectedFields: string[];
  onBack: () => void;
}

export default function ExperienceForm({ selectedFields, onBack }: ExperienceFormProps) {
  const [experience, setExperience] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (experience) {
      setSubmitted(true);
      // Handle form submission here
      setTimeout(() => {
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-background p-8 rounded-lg border border-border h-fit">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Your Experience
          </h1>
          <p className="text-sm text-muted-foreground">
            Select your years of experience in your chosen specializations
          </p>
        </div>

        {/* Selected Fields Summary */}
        <div className="mb-6 p-4 rounded-lg bg-purple-50 border border-purple-200">
          <p className="text-xs font-medium text-purple-700 mb-2">Selected Specializations:</p>
          <div className="flex flex-wrap gap-2">
            {selectedFields.map((field) => (
              <span
                key={field}
                className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-medium"
              >
                {field}
              </span>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience Field */}
          <div className="space-y-2">
            <label className="block font-medium text-sm text-foreground">
              Years of Experience
            </label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger className={cn(
                'w-full h-12 px-4 rounded-lg border-2 transition-all duration-200',
                'border-border hover:border-purple-300',
                'focus:border-purple-500 focus:ring-2 focus:ring-purple-200',
                'data-[state=open]:border-purple-500 data-[state=open]:ring-2 data-[state=open]:ring-purple-200',
                'bg-card text-foreground'
              )}>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-border bg-card shadow-lg">
                <SelectItem
                  value="0-5"
                  className={cn(
                    'py-3 px-4 cursor-pointer transition-colors duration-150',
                    'hover:bg-purple-100 hover:text-purple-700',
                    'focus:bg-purple-100 focus:text-purple-700',
                    'data-[state=checked]:bg-purple-100 data-[state=checked]:text-purple-700 data-[state=checked]:font-medium'
                  )}
                >
                  0-5 years
                </SelectItem>
                <SelectItem
                  value="5-10"
                  className={cn(
                    'py-3 px-4 cursor-pointer transition-colors duration-150',
                    'hover:bg-purple-100 hover:text-purple-700',
                    'focus:bg-purple-100 focus:text-purple-700',
                    'data-[state=checked]:bg-purple-100 data-[state=checked]:text-purple-700 data-[state=checked]:font-medium'
                  )}
                >
                  5-10 years
                </SelectItem>
                <SelectItem
                  value="10+"
                  className={cn(
                    'py-3 px-4 cursor-pointer transition-colors duration-150',
                    'hover:bg-purple-100 hover:text-purple-700',
                    'focus:bg-purple-100 focus:text-purple-700',
                    'data-[state=checked]:bg-purple-100 data-[state=checked]:text-purple-700 data-[state=checked]:font-medium'
                  )}
                >
                  10+ years
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={!experience || submitted}
              className={cn(
                'w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200',
                'bg-purple-600 hover:bg-purple-700 text-white',
                'disabled:bg-purple-300 disabled:cursor-not-allowed',
                submitted && 'bg-green-600 hover:bg-green-600'
              )}
            >
              {submitted ? '✓ Submitted' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
