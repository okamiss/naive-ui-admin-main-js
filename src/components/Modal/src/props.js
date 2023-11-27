import { NModal } from 'naive-ui';

export const basicProps = {
  ...NModal.props,
  // 确认按钮文字
  subBtuText: {
    type,
    default: '确认',
  },
  showIcon: {
    type,
    default: false,
  },
  width: {
    type: Number,
    default: 446,
  },
  title: {
    type,
    default: '',
  },
  maskClosable: {
    type,
    default: false,
  },
  preset: {
    type,
    default: 'dialog',
  },
};
