"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Plus } from "lucide-react";
import Link from "next/link";

// Types
interface FAQ {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

// FAQ Item Component
const FAQItem: React.FC<{
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gray-100 p-2">
    <button
      onClick={onToggle}
      className="w-full py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <HelpCircle className="w-4 h-4 text-blue-500" />
        </div>
        <span className="text-gray-700 text-left">{faq.question}</span>
      </div>
      <ChevronDown
        className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    {isOpen && (
      <div className="pl-9 pr-4 pb-4">
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    )}
  </div>
);

// Main FAQ Page Component
const FAQPage: React.FC = () => {
  // Sample FAQ data
  const initialFAQs: FAQ[] = [
    {
      id: "1",
      question: "How do I contact customer support for card issues?",
      answer:
        "You can contact our customer support team 24/7 through our helpline at 1-800-SUPPORT or via email at support@example.com. Our team typically responds within 1-2 business hours.",
    },
    {
      id: "2",
      question: "How long does it take to receive my physical card?",
      answer:
        "After your card application is approved, it typically takes 5-7 business days for your physical card to arrive. Delivery times may vary based on your location.",
    },
    // Add more FAQs as needed
  ];

  // Repeat the FAQs to match the screenshot
  const extendedFAQs = [
    ...initialFAQs,
    ...initialFAQs,
    ...initialFAQs,
    ...initialFAQs,
    ...initialFAQs,
  ];

  const [faqs, setFaqs] = useState<FAQ[]>(extendedFAQs);
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());

  const toggleFAQ = (id: string) => {
    setOpenFAQs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full h-full mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <h1 className="text-lg font-medium text-gray-900">
            Frequently Asked Questions
          </h1>
        </div>
        <Link href={`/dashboard/support/faq-and-resources/create`}>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add FAQs</span>
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {faqs.map((faq,index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openFAQs.has(faq.id)}
            onToggle={() => toggleFAQ(faq.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
