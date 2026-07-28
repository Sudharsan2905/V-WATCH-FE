const FORMS_API_URL = process.env.NEXT_PUBLIC_FORMS_API_URL as string;

export type FormId =
  | "DEMO_INQ"
  | "CONTACT_INQ"
  | "PARTNERSHIP_INQ"
  | "HRMS_TRIAL_INQ"
  | "SITE_VISIBILITY_INQ";

export type FormSubmitResponse = {
  success: boolean;
  message?: string;
};

export async function submitForm(
  payload: { formId: FormId } & Record<string, unknown>,
): Promise<FormSubmitResponse> {
  const res = await fetch(FORMS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res
    .json()
    .catch(() => null)) as FormSubmitResponse | null;

  if (!res.ok || !data?.success) {
    throw new Error(data?.message || `Form submission failed (${res.status}).`);
  }

  return data;
}
