'use strict';

export function create(req, res, next) {
  var checklistId = req.params.id,
    items = req.body;

  return res.send({
    checklistId: checklistId,
    items: items
  });
}
