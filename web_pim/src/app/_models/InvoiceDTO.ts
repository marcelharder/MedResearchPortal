import { InvoiceShort } from './InvoiceShort';

export interface InvoiceDTO {
    Id: string;
    User_name: string;
    User_id: string;
    User_adres: string;
    User_company: string;
    User_bank:  string;
    User_phone:  string;
    User_email:  string;
    User_country: string;
    InvoiceDate:  Date;
    Paid: string;
    Currency:  string;
    InvoicesDetails: InvoiceShort [];
    Comments: string[];
    SubTotal: number;
    Total: number;
    Tax: number;
    TaxRate: number;
    }
    