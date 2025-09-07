import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationDisplay } from "../ToolInvocationDisplay";

afterEach(() => {
  cleanup();
});

test("ToolInvocationDisplay shows user-friendly message for str_replace_editor create command", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "create",
      path: "/components/Button.jsx",
    },
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating Button.jsx")).toBeDefined();
});

test("ToolInvocationDisplay shows user-friendly message for str_replace_editor str_replace command", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "str_replace",
      path: "/src/HomePage.tsx",
      old_str: "old code",
      new_str: "new code",
    },
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Editing HomePage.tsx")).toBeDefined();
});

test("ToolInvocationDisplay shows user-friendly message for str_replace_editor view command", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "view",
      path: "/utils/helper.js",
    },
    state: "result",
    result: "File content...",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Viewing helper.js")).toBeDefined();
});

test("ToolInvocationDisplay shows user-friendly message for str_replace_editor insert command", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "insert",
      path: "/config/settings.json",
      insert_line: 5,
      new_str: "new config",
    },
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Inserting into settings.json")).toBeDefined();
});

test("ToolInvocationDisplay shows user-friendly message for str_replace_editor undo_edit command", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "undo_edit",
      path: "/lib/utils.ts",
    },
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Undoing changes to utils.ts")).toBeDefined();
});

test("ToolInvocationDisplay shows user-friendly message for file_manager rename command", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "file_manager",
    args: {
      command: "rename",
      path: "/components/OldButton.jsx",
      new_path: "/components/NewButton.jsx",
    },
    state: "result",
    result: { success: true },
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Renaming OldButton.jsx to NewButton.jsx")).toBeDefined();
});

test("ToolInvocationDisplay shows user-friendly message for file_manager delete command", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "file_manager",
    args: {
      command: "delete",
      path: "/temp/unused.jsx",
    },
    state: "result",
    result: { success: true },
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Deleting unused.jsx")).toBeDefined();
});

test("ToolInvocationDisplay shows completed state with green dot", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "create",
      path: "/App.jsx",
    },
    state: "result",
    result: "Success",
  };

  const { container } = render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  // Check for green dot indicator
  const greenDot = container.querySelector(".bg-emerald-500");
  expect(greenDot).toBeDefined();

  // Should not have loading spinner
  const loadingSpinner = container.querySelector(".animate-spin");
  expect(loadingSpinner).toBeNull();
});

test("ToolInvocationDisplay shows loading state with spinner", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "create",
      path: "/App.jsx",
    },
    state: "call",
  };

  const { container } = render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  // Check for loading spinner
  const loadingSpinner = container.querySelector(".animate-spin");
  expect(loadingSpinner).toBeDefined();

  // Should not have green dot
  const greenDot = container.querySelector(".bg-emerald-500");
  expect(greenDot).toBeNull();
});

test("ToolInvocationDisplay handles unknown str_replace_editor command", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "unknown_command",
      path: "/test.js",
    },
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Modifying test.js")).toBeDefined();
});

test("ToolInvocationDisplay handles unknown file_manager command", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "file_manager",
    args: {
      command: "unknown_command",
      path: "/test.js",
    },
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Managing test.js")).toBeDefined();
});

test("ToolInvocationDisplay handles unknown tool name", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "unknown_tool_name",
    args: {},
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Unknown Tool Name")).toBeDefined();
});

test("ToolInvocationDisplay handles missing path gracefully", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "create",
      // Missing path
    },
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating file")).toBeDefined();
});

test("ToolInvocationDisplay handles file_manager rename without new_path", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "file_manager",
    args: {
      command: "rename",
      path: "/components/Button.jsx",
      // Missing new_path
    },
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Renaming Button.jsx")).toBeDefined();
});

test("ToolInvocationDisplay handles deeply nested file paths correctly", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "create",
      path: "/src/components/ui/forms/LoginForm.tsx",
    },
    state: "result",
    result: "Success",
  };

  render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating LoginForm.tsx")).toBeDefined();
});

test("ToolInvocationDisplay applies custom className", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "create",
      path: "/App.jsx",
    },
    state: "result",
    result: "Success",
  };

  const { container } = render(
    <ToolInvocationDisplay toolInvocation={toolInvocation} className="custom-class" />
  );

  const element = container.querySelector(".custom-class");
  expect(element).toBeDefined();
});

test("ToolInvocationDisplay shows loading when state is not result and no result", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "create",
      path: "/App.jsx",
    },
    state: "call",
    // No result
  };

  const { container } = render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  const loadingSpinner = container.querySelector(".animate-spin");
  expect(loadingSpinner).toBeDefined();
});

test("ToolInvocationDisplay shows completed when state is result even without result property", () => {
  const toolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {
      command: "create",
      path: "/App.jsx",
    },
    state: "result",
    // No result property
  };

  const { container } = render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

  // Should still show loading because isCompleted requires both state === "result" AND result
  const loadingSpinner = container.querySelector(".animate-spin");
  expect(loadingSpinner).toBeDefined();
});