export async function POST(req: Request) {
  const accessToken = await req.json();

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  return Response.json(
    { accessToken },
    {
      status: 200,
      headers: {
        "Set-Cookie": [
          `accessToken=${accessToken}; Path=/; HttpOnly; Expires=${oneYearFromNow.toUTCString()}; Secure; Partitioned; SameSite=None`,
        ].join(", "),
        "Content-Type": "application/json",
      },
    }
  );
}
