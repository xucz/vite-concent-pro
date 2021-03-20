import * as todoIO from "./todoIO";

export default {
  'get /api/todos': todoIO.getTodoList,
} as Record<string, any>;
