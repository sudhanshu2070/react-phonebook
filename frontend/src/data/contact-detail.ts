// src/contact-detail.ts
interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  jobTitle: string;
  company: string;
  dob: string;
}

export let contacts: Contact[] = [
  {
      id: 1,
      name: "Scott",
      phone: "9812238942",
      email: "scott.williams@example.com",
      address: "123 Main St, Springfield, IL",
      jobTitle: "Software Engineer",
      company: "Tech Solutions Inc.",
      dob: "1985-05-23"
    },
    {
      id: 2,
      name: "Peter",
      phone: "883292300348",
      email: "peter.parker@example.com",
      address: "456 Elm St, Queens, NY",
      jobTitle: "Photographer",
      company: "Daily Bugle",
      dob: "1990-10-10"
    },
    {
      id: 3,
      name: "Jessica",
      phone: "8743847638473",
      email: "jessica.jones@example.com",
      address: "789 Maple Ave, Hell's Kitchen, NY",
      jobTitle: "Private Investigator",
      company: "Alias Investigations",
      dob: "1987-04-12"
    },
    {
      id: 4,
      name: "Michael",
      phone: "0988765553",
      email: "michael.jordan@example.com",
      address: "101 Pine St, Chicago, IL",
      jobTitle: "Basketball Player",
      company: "Chicago Bulls",
      dob: "1963-02-17"
    },
    {
      id: 5,
      name: "Miguel",
      phone: "123456789",
      email: "miguel.rodriguez@example.com",
      address: "202 Oak St, Miami, FL",
      jobTitle: "Graphic Designer",
      company: "Creative Studio",
      dob: "1992-08-08"
    },
    {
      id: 6,
      name: "Tisca",
      phone: "8912389411",
      email: "tisca.chopra@example.com",
      address: "303 Cedar St, Los Angeles, CA",
      jobTitle: "Actress",
      company: "Hollywood Productions",
      dob: "1974-11-01"
    },
    {
      id: 7,
      name: "Jose",
      phone: "0912321771",
      email: "jose.garcia@example.com",
      address: "404 Birch St, San Antonio, TX",
      jobTitle: "Chef",
      company: "La Cocina",
      dob: "1980-03-05"
    },
    {
      id: 8,
      name: "Suraj",
      phone: "0917872311",
      email: "suraj@barjatya.com",
      address: "890 Kurla, Mumbai",
      jobTitle: "Producer",
      company: "SR Productions",
      dob: "1978-02-15"
    }
  ];
  
// Function to add a new contact
export const addContact = (contact: Omit<Contact, 'id'>): void => {
  const newId = Math.max(...contacts.map(contact => contact.id)) + 1;
  contacts.push({ id: newId, ...contact });
};