import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export type Invitation = {
  id: string;
  slug: string;
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  wedding_time: string;
  contact_phone: string | null;
  main_image_url: string | null;
  message: string | null;
  greeting_message: string | null;
  wedding_hall: WeddingHall | null;
};

export type WeddingHall = {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number | null;
  lng: number | null;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  side: "groom" | "bride";
  is_deceased: boolean;
  contact_phone: string | null;
  bank_name: string | null;
  account_holder: string | null;
  account_number: string | null;
};
export type AccountInfo = {
  id: string;
  for_whom: string;
  bank_name: string | null;
  account_holder: string | null;
  account_number: string | null;
  phone_number: string | null;
};
export interface RSVP {
  id: string;
  invitation_id?: string;
  name: string;
  phone: string;
  genderFlag?: "groom" | "bride" | null;
  attendance: boolean;
  count: number;
  meal: boolean;
  agree: boolean;
  created_at?: string;
  updated_at?: string;
}

export type GalleryItem = {
  id: string;
  image_url: string;
  description: string | null;
};

export function useGetInvitationData(slug: string | undefined) {
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [accountInfos, setAccountInfos] = useState<AccountInfo[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const { data: invData, error: invError } = await supabase
          .from("invitation")
          .select(
            `
            *,
            wedding_hall:wedding_hall_id (
              id, name, address, phone, lat, lng, description, image_url, created_at
            )
          `
          )
          .eq("slug", slug)
          .single();

        if (invError || !invData) {
          throw invError || new Error("Invitation not found");
        }

        setInvitation(invData as Invitation);

        const [famData, rsvpData, galData, accData] = await Promise.all([
          supabase
            .from("family_member")
            .select("*")
            .eq("invitation_id", invData.id),
          supabase.from("rsvp").select("*").eq("invitation_id", invData.id),
          supabase.from("gallery").select("*").eq("invitation_id", invData.id),
          supabase
            .from("account_info")
            .select("*")
            .eq("invitation_id", invData.id),
        ]);

        if (famData.error) throw famData.error;
        if (rsvpData.error) throw rsvpData.error;
        if (galData.error) throw galData.error;
        if (accData.error) throw accData.error;

        setFamily((famData.data as FamilyMember[]) ?? []);
        setRsvps((rsvpData.data as RSVP[]) ?? []);
        setGallery((galData.data as GalleryItem[]) ?? []);
        setAccountInfos((accData.data as AccountInfo[]) ?? []);
      } catch (e) {
        console.error(e);
        setError(
          e instanceof Error
            ? e.message
            : "데이터를 불러오는 중 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  return {
    invitation,
    family,
    rsvps,
    gallery,
    accountInfos,
    loading,
    error,
    setRsvps,
  };
}
