import Link from "next/link";
import { Payroll } from "./utils/types";
import { supabase } from "./utils/utils";
import { getPayrollReport } from "./utils/services";

export default async function Home() {
  const { data: payrolls, error } = await supabase.from('payroll').select< string, Payroll>();

  const report = await getPayrollReport();

  console.log(report);
  

  
  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-purple-100 to-purple-300">
      {/* Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-9 to-purple-10 px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-purple-500 sm:text-5xl lg:text-6xl">
            RX Payroll
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Effortlessly manage your payroll with AI-powered automation, ensuring speed, accuracy, and intelligent insights for every pay run.
              Join thousands of people that trust us to handle their payroll with zero errors and maximum efficiency.
          </p>
          {/* Report Summary Card */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-lg ring-1 ring-purple-200">
              <p className="text-sm text-purple-700 font-medium">Total Cost</p>
              <p className="text-2xl font-bold text-purple-900">${report.total_cost.toLocaleString()}</p>
            </div>
            <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-lg ring-1 ring-purple-200">
              <p className="text-sm text-purple-700 font-medium">Payroll Count</p>
              <p className="text-2xl font-bold text-purple-900">{report.payroll_count}</p>
            </div>
            <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-lg ring-1 ring-purple-200">
              <p className="text-sm text-purple-700 font-medium">Total Employees</p>
              <p className="text-2xl font-bold text-purple-900">{report.total_employees}</p>
            </div>
          </div>
          <br />
          <br />
          <Link className="px-10 py-4 bg-purple-800 text-white font-bold cursor-pointer rounded" href='/payroll'>
            Run New Payroll
          </Link>
        </div>
      </div>

      {/* Recent Payrolls Section */}
      <div className="mx-auto max-w-5xl py-5">
        <h2 className="text-2xl font-bold mb-2">Recent Payrolls</h2>

       { error && <div className="p-3 border border-red-500 bg-red-100 text-red-800 rounded"> {error.message} </div>}

        <div className="flex flex-row flex-wrap justify-between gap-5">
          {
            !error &&  payrolls.map((payroll) => (
            <div key={crypto.randomUUID()} className="rounded-xl bg-white p-6 shadow-md ring-1 ring-purple-400 transition hover:shadow-lg w-120">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-11">{payroll.month} {payroll.year}</span>
                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-120 capitalize">
                  {payroll.status}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-purple-120">Payroll #{payroll.company}</h3>
              <p className="mt-2 text-sm ">
                {payroll.employee_count} employees • ${payroll.total?.toLocaleString()} total
              </p>
              <div className="mt-5 flex justify-end gap-4 ">
                <Link 
                  href={`payroll/${payroll.uuid}`}
                  className="rounded-md bg-purple-500 px-5 py-2 font-medium text-sm text-white hover:bg-purple-800">
                  View
                </Link>
                <button className="rounded-md bg-purple-300 px-3 py-2 font-medium text-sm text-purple-12 hover:bg-purple-400">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 z-10  py-4 px-6 mt-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <p className="text-sm">&copy; {new Date().getFullYear()} RX Payroll. All rights reserved.</p>
          <div className=" flex gap-4">
             <a href="https://github.com/muchirajunior/rxpayroll" target="_blank" rel="noopener noreferrer" className="text-sm flex hover:text-purple-900 items-center">
              <span className="me-2 font-bold">GitHub</span>
              <svg className="h-5 w-5 text-purple-120" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://x.com/muchirajunior" target="_" className="text-sm flex hover:text-purple-900 items-center">
              <span className="me-2 font-bold"> MUCHIRA JUNIOR</span>
              <svg className="h-5 w-5 text-purple-120" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
           
        </div>
        </div>
      </footer>

       
    </div>
  );
}
