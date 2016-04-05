'use strict';

import showWorker from "../../workers/show.worker";

export function create(req, res, next) {
  showWorker.publish(req.body.show, req.body.listId, req.body.trelloToken);
  return res.sendStatus(200);
}
