import { supabaseClient } from "../../lib/supabaseClient";
import dayjs from "dayjs";

async function getInvitationById(id) {
  try {
    const res = await supabaseClient.from("invitation").select().eq("id", id).single();
    return res;
  } catch (error) {
    return error;
  }
}

async function createInvitation(data) {
  const res = await supabaseClient
    .from("invitation")
    .insert({
      ...data,
      valid_till: dayjs().add(3, "day").toDate(),
    })
    .select()
    .single();
  return `${process.env.NEXT_PUBLIC_SITE_URL}/?inviteCode=${res.data.id}`;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    res.status(200).json(await getInvitationById(id));
  }

  if (req.method === "POST") {
    const body = req.body;
    res.status(200).json(await createInvitation(body));
  }
}
