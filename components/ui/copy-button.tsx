import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./button";
import { Check, Copy } from "lucide-react";

interface ClipboardButtonProps {
  textToCopy: string;
}

const ClipboardButton = ({ textToCopy }: ClipboardButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const handleCopy = useCallback(async () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    let success = false;

    try {
      await navigator.clipboard.writeText(textToCopy);
      success = true;
    } catch (err) {
      console.error("Modern Clipboard API failed, trying fallback:", err);
      try {
        const tempInput = document.createElement("textarea");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        success = true;
      } catch (fallbackErr) {
        console.error("Fallback copy method failed:", fallbackErr);
        success = false;
      }
    }

    if (success) {
      setIsCopied(true);
      setTooltipText("Copied!");

      const id: NodeJS.Timeout = setTimeout(() => {
        setIsCopied(false);
        setTooltipText("Copy to clipboard");
        setTimeoutId(null);
      }, 2000);
      setTimeoutId(id);
    } else {
      setTooltipText("Copy Failed!");
      const id: NodeJS.Timeout = setTimeout(() => {
        setTooltipText("Copy to clipboard");
        setTimeoutId(null);
      }, 2000);
      setTimeoutId(id);
    }
  }, [textToCopy, timeoutId]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const clipboardIconClasses = isCopied ? "opacity-0" : "opacity-100";
  const checkmarkIconClasses = isCopied ? "opacity-100" : "opacity-0";

  const tooltipVisibilityClasses = isCopied
    ? "opacity-100 visible -top-10"
    : "group-hover:opacity-100 group-hover:visible group-hover:-top-10 group-focus:opacity-100 group-focus:visible group-focus:-top-10";

  return (
    <Button
      onClick={handleCopy}
      size={"icon"}
      variant={"ghost"}
      className="group relative h-9 w-9"
      aria-label={tooltipText}
    >
      <span
        className={`absolute text-center w-max opacity-0 invisible -top-8 bg-foreground text-background text-balance text-xs py-1.5 px-3 rounded-md shadow-lg font-sans transition-all duration-300 ease-out ${tooltipVisibilityClasses} `}
      >
        {tooltipText}
      </span>
      <div className="relative h-full w-full">
        <div
          className={`absolute inset-0 flex items-center justify-center group-hover:text-primary ${clipboardIconClasses}`}
        >
          <Copy />
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center group-hover:text-primary ${checkmarkIconClasses}`}
        >
          <Check />
        </div>
      </div>
    </Button>
  );
};

export default ClipboardButton;
