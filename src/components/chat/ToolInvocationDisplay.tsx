"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  args: any;
  state: "result" | "call" | string;
  result?: any;
}

interface ToolInvocationDisplayProps {
  toolInvocation: ToolInvocation;
  className?: string;
}

function generateUserFriendlyMessage(toolInvocation: ToolInvocation): string {
  const { toolName, args } = toolInvocation;

  switch (toolName) {
    case "str_replace_editor":
      const command = args.command;
      const path = args.path;
      const fileName = path ? path.split('/').pop() : "file";

      switch (command) {
        case "create":
          return `Creating ${fileName}`;
        case "str_replace":
          return `Editing ${fileName}`;
        case "view":
          return `Viewing ${fileName}`;
        case "insert":
          return `Inserting into ${fileName}`;
        case "undo_edit":
          return `Undoing changes to ${fileName}`;
        default:
          return `Modifying ${fileName}`;
      }

    case "file_manager":
      const fileCommand = args.command;
      const filePath = args.path;
      const newPath = args.new_path;
      const fileName2 = filePath ? filePath.split('/').pop() : "file";
      const newFileName = newPath ? newPath.split('/').pop() : "";

      switch (fileCommand) {
        case "rename":
          return newFileName ? `Renaming ${fileName2} to ${newFileName}` : `Renaming ${fileName2}`;
        case "delete":
          return `Deleting ${fileName2}`;
        default:
          return `Managing ${fileName2}`;
      }

    default:
      return toolName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}

export function ToolInvocationDisplay({ toolInvocation, className }: ToolInvocationDisplayProps) {
  const message = generateUserFriendlyMessage(toolInvocation);
  const isCompleted = toolInvocation.state === "result" && toolInvocation.result;

  return (
    <div className={cn(
      "inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200",
      className
    )}>
      {isCompleted ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{message}</span>
    </div>
  );
}