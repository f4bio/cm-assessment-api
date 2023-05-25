import { User } from './User';

/**
 * A repository for users that stores them in memory.
 */
export class UserMemoryRepository {
    private nextId = 1;
    private entries: {[id: number]: User } = {};

    public async findItemById(id: number): Promise<User | null> {
        if (!this.entries[id]) {
            return null;
        }

        return this.entries[id];
    }

    public async findAllItems(): Promise<User[]> {
        return Object.values(this.entries);
    }

    public async insertItem(item: User): Promise<void> {
        item.id = this.nextId++;

        this.entries[item.id] = item;
    }
    
    public async updateItem(item: User): Promise<void> {
        this.entries[item.id] = item;
    }

    public async deleteItemById(id: number): Promise<void> {
        if (this.entries[id]) {
            return;
        }

        delete this.entries[id];
    }
}