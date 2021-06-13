/* eslint-disable */

export function getTodoList(url: string, data: any) {
  const resp = {
    "data": {
      "total": 3,
      "list": [
        {
          "id": 1,
          "text": "hi",
          "done": true,
        },
        {
          "id": 2,
          "text": "concent",
          "done": false,
        },
      ]
    },
    "msg": "",
    "code": "0"
  };
  return resp;
}

export function queryTodoList(url: string, data: any) {
  let list = [] as any[];
  if (data.keyword === '222') list = [{ id: 3, name: 222 }];
  if (data.keyword === '333') list = [{ id: 3, name: 333 }];

  const resp = {
    "data": {
      "total": 3,
      list,
    },
    "msg": "",
    "code": "0"
  };
  return resp;
}
