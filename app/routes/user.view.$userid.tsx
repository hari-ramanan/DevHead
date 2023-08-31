import type {
	ActionArgs,
	ActionFunction,
	LoaderArgs,
	LoaderFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "../models/users";
import { Projects } from "~/models/projects";
import { Skills } from "~/models/skills";
import Header from "~/components/user-view/UserHeader";
import SkillView from "~/components/user-view/SkillView";
import BioView from "~/components/user-view/BioView";
import GitHubView from "~/components/user-view/GitHubView";
import LeetCodeView from "~/components/user-view/LeetCodeView";
import ProjectListView from "~/components/user-view/ProjectListView";
import { Likes } from "~/models/likes";
import { useUser } from "@clerk/remix";
import { Comments } from "~/models/comments";

type UserProfile = {
	id: string;
	code_start: string | null;
	first_name: string | null;
	last_name: string | null;
	place: string | null;
	image_url: string;
	username: string;
	email: string;
	title: string | null;
	about: string | null;
	skills: string | null;
	followers: string[] | null;
	following: string[] | null;
	github_username: string | null;
	leetcode_username: string | null;
};

type UserSkills = {
	id: number;
	skill: string;
	user_id: string;
};

type UserProjects = {
	id: number;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
};

type LoaderData = {
	userProfile: UserProfile;
	userProjects: UserProjects[] | null | undefined;
	userSkills: UserSkills[];
	projectLikes: number[];
};

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const userId: string | undefined = params.userid;

	if (userId) {
		const userProfile = await User.getUserProfileById(userId);
		const userProjects = await Projects.getUserProjectsById(userId);
		const projectLikes = await Likes.getLikesById(userId);
		const userSkills = await Skills.getSkillsById(userId);

		console.log("project Likes:", projectLikes);

		return { userProfile, userProjects, userSkills, projectLikes };
	}

	return null;
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as unknown as {
		_action: string;
		userId: string;
		projectId: number;
		comment: string;
		commentId: number;
	};

	if (data._action === "POST_LIKE") {
		return await Likes.addLike(data.userId, data.projectId);
	}

	if (data._action === "POST_UNLIKE") {
		return await Likes.removeLike(data.userId, data.projectId);
	}

	if (data._action === "POST_COMMENT") {
		return await Comments.addComment(data.userId, data.projectId, data.comment);
	}

	if (data._action === "DELETE_COMMENT") {
		return await Comments.deleteComment(data.commentId);
	}

	return null;
};

export default function UserProfile() {
	const { user } = useUser();

	const loaderData = useLoaderData<LoaderData>();

	const userSkills = loaderData.userSkills;
	const userProfile = loaderData.userProfile;
	const userProjects = loaderData.userProjects;
	const projectLikes = loaderData.projectLikes;

	console.log("ahh zay projects", userProjects);

	if (userProfile) {
		return (
			<div className="bg-white rounded-sm">
				<Header userProfile={userProfile} />
				<BioView userBio={userProfile.about} />
				<SkillView userSkills={userSkills} />
				<GitHubView githubUsername={userProfile.github_username} />
				<LeetCodeView leetcodeUsername={userProfile.leetcode_username} />
				<ProjectListView
					userId={user?.id && user?.id}
					userProjects={userProjects}
					projectLikes={projectLikes}
				/>
			</div>
		);
	}

	return <p>No user profile data available.</p>;
}
