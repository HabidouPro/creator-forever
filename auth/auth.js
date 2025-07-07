const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ✅ Detect auth state (place this IMMEDIATELY after init)
auth.onAuthStateChanged((user) => {
  if (user) {
    const userInfo = {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photo: user.photoURL
    };

        console.log("✅ Signed in as", user.email);
        localStorage.setItem("rekalUser", JSON.stringify(userInfo));
        document.getElementById("userGreeting").textContent = `👋 Welcome, ${userInfo.name}`;
        document.getElementById("signInBtn").style.display = "none";
        document.getElementById("signOutBtn").style.display = "inline-block";
        window.location.href = "app.html"; // Redirect to dashboard
    } else {
        console.log("🔓 Not signed in");
        localStorage.removeItem("rekalUser");
        document.getElementById("userGreeting").textContent = "";
        document.getElementById("signInBtn").style.display = "inline-block";
        document.getElementById("signOutBtn").style.display = "none";
    }
});

// 🔘 Sign-in function
function signInWithGoogle() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
    })
    .catch((error) => {
      console.error("Sign-in error:", error);
    });
}
