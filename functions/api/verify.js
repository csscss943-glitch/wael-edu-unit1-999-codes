
export async function onRequestPost(context) {
  const { code } = await context.request.json();
  const num = parseInt(code);
  // تحقق من 1 إلى 999
  if (!isNaN(num) && num >= 1 && num <= 999) {
    return new Response(JSON.stringify({ ok: true, code: num }), {
      headers: { "Content-Type": "application/json",
                 "Set-Cookie": `access=1; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax` }
    });
  }
  // تحقق من WAEL-XXX
  const match = code.toUpperCase().match(/WAEL-(\d{1,3})/);
  if (match) {
    const n = parseInt(match[1]);
    if (n >= 1 && n <= 999) {
      return new Response(JSON.stringify({ ok: true, code: n }), {
        headers: { "Content-Type": "application/json",
                   "Set-Cookie": `access=1; Path=/; Max-Age=2592000` }
      });
    }
  }
  return new Response(JSON.stringify({ ok: false, msg: "الكود غير مسجل" }), { status: 401 });
}
