import { Router, Request, Response } from 'express';
import { UserEntityService } from './UserEntityService';

/**
 * This is a controller class that handles the REST API requests for the User entity.
 */
export class UserRestController {   
    private entityService: UserEntityService;

    constructor(entityService: UserEntityService) {
        this.entityService = entityService;
    }

    public createRouter(): Router {
        const router = Router();

        router.route(`/user`).get(this.indexAction.bind(this)).post(this.insertAction.bind(this));

        router
            .route(`/user/:id`)
            .get(this.detailAction.bind(this))
            .put(this.updateAction.bind(this))
            .delete(this.deleteAction.bind(this));

        return router;
    }

    public async indexAction(request: Request, response: Response): Promise<void> {
        console.log('User index called.');
        const items = await this.entityService.loadAllItems();

        response.json(items);
    }

    public async detailAction(request: Request, response: Response): Promise<void> {
        console.log('User detail called.', request.params.id);
        const item = await this.entityService.loadItemById(parseInt(request.params.id));

        response.json(item);
    }

    public async insertAction(request: Request, response: Response): Promise<void> {
        const item = request.body;
        console.log('User insert called.', item);
        await this.entityService.insertItem(item);

        response.json(item);
    }

    public async updateAction(request: Request, response: Response): Promise<void> {
        try {
            const item = request.body;
            console.log('User update called.', item);
            await this.entityService.updateItem(item);
    
            response.json(item);
        } catch (error) {
            response.statusCode = 400;
            response.json({
                message: error.message,
            });
        }
    }

    public async deleteAction(request: Request, response: Response): Promise<void> {
        console.log('User delete called.', request.params.id);
        await this.entityService.deleteItemById(parseInt(request.params.id))

        response.send();
    }
}