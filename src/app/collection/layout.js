import { ColSideBar } from "@/components/sideBar";
import { Wrapper } from "@/components/wrapper";
import PropTypes from "prop-types";
export default function CollectionLayout({ children }) {
	return (
		<main>
			<Wrapper className={`flex`}>
				<div className="h-screen">
					<ColSideBar />
				</div>
				<div className="w-full">{children}</div>
			</Wrapper>
		</main>
	);
}

CollectionLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
