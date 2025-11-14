export type Payroll = {
  id: number | null;
  uuid: string | null;
  month: string | null;
  company: string | '';
  year: number | 2025;
  employee_count: number | 0;
  total: number | 0;
  status: string | null;
  created_at: Date | null ;
  updated_at: Date | null;
  can_delete: boolean | true;
  payroll_lines: PayrollLine[] | []
};

export type PayrollLine = {
  id: number | null;
  emp_code: string | null;
  emp_name: string | null;
  department: string | null;
  position: string | null;
  base_salary: string | null;
  net_salary: string | null;
  bank_account: string | null;
  bank_name: string | null;
  email: string | null;
  tax_id: string | null;
  deductions: Deduction[] | null;
  leaves: Leave[] | null;
  payroll_uuid: string | null;
  created_at: Date | null;
};


export type Leave = {
  leave_id: string | null;
  emp_code: string | null;
  leave_type: string | null;
  start_date: string | null;
  end_date: string | null;
  total_days: number | null;
  status: string | null;
  reason: string | null;
  applied_date: string | null;
  approved_by: string | null;
  approval_date: string | null;
};

export type Deduction = {
  deduction_id: string | null;
  emp_code: string | null;
  deduction_type: string | null;
  description: string | null;
  amount: number | null;
  frequency: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: string | null;
  tax_deductible: string | null;
};

export type PayrollReport = {
  payroll_count: number;
  total_employees: number;
  total_cost: number;
};
