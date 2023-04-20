import { useEffect, useState } from "react";
import ChatSection from "./chatSection";

const LeftSidebar = () => {
	const [width, setWidth] = useState(0);
	const [size, setSize] = useState([0, 0]);

	useEffect(() => {
		function updateSize() {
			setSize(window.innerWidth);
			setWidth(window.innerWidth);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	return (
		<aside className="chitchat-left-sidebar left-disp">
			<div className="recent-default dynemic-sidebar active">
				<ChatSection />
			</div>
		</aside>
	);
};

export default LeftSidebar;
