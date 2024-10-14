const { createClient } = window.supabase;

const supabaseUrl = "";
const supabaseKey = "";

const supabase = createClient(supabaseUrl, supabaseKey);

const loginBtn = document.getElementById("loginBtn");
loginBtn?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error, session } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    document.getElementById("error-msg").textContent = error.message;
  } else {
    window.location.href = "display.html";
  }
});

const signupBtnIndex = document.getElementById("signupBtn-index");
signupBtnIndex?.addEventListener("click", async () => {
  window.location.href = "signup.html";
})

const loginBtnSignup = document.getElementById("loginBtn-signup");
loginBtnSignup?.addEventListener("click", async () => {
  window.location.href = "index.html";
});

//Signup
const signupBtn = document.getElementById("signupBtn");
signupBtn?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const city = document.getElementById("city").value;

  const { error: signUpError, user } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    document.getElementById("error-msg").textContent = signUpError.message;
  } else {
    //FIX: Update this
    const { error: insertError } = await supabase.from("Table_2").insert([
      {
        firstName: firstName,
        lastName: lastName,
        city: city,
        email: email,
      },
    ]);

    if (insertError) {
      document.getElementById("error-msg").textContent = insertError.message;
    } else {
      window.location.href = "index.html";
    }
  }
});
