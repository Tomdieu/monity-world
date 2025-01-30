"use client";

import React, { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

interface FormErrors {
  question?: string;
  answer?: string;
}

interface FormData {
  question: string;
  answer: string;
}

const FAQCreatePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    question: "",
    answer: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isQuestionExpanded, setIsQuestionExpanded] = useState(true);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = "Question is required";
    } else if (formData.question.length < 10) {
      newErrors.question = "Question must be at least 10 characters long";
    }

    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required";
    } else if (formData.answer.length < 20) {
      newErrors.answer = "Answer must be at least 20 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const router = useRouter();

  return (
    <div className="w-full h-full mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-medium">Add FAQs</h1>
          </div>
          <Button
            variant="default"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Done
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-4">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="w-full flex items-center justify-between gap-2">
                  <div className="flex w-full items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <input
                      type="text"
                      name="question"
                      placeholder="Enter question here"
                      value={formData.question}
                      onChange={handleInputChange}
                      className="flex-1 w-full focus:outline-none placeholder-gray-400"
                    />
                  </div>
                  <Button
                    type="button"
                    size={"icon"}
                    className="rounded-full"
                    variant={"ghost"}
                    onClick={() => setIsQuestionExpanded(!isQuestionExpanded)}
                  >
                    {isQuestionExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              {errors.question && (
                <Alert variant="destructive" className="m-2">
                  <AlertDescription>{errors.question}</AlertDescription>
                </Alert>
              )}
              {isQuestionExpanded && (
                <div className="p-4 relative">
                  {/* Edit button at bottom-right corner */}
                  <div className="absolute bottom-6 right-6">
                    <Button
                      variant="outline"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Edit
                    </Button>
                  </div>
                  <textarea
                    name="answer"
                    placeholder="Enter Answer here"
                    value={formData.answer}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  {errors.answer && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertDescription>{errors.answer}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default FAQCreatePage;
