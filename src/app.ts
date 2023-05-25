import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { UserMemoryRepository } from './UserMemoryRepository';
import { UserEntityService } from './UserEntityService';
import { UserRestController } from './UserRestController';

export class Application {
    protected variables: {
        [key: string]: string | undefined;
    };

    constructor(variables: {
        [key: string]: string | undefined;
    }) {
        this.variables = variables;
    }

    public async start(): Promise<void> {
        const express = Express();
        const port = this.variables.APP_PORT ? parseInt(this.variables.APP_PORT) : 3000;

        const repository = new UserMemoryRepository();
        const entityService = new UserEntityService(repository);
        const controller = new UserRestController(entityService);

        express.use(cors());
        express.use(bodyParser.json());
        express.use(controller.createRouter());

        express.listen(port, () => {
            console.log('Listening on port: ' + port.toString());
        });
    }
}

const application = new Application(process.env);
// eslint-disable-next-line @typescript-eslint/no-floating-promises
application.start();
