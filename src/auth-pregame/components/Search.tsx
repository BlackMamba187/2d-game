import { useState } from "react";

interface Props {
	name: string;
	array: any[];
	clickType: string;
	click?: (name: string) => void;
}

const Search = (props: Props) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchParam] = useState(["name"]);

	function search(items: any[]) {
		return items.filter((item) => {
			return searchParam.some((newItem) => {
				return (
					item[newItem]
						.toString()
						.toLowerCase()
						.indexOf(searchQuery.toLowerCase()) > -1
				);
			});
		});
	}

	const onChange = (Value: string) => {
		setSearchQuery(Value.replace(" ", ""));
	};

	const click = (name: string) => {
		if (props.click) {
			props.click(name);
		}
	};

	return (
		<div>
			<div>{props.name}</div>
			<input
				value={searchQuery}
				onChange={(e) => onChange(e.target.value)}
				className="w-full my-2 bg-[#ead4aa] border-2 border-[#743f39] outline-0"
			/>
			{searchQuery !== "" && (
				<div>
					{search(props.array).map((item, indexOf) => (
						<div
							key={indexOf}
							className="my-2 bg-[#ead4aa] border-2 border-[#743f39] flex flex-col justify-center items-center"
						>
							{props.clickType === "id" && (
								<p onClick={() => click(item.id)}>{item.name}</p>
							)}
							{props.clickType === "name" && (
								<p onClick={() => click(item.name)}>{item.name}</p>
							)}
							<p>{item.password}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export default Search;
