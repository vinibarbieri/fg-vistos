import { ApplicantsT } from "./ApplicantsT";

export const ApplicantsConstructor = (obj?: Partial<ApplicantsT>): ApplicantsT => ({
	id: obj?.id || "",
	responsible_user_id: obj?.responsible_user_id || "",
	order_id: obj?.order_id || "",
	is_responsible: obj?.is_responsible || false,
	name: obj?.name || "",
	status: obj?.status || "em_andamento",
	created_at: obj?.created_at || "",
	updated_at: obj?.updated_at || "",
	form_answer: null,
	form_status: null,
	attachment_id: null,
});
