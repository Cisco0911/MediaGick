import {Input} from "@nextui-org/input";
import React, {forwardRef} from "react";



type NextUiInputCustmProps =  {
	error?: any,
} & React.ComponentProps<typeof Input>

const NextUiInputCustm = forwardRef<HTMLInputElement, NextUiInputCustmProps>(
	({ error, ...props }, ref) => {
		return (
			<>
				<Input
					ref={ref}
					labelPlacement="outside"
					classNames={{
						label: "text-white",
						input: [
							"bg-transparent",
							"text-white/90",
							"placeholder:text-white/60",
						],
						innerWrapper: "bg-transparent",
						inputWrapper: [
							"bg-secondary",
							"hover:bg-default-200/70",
							"group-data-[focus=true]:ring-2",
							!error ? "group-data-[focus=true]:ring-primary" : "group-data-[focus=true]:ring-red-500",
							"!cursor-text",
						],
					}}
					isInvalid={!!error}
					errorMessage={error && error}
					{...props}
				/>
				{/*{error && <span className="text-red-500 text-[0.7rem] font-light">{error}</span>}*/}
			</>
		);
	}
);

NextUiInputCustm.displayName = "NextUiInputCustm"

export default NextUiInputCustm;