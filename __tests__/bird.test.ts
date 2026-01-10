jest.mock("../src/ts/modules/Game", () => {
  return jest.fn().mockImplementation(() => ({
    maxHeight: 488,
    style: {
      top: "",
    },
  }));
});

import Game from "../src/ts/modules/Game";
import Bird from "../src/ts/modules/Bird";

describe("测试Bird", () => {
  let game: Game, bird: Bird;
  beforeEach(() => {
    game = new Game();
    bird = new Bird(game);
    const mockDom = {
    style: {
      top: "",
      backgroundPosition: "",
    },
  } as HTMLElement;
    const querySelector = jest.spyOn(document, "querySelector");
    querySelector.mockReturnValue(mockDom);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("测试构造函数是否正常", () => {
    expect(bird.game).toBe(game);
    expect(bird.width).toBe(33);
    expect(bird.height).toBe(26);
    expect(bird.top).toBe(150);
    expect(bird.left).toBe(200);
    expect(bird.dom).toBeDefined();
    expect(bird.wingIndex).toBe(0);
    expect(bird.speed).toBe(0);
    expect(bird.a).toBe(0.002);
  });

  it("测试show方法", () => {
    bird.show();
    expect(bird.dom.style.top).toBe("150px");
    expect(bird.dom.style.backgroundPosition).toBe("-8px -10px");
    bird.wingIndex = 1;
    bird.show();
    expect(bird.dom.style.backgroundPosition).toBe("-60px -10px");
    bird.wingIndex = 2;
    bird.show();
    expect(bird.dom.style.backgroundPosition).toBe("-113px -10px");
  });

  it("测试setTop", () => {
    bird.setTop(-1);
    expect(bird.top).toBe(0);
    bird.setTop(100);
    expect(bird.top).toBe(100);
    bird.setTop(488);
    expect(bird.top).toBe(462);
  });

  it("测试jump", () => {
    expect(bird.speed).toBe(0);
    bird.jump();
    expect(bird.speed).toBe(-0.5);
  });

  it("测试wingTimer", () => {
    bird.show = jest.fn();
    bird.wingTimer.start();
    jest.advanceTimersByTime(100);
    expect(bird.wingIndex).toBe(1);
    expect(bird.show).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(100);
    expect(bird.wingIndex).toBe(2);
    expect(bird.show).toHaveBeenCalledTimes(2);
    bird.wingTimer.stop();
    jest.advanceTimersByTime(100);
    expect(bird.wingIndex).toBe(2);
    expect(bird.show).toHaveBeenCalledTimes(2);
  });

  it("测试dropTimer", () => {
    bird.show = jest.fn();
    bird.dropTimer.start();
    jest.advanceTimersByTime(16);
    expect(bird.top).not.toBe(150);
    expect(bird.speed).not.toBe(0);
    expect(bird.show).toHaveBeenCalled();
    bird.dropTimer.stop()
  });
});
