import { Wrapper } from "@/components/wrapper";

export default function Layout({ children }) {
	return (
		<div>
			<Wrapper className="md:py-10 py-5">{children}</Wrapper>
		</div>
	);
}
