export default {
  async fetch(request, env) {

    if (request.method === "POST") {
      const data = await request.json()

      const donor = {
        name: data.donator || "Anonim",
        amount: parseInt(data.amount || 0),
        message: data.message || "",
        time: Date.now()
      }

      await env.DONASI.put("last", JSON.stringify(donor))

      let total = await env.DONASI.get("total")
      total = total ? parseInt(total) : 0
      total += donor.amount
      await env.DONASI.put("total", total.toString())

      return new Response("OK")
    }

    if (new URL(request.url).pathname === "/total") {
      const total = await env.DONASI.get("total")
      return new Response(total || "0")
    }

    if (new URL(request.url).pathname === "/last") {
      const last = await env.DONASI.get("last")
      return new Response(last || "{}")
    }

    return new Response("Saweria Backend Ready 🚀")
  }
}
