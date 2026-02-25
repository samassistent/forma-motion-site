// Forma Motion Newsletter
// Mode A (recommended): Supabase database
// Mode B (fallback): localStorage list

const SUPABASE_URL = ""; // e.g. https://xxxx.supabase.co
const SUPABASE_ANON_KEY = ""; // public anon key

const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("email");
const statusEl = document.getElementById("newsletter-status");

function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.style.color = isError ? "#8a2f2f" : "#5d5751";
}

function saveLocal(email) {
  const key = "forma_motion_subscribers";
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  if (!current.includes(email)) current.push(email);
  localStorage.setItem(key, JSON.stringify(current));
}

async function saveSupabase(email) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Database write failed");
  }
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim().toLowerCase();

  if (!email || !email.includes("@")) {
    setStatus("Please enter a valid email.", true);
    return;
  }

  try {
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      await saveSupabase(email);
      setStatus("Thanks — you are on the list.");
    } else {
      saveLocal(email);
      setStatus("Saved locally. Connect Supabase to sync all emails centrally.");
    }
    form.reset();
  } catch (err) {
    setStatus("Could not save email right now. Please try again.", true);
    console.error(err);
  }
});
