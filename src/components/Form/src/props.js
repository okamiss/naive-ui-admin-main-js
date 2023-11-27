import type { CSSProperties, PropType } from 'vue';
import { FormSchema } from './types/form';
import type { GridProps, GridItemProps } from 'naive-ui/lib/grid';
import type { ButtonProps } from 'naive-ui/lib/button';
import { propTypes } from '@/utils/propTypes';
export const basicProps = {
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String],
    default: 80,
  },
  // 表单配置规则
  schemas: {
    type: [Array],
    default: () => [],
  },
  //布局方式
  layout: {
    type,
    default: 'inline',
  },
  //是否展示为行内表单
  inline: {
    type,
    default: false,
  },
  //大小
  size: {
    type,
    default: 'medium',
  },
  //标签位置
  labelPlacement: {
    type,
    default: 'left',
  },
  //组件是否width 100%
  isFull: {
    type,
    default: true,
  },
  //是否显示操作按钮（查询/重置）
  showActionButtonGroup: propTypes.bool.def(true),
  // 显示重置按钮
  showResetButton: propTypes.bool.def(true),
  //重置按钮配置
  resetButtonOptions,
  // 显示确认按钮
  showSubmitButton: propTypes.bool.def(true),
  // 确认按钮配置
  submitButtonOptions,
  //展开收起按钮
  showAdvancedButton: propTypes.bool.def(true),
  // 确认按钮文字
  submitButtonText: {
    type,
    default: '查询',
  },
  //重置按钮文字
  resetButtonText: {
    type,
    default: '重置',
  },
  //grid 配置
  gridProps,
  //gi配置
  giProps,
  //grid 样式
  baseGridStyle: {
    type,
  },
  //是否折叠
  collapsed: {
    type,
    default: false,
  },
  //默认展示的行数
  collapsedRows: {
    type: Number,
    default: 1,
  },
};
