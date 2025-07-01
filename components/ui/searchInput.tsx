import * as React from "react";
import {cn} from "@/lib/utils";
import {FiSearch} from "react-icons/fi";

const SearchInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({className, type = "text", ...props}, ref) => {
        return (
            <div className="relative">
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm " +
                        "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium " +
                        "file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none " +
                        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
                        "disabled:cursor-not-allowed disabled:opacity-50 ring-[0.5px]",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <FiSearch className="absolute top-3 left-2.5 text-gray-500"/>
            </div>
        );
    }
);

SearchInput.displayName = "SearchInput";

export {SearchInput};
