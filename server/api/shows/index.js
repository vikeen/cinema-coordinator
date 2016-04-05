'use strict';

import {Router} from 'express';
import * as controller from './shows.controller.js';

var router = new Router();

router.post("/", controller.create);

module.exports = router;
