// Порушення ISP: Інтерфейс вимагає реалізації методів, які стосуються лише керівників
export interface IEmployeeOperations {
    work(): void;
    attendManagementMeeting(): void;
}

// Порушення DIP: Клас вищого рівня жорстко залежить від конкретних реалізацій інфраструктури
class MongoDatabase {
    insert(data: any) { console.log("Saved to MongoDB: ", data); }
}

class SendGridEmail {
    send(email: string, msg: string) { console.log(`Email sent to ${email}: ${msg}`); }
}

// Порушення SRP: Клас займається розрахунком зарплати, записом у БД та відправкою листів
export class BadEmployeeManager implements IEmployeeOperations {
    private db = new MongoDatabase();
    private mailer = new SendGridEmail();

    public processEmployee(name: string, email: string, type: string, hours: number) {
        // Порушення OCP: Щоб додати новий тип співробітника (наприклад, фрілансера), доведеться змінювати цей метод
        let salary = 0;
        if (type === "fulltime") {
            salary = 3000;
        } else if (type === "contractor") {
            salary = hours * 20;
        } else {
            throw new Error("Unknown employee type");
        }

        const employeeData = { name, type, salary };

        this.db.insert(employeeData);
        this.mailer.send(email, `Your salary of $${salary} has been processed.`);
    }

    public work(): void {
        console.log("Doing regular work...");
    }

    public attendManagementMeeting(): void {
        console.log("Attending meeting..."); // Звичайним працівникам це не потрібно!
    }
}

// Порушення LSP: Нащадок ламає очікувану поведінку базового класу, викидаючи помилку там, де її не очікують
export class Volunteer extends BadEmployeeManager {
    public processEmployee(name: string, email: string, type: string, hours: number): void {
        throw new Error("Volunteers do not get paid! Cannot process salary.");
    }
}