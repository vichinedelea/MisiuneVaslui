export async function POST(req) {
  try {
    const { password } = await req.json();

    if (password === process.env.PASSWORD) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, message: "Parolă incorectă" }, { status: 401 });
    }
  } catch (error) {
    return Response.json({ success: false, message: "Eroare la server" }, { status: 500 });
  }
}