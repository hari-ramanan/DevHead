import { Tab } from "@headlessui/react";
import { Form } from "@remix-run/react";
import { UseFormClear } from "~/hooks/useFormClear";

type BioUpdateFormProps = {
	handleSubmit: () => void;
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	userId: string | undefined;
	bio: string | null;
};

const BioUpdateForm: React.FC<BioUpdateFormProps> = ({
	handleSubmit,
	handleChange,
	userId,
	bio,
}) => {
	const { ref: setFormRef, isAdding } = UseFormClear("UPDATE_BIO");

	return (
		<Form
			ref={setFormRef}
			method="post"
			className="mt-6"
			onSubmit={handleSubmit}
		>
			<Tab.Group>
				<Tab.Panels className="mt-2">
					<Tab.Panel className="-m-0.5 rounded-lg p-0.5">
						<div>
							<input
								defaultValue={userId}
								type="hidden"
								name="userId"
								className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<textarea
								name="userBio"
								rows={7}
								className="pl-2 bg-white block w-full rounded-md py-1.5 text-gray-900 border border-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 overflow-hidden outline-none"
								value={bio ? bio : ""}
								onChange={handleChange}
							/>
						</div>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
			<div className="mt-2 flex justify-end">
				<button
					type="submit"
					name="_action"
					value="UPDATE_BIO"
					className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					{isAdding ? "Processing" : "Edit Bio"}
				</button>
			</div>
		</Form>
	);
};

export default BioUpdateForm;
