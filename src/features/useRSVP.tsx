import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { RSVP } from "./useGetInvitationData";

export function useRsvp(invitationId: string | undefined) {
  const [submitting, setSubmitting] = useState(false);

  const submitRsvp = async (
    formData: RSVP,
    onSuccess?: (newRsvp: RSVP) => void
  ) => {
    if (
      !formData.genderFlag ||
      !formData.attendance ||
      !formData.name ||
      !formData.agree ||
      !invitationId
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return false;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("rsvp").insert({
        invitation_id: invitationId,
        gender: formData.genderFlag,
        attendance: formData.attendance,
        name: formData.name,
        phone: formData.phone,
        count: formData.count,
        meal: formData.meal,
        agree: formData.agree,
      });

      if (error) throw error;

      const newRsvp: RSVP = {
        id: crypto.randomUUID(),
        name: formData.name,
        phone: formData.phone,
        genderFlag: formData.genderFlag,
        attendance: formData.attendance,
        count: formData.count,
        meal: formData.meal,
        agree: formData.agree,
      };

      if (onSuccess) {
        onSuccess(newRsvp);
      }

      alert("참석 여부가 등록되었습니다!");
      return true;
    } catch (error) {
      alert("등록 중 오류가 발생했습니다.");
      console.error(error);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    submitRsvp,
  };
}
