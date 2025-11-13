'use server';

import { revalidatePath } from "next/cache";
import { Payroll } from "./types";
import { openAIClient, supabase } from "./utils";

const sample = {
  "uuid": "payroll-2025-jan-001",
  "month": "January",
  "company": "TechCorp Inc",
  "year": 2025,
  "employee_count": 1,
  "total": 6250,
  "status": "Processed",
  "payroll_lines": [
    {
      "emp_code": "EMP001",
      "emp_name": "John Smith",
      "department": "Engineering",
      "position": "Software Engineer",
      "base_salary": "7500",
      "net_salary": "6250",
      "bank_account": "ACC001234567",
      "bank_name": "City Bank",
      "email": "john.smith@company.com",
      "tax_id": "TAX001234",
      "payroll_uuid": "payroll-2025-jan-001",
      "deductions": [
        {
          "deduction_id": "DED001",
          "emp_code": "EMP001",
          "deduction_type": "PAYE",
          "description": "Pay As You Earn Tax",
          "amount": 1250,
          "frequency": "Monthly",
          "start_date": "2020-03-15",
          "end_date": null,
          "is_active": "Yes",
          "tax_deductible": "No"
        }
      ],
      "leaves": [
        {
          "leave_id": "LV001",
          "emp_code": "EMP001",
          "leave_type": "Vacation",
          "start_date": "2025-01-10",
          "end_date": "2025-01-14",
          "total_days": 5,
          "status": "Approved",
          "reason": "Summer vacation",
          "applied_date": "2024-12-15",
          "approved_by": "HR Manager",
          "approval_date": "2024-12-20"
        }
      ]
    }
  ]
};

export async function runPayroll(
    data: {  
        month: string;
        company: string
        year: string;
        currency: string;
        employees: string;
        deductions: string;
        leaves: string;
    }) : Promise<{
        payrollId: string | null, 
        error: string | null
    }>{
    try {
        console.log('[PRASED DATA]::', data);
        const payrollUUID = crypto.randomUUID()
        var response = await openAIClient.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a payroll generator. Use the provided sample payroll JSON structure and the user inputs to generate a complete payroll JSON that follows the exact same schema."
                },
                {
                    role: "user",
                    content: `Generate a payroll JSON for:\nMonth: ${data.month}\nYear: ${data.year}\nCompany: ${data.company}\nCurrency: ${data.currency}\nEmployees data: ${data.employees}\nDeductions data: 
                    ${data.deductions}\nLeaves data: ${data.leaves}\n\ Return this sample structure and do not make up any data:\n${JSON.stringify(sample, null, 2)}, The uuid for this payroll is ${payrollUUID}`
                }
            ],
            model: "gpt-4o-mini",
            response_format: { type: "json_object" }
        })
        console.log('Completed the OpenAi chat call ........ ');
        
        const raw = response.choices[0]?.message?.content;
        console.log('[runPayroll] Raw AI response:', raw);
        if (!raw) throw new Error("Empty AI response");

        const parsed = JSON.parse(raw);
        console.log('[runPayroll] Parsed AI response:', parsed);
        // ensure it matches the Payroll type shape
        const payroll: Payroll = parsed;
        const header = {
            "uuid": payroll.uuid,
            "month": payroll.month,
            "company": payroll.company,
            "year": payroll.year,
            "employee_count": payroll.employee_count,
            "total": payroll.total,
            "status": payroll.status,
        };
        console.log('[runPayroll] Payroll header to insert:', header);

        const { error: headerError } = await supabase.from('payroll').insert(header);
        if (headerError) {
            console.error('[runPayroll] Error inserting payroll header:', headerError);
            throw headerError;
        }
        console.log('[runPayroll] Payroll header inserted successfully');

        const { error: linesError } = await supabase.from('payroll_lines').insert(payroll.payroll_lines);
        if (linesError) {
            console.error('[runPayroll] Error inserting payroll lines:', linesError);
            throw linesError;
        }
        console.log('[runPayroll] Payroll lines inserted successfully');
        revalidatePath('/')
        return { error: null, payrollId: payroll.uuid };
    } catch (error: any) {
        console.log(error);
        
        return {error: error.toString(), payrollId: null}
    }
}