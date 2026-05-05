import { IDatabaseService, IEmailService, ICompensationCalculator, IWorker } from '../interfaces';

// LSP: Базовий клас співробітника, який гарантує коректну поведінку
export abstract class Employee implements IWorker {
    constructor(
        public name: string,
        public email: string,
        public compensationCalc: ICompensationCalculator,
        public hoursWorked: number = 0
    ) {}

    abstract work(): string;

    // Спільний метод для безпечного розрахунку (задовольняє LSP)
    public getCompensation(): number {
        return this.compensationCalc.calculate(this.hoursWorked);
    }
}

export class Developer extends Employee {
    work(): string { return "Writing code..."; }
}

export class VolunteerWorker extends Employee {
    work(): string { return "Helping for free..."; }
}

// SRP: Менеджер лише координує процес (отримує зарплату, зберігає, повідомляє)
// DIP: Менеджер залежить від абстракцій (IDatabaseService, IEmailService)
export class HRProcessor {
    constructor(
        private db: IDatabaseService,
        private mailer: IEmailService
    ) {}

    public processPayroll(employee: Employee): void {
        const compensation = employee.getCompensation();

        const record = {
            name: employee.name,
            payout: compensation
        };

        this.db.save(record);

        if (compensation > 0) {
            this.mailer.sendEmail(employee.email, `Your salary of $${compensation} is processed.`);
        } else {
            this.mailer.sendEmail(employee.email, `Thank you for your invaluable volunteer work!`);
        }
    }
}