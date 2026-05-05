import { HRProcessor, Developer, VolunteerWorker } from '../src/refactored/employeeManager';
import { FullTimeCompensation, VolunteerCompensation } from '../src/refactored/services';
import { IDatabaseService, IEmailService } from '../src/interfaces';

describe('HRProcessor (SOLID Refactored)', () => {
    let mockDb: IDatabaseService;
    let mockMailer: IEmailService;
    let hrProcessor: HRProcessor;

    beforeEach(() => {
        mockDb = { save: jest.fn() };
        mockMailer = { sendEmail: jest.fn() };
        hrProcessor = new HRProcessor(mockDb, mockMailer);
    });

    it('should process full-time employee payroll correctly', () => {
        const calc = new FullTimeCompensation();
        const dev = new Developer('Alice', 'alice@test.com', calc);

        hrProcessor.processPayroll(dev);

        expect(mockDb.save).toHaveBeenCalledWith({ name: 'Alice', payout: 3000 });
        expect(mockMailer.sendEmail).toHaveBeenCalledWith('alice@test.com', expect.stringContaining('salary of $3000'));
    });

    it('should process volunteer payroll without throwing errors (LSP compliance)', () => {
        const calc = new VolunteerCompensation();
        const volunteer = new VolunteerWorker('Bob', 'bob@test.com', calc);

        // Раніше це викликало б Error. Тепер це працює поліморфно.
        expect(() => hrProcessor.processPayroll(volunteer)).not.toThrow();

        expect(mockDb.save).toHaveBeenCalledWith({ name: 'Bob', payout: 0 });
        expect(mockMailer.sendEmail).toHaveBeenCalledWith('bob@test.com', expect.stringContaining('Thank you for your invaluable'));
    });
});