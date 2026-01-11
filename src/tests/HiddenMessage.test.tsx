import {fireEvent, render, screen} from '@testing-library/react';
import HiddenMessage from '../hiddenMessage';

test("能够被勾选，功能正常", () => {
  const testMessage = "这是一条测试信息";
  render(<HiddenMessage>{testMessage}</HiddenMessage>)
  expect(screen.queryByText(testMessage)).toBeNull();

  // 模拟点击
  fireEvent.click(screen.getByLabelText("显示"));
  expect(screen.getByText(testMessage)).toBeInTheDocument();
})