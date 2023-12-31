/*
        IWA-Express - Insecure Express JS REST API

        Copyright 2023 Open Text or one of its affiliates.

        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.

        You should have received a copy of the GNU General Public License
        along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import express from 'express';
import session from 'express-session';
import config from 'config';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";

import Logger from "../middleware/logger";
import morganConfig from './morgan.config'
// @ts-ignore
import swaggerOutput from './swagger_output.json';

import {siteRoutes} from "../routes/site.routes";
import {userRoutes} from "../routes/user.routes";
import {productRoutes} from "../routes/product.routes";
import {commonRoutes} from "../routes/common.routes";

class AppConfig {
    public app: express.Application;

    public apiVersion: string = config.get('App.apiConfig.version') || 'v1';
    public privateKey: string = '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQDNwqLEe9wgTXCbC7+RPdDbBbeqjdbs4kOPOIGzqLpXvJXlxxW8iMz0EaM4BKUqYsIa+ndv3NAn2RxCd5ubVdJJcX43zO6Ko0TFEZx/65gY3BE0O6syCEmUP4qbSd6exou/F+WTISzbQ5FBVPVmhnYhG/kpwt/cIxK5iUn5hm+4tQIDAQABAoGBAI+8xiPoOrA+KMnG/T4jJsG6TsHQcDHvJi7o1IKC/hnIXha0atTX5AUkRRce95qSfvKFweXdJXSQ0JMGJyfuXgU6dI0TcseFRfewXAa/ssxAC+iUVR6KUMh1PE2wXLitfeI6JLvVtrBYswm2I7CtY0q8n5AGimHWVXJPLfGV7m0BAkEA+fqFt2LXbLtyg6wZyxMA/cnmt5Nt3U2dAu77MzFJvibANUNHE4HPLZxjGNXN+a6m0K6TD4kDdh5HfUYLWWRBYQJBANK3carmulBwqzcDBjsJ0YrIONBpCAsXxk8idXb8jL9aNIg15Wumm2enqqObahDHB5jnGOLmbasizvSVqypfM9UCQCQl8xIqy+YgURXzXCN+kwUgHinrutZms87Jyi+D8Br8NY0+Nlf+zHvXAomD2W5CsEK7C+8SLBr3k/TsnRWHJuECQHFE9RA2OP8WoaLPuGCyFXaxzICThSRZYluVnWkZtxsBhW2W8z1b8PvWUE7kMy7TnkzeJS2LSnaNHoyxi7IaPQUCQCwWU4U+v4lD7uYBw00Ga/xt+7+UqFPlPVdz1yyr4q24Zxaw0LgmuEvgU5dycq8N7JxjTubX0MIRR+G9fmDBBl8=\r\n-----END RSA PRIVATE KEY-----'
    private dbHost: string = config.get('App.dbConfig.host') || 'localhost';
    private dbPort: number = config.get('App.dbConfig.port') || 27017;
    private dbName: string = config.get('App.dbConfig.database') || 'iwa';
    public mongoUrl: string = `mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`;

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup().then(r => Logger.debug(`Connected to ${this.mongoUrl}`));

        this.app.use(siteRoutes);
        this.app.use(userRoutes);
        this.app.use(productRoutes);
        this.app.use(commonRoutes); // always needs to be last
    }

    async mongoSetup(): Promise<void> {
        try {
            const conn = await mongoose.connect(this.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
        } catch (error) {
            Logger.error(error);
            process.exit(1);
        }
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({extended: false}));
        // configure morganConfig logger
        this.app.use(morganConfig);
        // configure session handling
        this.app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {secure: false}
        }))
        // configure helmet
        this.app.use(helmet({
            ieNoOpen: false
        }));
        // @ts-ignore
        this.app.use(helmet.xssFilter({
                setOnOldIE: true
            })
        );
        // configure swagger API
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
    }
}

export default new AppConfig().app;
