import {Input} from "@nextui-org/input";
import {forwardRef} from "react";
import {Select, SelectItem} from "@nextui-org/select";



type NextUiSelectCustmProps = {
	label: string,
	placeholder: string,
	itemArray: { id: string; label: string }[],
	disabled?: boolean,
	error?: any,
}

const NextUiSelectCustm = forwardRef<HTMLSelectElement, NextUiSelectCustmProps>(
	({label, placeholder, itemArray, disabled, error, ...props }, ref) => {
		return (
			<>
				<Select
					ref={ref}
					label={label}
					datatype={"number"}
					labelPlacement="outside"
					placeholder={placeholder}
					classNames={{
						label: "text-white",
						trigger: [
							"bg-secondary",
							"hover:bg-default-200/70",
							"group-data-[focus=true]:ring-2",
							!error ? "group-data-[focus=true]:ring-primary" : "group-data-[focus=true]:ring-red-500",
							"!cursor-text",
						],
					}}
					isDisabled={disabled}
					isInvalid={!!error}
					errorMessage={error && error}
					{...props}
				>
					{
						itemArray.map(({ id, label }) => (
							<SelectItem key={label}>
								{id}
							</SelectItem>
						))
					}
				</Select>
				{/*{error && <span className="text-red-500 text-[0.7rem] font-light">{error}</span>}*/}
			</>
		);
	}
);

export default NextUiSelectCustm;