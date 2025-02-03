async function generateClimateStory(userActions) {
    try {
        const response = await fetch("/generate-story/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_actions: userActions }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Server Error:", errorResponse);
            throw new Error(errorResponse.error || "Story generation failed.");
        }

        const data = await response.json();
        return data.story;
    } catch (error) {
        console.error("Error generating story:", error.message || error);
        throw error;
    }
}

// Attach the button's event listener
document.getElementById("generate-story-btn").addEventListener("click", async () => {
    const button = document.getElementById("generate-story-btn");
    const userActions = document.getElementById("climate-actions").value.trim();

    if (!userActions) {
        alert("Please describe your climate actions to generate a story.");
        return;
    }

    try {
        // Disable button to prevent duplicate requests
        button.disabled = true;
        button.textContent = "Generating...";

        // Hide the story container initially and provide feedback
        document.getElementById("story-output").style.display = "none";
        document.getElementById("generated-story").textContent = "Generating your story...";

        // Request the generated story
        const story = await generateClimateStory(userActions);

        // If the story is successfully generated, display it
        document.getElementById("generated-story").textContent = story;
        document.getElementById("story-output").style.display = "block";
    } catch (error) {
        // Show error to the user in a friendly way
        document.getElementById("story-output").style.display = "block";
        document.getElementById("generated-story").textContent = `Error while generating story: ${error.message}`;
    } finally {
        // Re-enable the button and reset its text
        button.disabled = false;
        button.textContent = "Generate Story";
    }
});

// Share story on social media
document.getElementById("share-story-btn").addEventListener("click", () => {
    const story = document.getElementById("generated-story").textContent;
    if (!story.trim()) {
        alert("No story generated to share!");
        return;
    }
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(story)}`;
    window.open(twitterUrl, "_blank");
});