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

import {Request, Response, Router} from 'express';
import {AuthorizationHandler} from "../middleware/authorization.handler";

export const commonRoutes = Router();

// redirect root to api-docs
commonRoutes.get('/', [AuthorizationHandler.permitAll], function (req: Request, res: Response) {
    res.redirect('/api-docs');
});

// URL not found
commonRoutes.all('*', [AuthorizationHandler.permitAll], function (req: Request, res: Response) {
    res.status(404).send({error: true, message: 'Please check your URL.'});
});
