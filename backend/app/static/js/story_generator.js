async function generateClimateStory(userActions) {
    // Fetch the temperature and provide user feedback
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

// Attach the button event listener
document.getElementById("generate-story-btn").addEventListener("click", async () => {
    const button = document.getElementById("generate-story-btn");
    const userActions = document.getElementById("climate-actions").value.trim();

    if (!userActions) {
        alert("Please describe your climate actions to generate a story.");
        return;
    }

    try {
        // Disable the button until request is complete
        button.disabled = true;
        button.textContent = "Generating...";

        // Show loading feedback
        document.getElementById("story-output").style.display = "none";
        document.getElementById("generated-story").textContent = "Generating your story...";

        // Generate the story
        const story = await generateClimateStory(userActions);

        // Display the result
        document.getElementById("generated-story").textContent = story;
        document.getElementById("story-output").style.display = "block";
    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        // Re-enable button and reset text
        button.disabled = false;
        button.textContent = "Generate Story";
    }
});