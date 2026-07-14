const nav = document.querySelector("nav");
const memberCountEl = document.getElementById("member-count");
const baseMemberCount = 242;
let currentMemberCount = baseMemberCount;

function updateMemberCount(count) {
    if (!memberCountEl) return;
    currentMemberCount = count;
    memberCountEl.textContent = count;
}

async function refreshMemberCount() {
    try {
        const response = await fetch("https://discord.com/api/invites/bWdkNhDD3?with_counts=true", {
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Unable to fetch Discord member count");
        }

        const data = await response.json();
        const liveCount = data?.member_count ?? data?.approximate_member_count ?? null;

        if (typeof liveCount === "number" && liveCount > 0) {
            updateMemberCount(liveCount);
        }
    } catch (error) {
        updateMemberCount(baseMemberCount);
    }
}

window.addEventListener("scroll", () => {
    if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 50);
    }
});

window.addEventListener("load", () => {
    refreshMemberCount();
    setInterval(refreshMemberCount, 60000);
});