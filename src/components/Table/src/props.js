import type { PropType } from 'vue';
import { propTypes } from '@/utils/propTypes';
import { BasicColumn } from './types/table';
import { NDataTable } from 'naive-ui';
export const basicProps = {
  ...NDataTable.props, // 这里继承原 UI 组件的 props
  title: {
    type,
    default: null,
  },
  titleTooltip: {
    type,
    default: null,
  },
  size: {
    type,
    default: 'medium',
  },
  dataSource: {
    type: [Object],
    default: () => [],
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
    required: true,
  },
  beforeRequest: {
    type: Function as PropType<(...arg[]) => void | Promise<any>>,
    default: null,
  },
  request: {
    type: Function as PropType<(...arg[]) => Promise<any>>,
    default: null,
  },
  afterRequest: {
    type: Function as PropType<(...arg[]) => void | Promise<any>>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record) => string)>,
    default: undefined,
  },
  pagination: {
    type: [Object, Boolean],
    default: () => {},
  },
  //废弃
  showPagination: {
    type: [String, Boolean],
    default: 'auto',
  },
  actionColumn: {
    type as PropType<BasicColumn>,
    default: null,
  },
  canResize: propTypes.bool.def(true),
  resizeHeightOffset: propTypes.number.def(0),
};
