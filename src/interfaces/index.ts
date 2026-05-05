// ISP: Розділяємо обов'язки. Не всі працівники є менеджерами.
export interface IWorker {
    work(): string;
}

export interface IManager {
    attendManagementMeeting(): string;
}

// DIP: Абстракції для інфраструктури
export interface IDatabaseService {
    save(data: any): void;
}

export interface IEmailService {
    sendEmail(address: string, message: string): void;
}

// OCP: Абстракція для розрахунку компенсації
export interface ICompensationCalculator {
    calculate(hours?: number): number;
}