import { render, screen } from "@testing-library/react";
import App from "../App";

test("测试快照", () => {
  render(<App />);
  const content = screen.getByTestId("list");
  expect(content).toMatchSnapshot();
  // expect(baseElement).toMatchSnapshot()
});
