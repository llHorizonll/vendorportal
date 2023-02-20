import { supabaseClient } from "../../../lib/supabaseClient";

async function checkUserAlreadyExitsByEmail(email) {
  const { data } = await supabaseClient.from("users").select().eq("email", email).single();
  return data;
}

async function checkUserAlreadyExitsById(id) {
  const { data } = await supabaseClient.from("users").select().eq("id", id).single();
  return data;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { email, id } = req.query;
    if (email) {
      res.status(200).json(await checkUserAlreadyExitsByEmail(email));
    }
    if (id) {
      res.status(200).json(await checkUserAlreadyExitsById(id));
    }
    res.status(204);
  }
}
