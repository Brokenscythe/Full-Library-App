/* import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//CHATGPT generisao, nisam jos testirala

async function main() {
    // Seed UserType
    const userTypes = await prisma.userType.createMany({
        data: [
            { name: 'Admin' },
            { name: 'User' },
        ],
    });

    // Seed UserGender
    const userGenders = await prisma.userGender.createMany({
        data: [
            { name: 'Male' },
            { name: 'Female' },
            { name: 'Other' },
        ],
    });

    // Seed Category
    const categories = await prisma.category.createMany({
        data: [
            { name: 'Fiction', description: 'Fiction books' },
            { name: 'Non-Fiction', description: 'Non-Fiction books' },
        ],
    });

    // Seed Letter
    const letters = await prisma.letter.createMany({
        data: [
            { name: 'A' },
            { name: 'B' },
        ],
    });

    // Seed Language
    const languages = await prisma.language.createMany({
        data: [
            { name: 'English' },
            { name: 'Spanish' },
        ],
    });

    // Seed Binding
    const bindings = await prisma.binding.createMany({
        data: [
            { name: 'Hardcover' },
            { name: 'Paperback' },
        ],
    });

    // Seed Format
    const formats = await prisma.format.createMany({
        data: [
            { name: 'Standard' },
            { name: 'Large Print' },
        ],
    });

    // Seed Author
    const authors = await prisma.author.createMany({
        data: [
            { nameSurname: 'J.K. Rowling', biography: 'Author of Harry Potter series', photo:"", wikipedia:"" },
            { nameSurname: 'George Orwell', biography: 'Author of 1984', photo:"", wikipedia:"" },
        ],
    });

    // Seed Publisher
    const publishers = await prisma.publisher.createMany({
        data: [
            { name: 'Penguin' },
            { name: 'HarperCollins' },
        ],
    });

    // Seed Genre
    const genres = await prisma.genre.createMany({
        data: [
            { name: 'Fantasy' },
            { name: 'Dystopian' },
        ],
    });

    // Seed BookStatus
    const bookStatuses = await prisma.bookStatus.createMany({
        data: [
            { status: 'Available' },
            { status: 'Rented' },
        ],
    });

    // Seed RentStatus
    const rentStatuses = await prisma.rentStatus.createMany({
        data: [
            { bookStatusId: 1 },
            { bookStatusId: 2 },
        ],
    });

    // Seed CancellationReason
    const cancellationReasons = await prisma.cancellationReason.createMany({
        data: [
            { name: 'User Cancelled' },
            { name: 'Book Unavailable' },
        ],
    });

    // Seed ReservationStatus
    const reservationStatuses = await prisma.reservationStatus.createMany({
        data: [
            { name: 'Pending' },
            { name: 'Confirmed' },
        ],
    });

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
 */