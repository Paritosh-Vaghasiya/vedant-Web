const { createClient } = window.supabase;

const supabaseUrl = "";
const supabaseKey = "";

const supabase = createClient(supabaseUrl, supabaseKey);

const updateBtn = document.getElementById("updateBtn");
updateBtn?.addEventListener("click", async () => {
  window.location.href = "update.html";
});

const logoutBtnDisplay = document.getElementById("logoutBtnDisplay");
logoutBtnDisplay?.addEventListener("click", async () => {
  window.location.href = "logout.html";
});

const profileDataDiv = document.getElementById('profile-data');

async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log("Error getting session:", error);
    return null;
  }
  console.log("Session data:", data);
  return data.session;
}

//Call the async function
getSession().then(session => {
    console.log(session);
}).catch(error => {
    console.log('Error getting session: ', error);
});

async function getUserProfile() {
    //FIX: Update this
    const {data: userProfile, error} = await supabase.from("Table_2").select('*');

    if (error){
        document.getElementById("error-msg").textContent = error.message;
        console.log('Error getting user profile: ', error);
        return null;
    }

    return userProfile;
}

async function fetchProfiles() {
    const session = await getSession();
    if (session) {
        const userProfile = await getUserProfile();
        if (userProfile) {
            console.log('User Profile', userProfile);
            profileDataDiv.innerHTML = `
                <p><strong>First Name:</strong> ${userProfile[0].firstName}</p>
                <p><strong>Last Name:</strong> ${userProfile[0].lastName}</p>
                <p><strong>City:</strong> ${userProfile[0].city}</p>
                <p><strong>Email:</strong> ${userProfile[0].email}</p>`;
        }
    } else {
        console.log('No active session found');
    }
}

fetchProfiles().catch((error) => {
    console.log('Error', error);
})