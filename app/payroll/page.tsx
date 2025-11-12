"use client";

import Link from "next/link";
import { useState } from "react";

export default function PayrollStepsView() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Payroll Headers", key: "headers" },
    { label: "Employee Details", key: "employees" },
    { label: "Deductions Details", key: "deductions" },
    { label: "Leaves Details", key: "leaves" },
    { label: "Confirm & Submit", key: "confirm" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const renderStepContent = () => {
    switch (steps[currentStep].key) {
      case "headers":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-800">Payroll Headers</h3>
            <p className="text-gray-600">Configure payroll period, currency, and company details.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Payroll Period (e.g., Jan 2025)"
                className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>USD</option>
                <option>EUR</option>
                <option>KSH</option>

              </select>
            </div>
          </div>
        );
      case "employees":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-800">Employee Details Upload</h3>
            <p className="text-gray-600">Upload employee data via CSV or Excel.</p>
            <label className="block">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                accept=".csv,.xlsx"
                className="block w-full text-sm text-purple-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
              />
            </label>
          </div>
        );
      case "deductions":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-800">Deductions Details Upload</h3>
            <p className="text-gray-600">Upload deductions such as taxes, loans, or advances.</p>
            <label className="block">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                accept=".csv,.xlsx"
                className="block w-full text-sm text-purple-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
              />
            </label>
          </div>
        );
      case "leaves":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-800">Leaves Details Upload</h3>
            <p className="text-gray-600">Upload leave records for accurate salary calculation.</p>
            <label className="block">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                accept=".csv,.xlsx"
                className="block w-full text-sm text-purple-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
              />
            </label>
          </div>
        );
      case "confirm":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-800">Confirm & Submit</h3>
            <p className="text-gray-600">Review all uploaded data before final submission.</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Payroll Headers: Configured</li>
              <li>Employee Details: Uploaded</li>
              <li>Deductions: Uploaded</li>
              <li>Leaves: Uploaded</li>
            </ul>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg">
              Submit Payroll
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 py-6 h-full">
      <div className="max-w-7xl mx-auto  my-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
        <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-purple-800 mb-6">Payroll Processing</h1>
            <Link className="bg-purple-100 h-10 px-4 text-center py-2 rounded-lg shadow" href='/'>Exit Process</Link>
        </div>
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center flex-1">
              <button
                onClick={() => handleStepClick(index)}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors cursor-pointer ${
                  index <= currentStep
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-white border-purple-300 text-purple-600"
                }`}
              >
                {index + 1}
              </button>
              <span className="ml-2 text-sm font-medium text-purple-700">{step.label}</span>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    index < currentStep ? "bg-purple-600" : "bg-purple-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-purple-50 rounded-xl p-6 mb-6">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentStep === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentStep === steps.length - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
