import { supabaseClient } from "../../lib/supabaseClient";

async function activateUser() {
  
}

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    if (activate) {
      res.status(200).json(await updateUser(id));
    }
  }
}
