// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

export default function handler(req, res) {
  let jwtSecretKey = req.headers.host;
  let data = {
    create_at: Date(),
    origin: req.headers.host,
    exp: dayjs().add(1, "m").unix(),
  };
  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
}
