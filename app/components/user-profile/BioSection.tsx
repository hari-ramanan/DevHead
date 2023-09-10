import { PencilIcon } from "@heroicons/react/20/solid";
import { useNavigation } from "@remix-run/react";
import { useState } from "react";
// import BioPostForm from "./forms/BioPostForm";
import BioUpdateForm from "./forms/BioUpdateForm";

type Props = {
	userId: string | undefined;
	userBio: string | null;
};

const BioSection: React.FC<Props> = ({ userId, userBio }) => {
	const [buttonClicked, setButtonClicked] = useState(false);
	const [bio, setBio] = useState(userBio);
	const navigation = useNavigation();

	const text =
		navigation.state === "submitting" || navigation.state === "loading"
			? "Proccessing..."
			: "Edit";

	const handleChange = (evt: any) => setBio(evt.target.value);

	const handleSubmit = () => {
		setBio(bio);
		setButtonClicked(false);
	};

	const handleClick = () => {
		buttonClicked ? setButtonClicked(false) : setButtonClicked(true);
	};

	return !buttonClicked ? (
		<div className="pb-5">
			<div className="flex flex-row justify-between mt-8 border-b border-gray-950 pb-5">
				<h3 className="ml-5 mt-5 text-xl font-bold leading-6 text-gray-200">
					Bio
				</h3>
				<div className="mt-4 mr-4">
					<button
						onClick={() => handleClick()}
						type="submit"
						className="flex flex-row rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
					>
						{!userBio ? (
							<>Add Bio</>
						) : (
							<>
								{text} <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
							</>
						)}
					</button>
				</div>
			</div>

			<div className="story-container m-1 ml-4 p-2 sm:p-4 lg:m-4">
				{!userBio && (
					<div className="text-center mt-16 font-bold text-l"> NO BIO YET</div>
				)}
				{userBio?.split("\n")?.map((paragraph, index) => (
					<p key={index + "paragraph"} className="my-2 text-gray-400">
						{paragraph}
					</p>
				))}
			</div>
		</div>
	) : (
		<>
			<div className="flex flex-row justify-between mt-8 border-b border-gray-950 pb-5">
				<h3 className="ml-5 mt-5 text-xl font-bold leading-6 text-gray-200">
					Bio
				</h3>
				<div className="mt-5 mr-4">
					<button
						onClick={() => handleClick()}
						type="submit"
						className="flex flex-row rounded-md bg-rose-300/10 px-2.5 py-1.5 text-sm font-semibold text-rose-300 shadow-sm hover:bg-rose-300/20"
					>
						Cancel
					</button>
				</div>
			</div>

			<div className="story-container m-1 p-2 sm:p-4">
				<BioUpdateForm
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					userId={userId}
					bio={bio}
				/>
			</div>
		</>
	);
};

export default BioSection;
