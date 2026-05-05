import { IDatabaseService, IEmailService, ICompensationCalculator } from '../interfaces';

// Реалізації для DIP
export class PostgresDatabase implements IDatabaseService {
    save(data: any): void {
        console.log("Saved to Postgres DB:", data);
    }
}

export class SmtpEmailService implements IEmailService {
    sendEmail(address: string, message: string): void {
        console.log(`Sent email to ${address}: ${message}`);
    }
}

// Реалізації для OCP: Легко додавати нові типи нарахувань
export class FullTimeCompensation implements ICompensationCalculator {
    calculate(): number { return 3000; } // Фіксована ставка
}

export class ContractorCompensation implements ICompensationCalculator {
    calculate(hours: number = 0): number { return hours * 20; } // Погодинна
}

export class VolunteerCompensation implements ICompensationCalculator {
    calculate(): number { return 0; } // Волонтери отримують 0, але без генерації помилок (LSP)
}