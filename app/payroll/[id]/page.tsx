import { Payroll } from "@/app/utils/types";
import { supabase } from "@/app/utils/utils";
import { notFound } from "next/navigation";
import PayrollLineDetails from "./payroll_line_details";

export default async function PayrollDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: payroll, error } = await supabase
        .from('payroll')
        .select<string, Payroll>("*, payroll_lines(*)")
        .eq('uuid', id)
        .single();
    console.log(payroll);

    if(error != null) return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 py-6 h-full">
            <div className="bg-red-100 rounded max-w-4xl text-red-800 p-3">{error.message}</div>
        </div>
    );

     if(payroll == null) notFound();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 py-6">
            {/* Header Card */}
            <div className="max-w-6xl mx-auto px-4 mb-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{payroll.company} – {payroll.month} {payroll.year}</h1>
                            <p className="text-sm text-gray-500 mt-1">Payroll ID: {payroll.uuid}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Payroll</p>
                                <p className="text-2xl font-semibold text-purple-700">${payroll.total.toLocaleString()}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${payroll.status === 'Processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {payroll.status}
                            </span>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Employees</p>
                            <p className="font-semibold">{payroll.employee_count}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Year</p>
                            <p className="font-semibold">{payroll.year}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Month</p>
                            <p className="font-semibold">{payroll.month}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payroll Lines Table */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Employee Payroll Lines</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payroll.payroll_lines.map((line) => (
                                    <tr key={line.emp_code} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{line.emp_code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{line.emp_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{line.department}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{line.position}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(line.base_salary).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-700">${Number(line.net_salary).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{line.bank_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{line.bank_account}</td>
                                        <td> <PayrollLineDetails  payrollLine={line} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}