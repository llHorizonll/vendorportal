import { supabaseClient } from "../../lib/supabaseClient";

async function getBusinessUnitById(id) {
  const res = await supabaseClient.from("business_unit").select().eq("id", id).single();
  return res;
}

async function createBusinessUnit(data) {
  const res = await supabaseClient
    .from("business_unit")
    .insert({
      ...data,
    })
    .select()
    .single();
  return res.data.id;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    res.status(200).json(await getBusinessUnitById(id));
  }

  if (req.method === "POST") {
    const body = req.body;
    res.status(200).json(await createBusinessUnit(body));
  }
}
