'use strict';

import {Router} from 'express';
import * as controller from './checklists.controller';

var router = new Router();

router.post('/:id', controller.create);

module.exports = router;
