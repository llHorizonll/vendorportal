import { supabaseClient } from "../../lib/supabaseClient";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

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
      valid_till: dayjs().add(3, "d").toDate(),
    })
    .select()
    .single();
  return {
    callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/?inviteCode=${res.data.id}`,
    inviteCode: res.data.id,
  };
}

export default async function handler(req, res) {
  let jwtSecretKey = req.headers.host;

  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
  } else {
    res.status(406).json({ message: "Not Acceptable" });
  }

  try {
    const verified = jwt.verify(req.token, jwtSecretKey);
    if (verified) {
      if (req.method === "GET") {
        const { id } = req.query;
        return res.status(200).json(await getInvitationById(id));
      }

      if (req.method === "POST") {
        const body = req.body;
        return res.status(200).json(await createInvitation(body));
      }
    } else {
      //Not Accepted
      return res.status(406).json({ message: "Not Acceptable" });
    }
  } catch (err) {
    return res.status(406).json({ message: err.message });
  }
}
