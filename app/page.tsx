import { Button } from "@radix-ui/themes";

type Payroll = {
  id: string;
  month: string;
  year: number;
  payrollNumber: string;
  employeeCount: number;
  totalAmount: number;
  status: 'draft' | 'paid' | 'processing';
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default async function Home() {

  const samplePayrolls: Payroll[] = [
    {
      id: '1',
      month: 'March',
      year: 2024,
      payrollNumber: '2024-03',
      employeeCount: 24,
      totalAmount: 128450,
      status: 'paid',
      paidAt: new Date('2024-03-31'),
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-31'),
    },
    {
      id: '2',
      month: 'February',
      year: 2024,
      payrollNumber: '2024-02',
      employeeCount: 22,
      totalAmount: 115200,
      status: 'paid',
      paidAt: new Date('2024-02-28'),
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-28'),
    },
    {
      id: '3',
      month: 'January',
      year: 2024,
      payrollNumber: '2024-01',
      employeeCount: 25,
      totalAmount: 132100,
      status: 'paid',
      paidAt: new Date('2024-01-31'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-31'),
    },
  ];
  
  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-purple-100 to-purple-300">
      {/* Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-9 to-purple-10 px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-purple-500 sm:text-5xl lg:text-6xl">
            RX Payroll
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Effortlessly manage your payroll with AI-powered automation, ensuring speed, accuracy, and intelligent insights for every pay run.
              Join thousands of people that trust us to handle their payroll with zero errors and maximum efficiency.
          </p>
          <div className="mt-8">
            <button className="p-5 bg-purple-800 text-white font-bold cursor-pointer rounded w-100">
              Run New Payroll
            </button>
          </div>
        </div>
      </div>

      {/* Recent Payrolls Section */}
      <div className="mx-auto max-w-5xl py-12 sm:px-8">
        <h2 className="text-2xl font-bold mb-2">Recent Payrolls</h2>

        <div className="flex flex-row flex-wrap gap-5">
          {samplePayrolls.map((payroll) => (
            <div key={payroll.id} className="rounded-xl bg-white p-6 shadow-md ring-1 ring-purple-400 transition hover:shadow-lg w-110">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-11">{payroll.month} {payroll.year}</span>
                <span className="rounded-full bg-purple-300 px-2 py-1 text-xs font-semibold text-purple-120 capitalize">
                  {payroll.status}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-purple-120">Payroll #{payroll.payrollNumber}</h3>
              <p className="mt-2 text-sm ">
                {payroll.employeeCount} employees • ${payroll.totalAmount.toLocaleString()} total
              </p>
              <div className="mt-5 flex justify-end gap-4 ">
                <button className="rounded-md bg-purple-500 px-5 py-2 font-medium text-sm text-white hover:bg-purple-800">
                  View
                </button>
                <button className="rounded-md bg-purple-300 px-3 py-2 font-medium text-sm text-purple-12 hover:bg-purple-400">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 z-10  py-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <p className="text-sm">&copy; {new Date().getFullYear()} RX Payroll. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://x.com/muchirajunior" target="_" className="text-sm flex hover:text-purple-900 items-center">
              <span className="me-2"> MUCHIRA JUNIOR</span>
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
