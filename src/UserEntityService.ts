import { User } from './User';
import { UserMemoryRepository } from './UserMemoryRepository';

/**
 * A service for users that stores them in the repository.
 */
export class UserEntityService {
    private repository: UserMemoryRepository;

    constructor(repository: UserMemoryRepository) {
        this.repository = repository;
    }

    public async loadItemById(id: number): Promise<User | null> {
        return this.repository.findItemById(id);
    }

    public async loadAllItems(): Promise<User[]> {
        return this.repository.findAllItems();
    }

    public async insertItem(item: User): Promise<void> {
        if (item.id) {
            throw new Error('item.id must not be set.')
        }
        const date = new Date();
        item.createdAt = date;
        item.updatedAt = date;

        this.repository.insertItem(item);
    }

    public async updateItem(item: User): Promise<void> {
        if (!item.id) {
            throw new Error('item.id is required.');
        }
        item.updatedAt = new Date();

        this.repository.updateItem(item);
    }

    public async deleteItemById(id: number): Promise<void> {
        this.repository.deleteItemById(id);
    }
}