import { useMemo } from "react";
import type { FamilyMember } from "./useGetInvitationData";

export function useMoney(family: FamilyMember[]) {
  const groomFamily = useMemo(
    () => family.filter((f) => f.side === "groom"),
    [family]
  );

  const brideFamily = useMemo(
    () => family.filter((f) => f.side === "bride"),
    [family]
  );

  const formatFamilyMember = (member: FamilyMember) => ({
    ...member,
    displayName: `${member.name}${member.is_deceased ? " (故)" : ""}`,
    hasAccount: !!(
      member.bank_name &&
      member.account_holder &&
      member.account_number
    ),
  });

  return {
    groomFamily: groomFamily.map(formatFamilyMember),
    brideFamily: brideFamily.map(formatFamilyMember),
    allFamily: family.map(formatFamilyMember),
  };
}
