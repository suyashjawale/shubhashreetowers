import { Earnings } from "./earnings";
import { Expenses } from "./expenses";
import { Maintenance } from "./maintenance";
import { Savings } from "./savings";

export interface MonthData {
    key: string,
    month_name: string,
    maintenance: Maintenance[],
    earnings: Earnings[],
    expenses: Expenses[],
    savings: Savings,
    date: String
}
