import * as todoIO from "./todoIO";

export default {
  'get /api/todo/list': todoIO.getTodoList,
  'get /api/todo/query': todoIO.queryTodoList,
} as Record<string, any>;
