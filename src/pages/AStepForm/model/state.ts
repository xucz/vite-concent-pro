
type StepRange = 1 | 2 | 3;

interface FieldItem {
  fieldName: string,
  fieldType: string,
  isMulti: boolean,
  count: number,
}

export interface FieldGroupItem {
  groupFieldName: string,
  fields: string[],
}

function getInitialState() {
  const dataExampleJson = {
    desc: '粘贴json数据到此处，或在此输入示例数据',
    tip: '注意json层级不能超过3层',
  };

  return {
    /** 当前处于第几步 */
    step: 1 as StepRange,
    step2isFinished: {} as Record<string, boolean>,
    /** 曾正处于编辑中的步骤 */
    step2isOnceEditing: {} as Record<string, boolean>,
    /** 第几步算完成 */
    finishStep: 4,
    /** 上一步或下一步按钮是否点击了, watch里控制是否要对每一个输入项做实时的错误检查 */
    isBtnClicked: false,
    /** 收集改变步骤时检查到的错误 */
    errors: {} as Record<string, string>,
    checkAppIdBtnLoading: false,
    /** 下一步按钮的loading，某些步骤点击下一步是需要有些异步请求做检查 */
    nextBtnLoading: false,
    matchedUserList: [] as Array<[string, string]>,

    /** config id，大于0表示更新，否则表示新增 */
    id: 0,

    // ---------- for step1 ----------
    /** appId */
    appId: '',
    /** appDetail */
    appDetail: '',
    /** 展示名称 */
    displayName: '',
    /** 申请人 */
    creator: '',
    /** 描述 */
    comment: '',
    /** 负责人 */
    monitor: [],
    // ---------------- End ----------------

    // ---------- for step2 ----------
    /** 数据库类型 */
    dbType: '',
    /** 数据库别名，默认和 displayName一样 */
    dbAlias: '',
    /** 预估数量1 */
    count1: 0,
    /** 预估数量2 */
    count2: 0,
    /** 预估数量3 */
    count3: 0,
    /** 示例数据 json字符串 */
    dataExample: JSON.stringify(dataExampleJson, null, 2),
    dataExampleJson,
    // ---------------- End ----------------

    // ---------- for step3 ----------
    /** 表名称 */
    tableDb: '',
    /** 字段list */
    fields: [] as FieldItem[],
    /** 字段list 的选择源 */
    fieldOptionsList: [] as Array<Array<{ label: string, value: string }>>,
    /** 分组字段list */
    groupFields: [
      {
        groupFieldName: '',
        fields: [],
      }
    ] as FieldGroupItem[],

    loading: false,
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
