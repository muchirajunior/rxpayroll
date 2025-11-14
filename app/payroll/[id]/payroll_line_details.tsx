'use client';

import { PayrollLine } from "@/app/utils/types";
import { useState } from "react";

export default function PayrollLineDetails({payrollLine} : {payrollLine : PayrollLine}){
    const [showModal, setShowModal] =  useState(false);
    return(
        <div>
            {/* Button to open modal */}
            <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 w-40 me-3 font-bold"
            >
                View Details
            </button>
            {showModal && (
                <div className="fixed inset-10 z-50 flex items-center justify-center min-h-screen min-w-screen backdrop-blur-xs">
                    <div className="bg-white rounded-lg shadow-lg w-300 max-w-4xl p-6  opacity-100" id="PayrollDetailsModal">
                        
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Payroll Details</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-4xl"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Employee Info Card */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                                    {payrollLine.emp_name?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{payrollLine.emp_name}</h3>
                                    <p className="text-sm text-gray-600">{payrollLine.position} • {payrollLine.department}</p>
                                </div>
                            </div>
                        </div>

                        {/* Salary Overview */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-green-50 rounded-lg p-3">
                                <p className="text-xs text-green-600 font-medium">Base Salary</p>
                                <p className="text-lg font-semibold text-green-800">${Number(payrollLine.base_salary).toLocaleString()}</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3">
                                <p className="text-xs text-blue-600 font-medium">Net Salary</p>
                                <p className="text-lg font-semibold text-blue-800">${Number(payrollLine.net_salary).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Employee Code</span>
                                <span className="font-bold">{payrollLine.emp_code}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email</span>
                                <span className="font-bold">{payrollLine.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Bank</span>
                                <span className="font-bold">{payrollLine.bank_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Account</span>
                                <span className="font-bold">{payrollLine.bank_account}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax ID</span>
                                <span className="font-bold">{payrollLine.tax_id}</span>
                            </div>
                        </div>

                        {/* Deductions */}
                        {
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Deductions</h4>
                                <div className="space-y-2">
                                    {(payrollLine.deductions ?? []).map((d) => (
                                        <div key={d.deduction_id} className="flex justify-between items-center bg-red-50 rounded p-2">
                                            <div>
                                                <p className="font-medium text-sm">{d.description}</p>
                                                <p className="text-xs text-gray-600">{d.deduction_type} • {d.frequency}</p>
                                            </div>
                                            <span className="font-semibold text-red-700">${d.amount?.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                        {/* Leaves */}
                        {
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Recent Leaves</h4>
                                <div className="space-y-2">
                                    {(payrollLine.leaves ?? []) .map((l) => (
                                        <div key={l.leave_id} className="flex justify-between items-center bg-yellow-50 rounded p-2">
                                            <div>
                                                <p className="font-medium text-sm">{l.leave_type}</p>
                                                <p className="text-xs text-gray-600">{l.start_date} to {l.end_date} ({l.total_days} days)</p>
                                            </div>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded ${l.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {l.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                    </div>
                </div>
            )}
        </div>
    );
}