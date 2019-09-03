import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TodoList } from "../TodoList";
import Button from "react-bootstrap/Button";

Enzyme.configure({ adapter: new Adapter() });

describe("TodoList", () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation(init => [init, setState]);
  wrapper = Enzyme.shallow(<TodoList />);

  it("should render initial layout", () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("should add new todo when enter from textbox", () => {
    wrapper.find("#to-do-form").simulate("submit", {
      target: [{ value: "new todo 1" }],
      preventDefault: jest.fn()
    });

    expect(wrapper.find(".todo-item")).toHaveLength(1);
  });

  it("should add new todo when enter from textbox", () => {
    wrapper.find("#to-do-form").simulate("submit", {
      target: [{ value: "new todo 2" }],
      preventDefault: jest.fn()
    });

    expect(wrapper.find(".todo-item")).toHaveLength(2);
  });

  it("should delete todo when click delete button", () => {
    const deletebtn = wrapper.find(Button).first();
    deletebtn.simulate("click");

    expect(wrapper.find(".todo-item")).toHaveLength(1);
  });

  it("should mark todo as completed when click complete button", () => {
    const deletebtn = wrapper.find(Button).at(1);
    deletebtn.simulate("click");

    expect(wrapper.find(".todo-item").hasClass("completed")).toBe(true);
  });
});
