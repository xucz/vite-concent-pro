import * as todoIO from "./todoIO";

export default {
  'get /api/todo/list': todoIO.getTodoList,
} as Record<string, any>;
