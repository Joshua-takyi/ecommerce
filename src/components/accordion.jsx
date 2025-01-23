"use client";
import React, { useState } from "react";

const AccordionItem = ({ title, children, isOpen, onToggle }) => {
	return (
		<div>
			<button onClick={onToggle} className="w-full text-left p-2 bg-gray-200">
				{title}
			</button>
			{isOpen && (
				<div className="p-2 border-l-2 border-gray-300">{children}</div>
			)}
		</div>
	);
};

export const Accordion = ({ items }) => {
	const [openIndex, setOpenIndex] = useState(null);

	const handleToggle = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="flex flex-col gap-2">
			{items.map((item, index) => (
				<AccordionItem
					key={index}
					title={item.title}
					isOpen={openIndex === index}
					onToggle={() => handleToggle(index)}
				>
					{item.content}
				</AccordionItem>
			))}
		</div>
	);
};
