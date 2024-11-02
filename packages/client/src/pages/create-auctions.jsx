export function CreateAuctions() {
    return (
        <form
            class="flex flex-col gap-2 w-1/2 mx-auto mt-24 text-xl mb-12"
            method="post"
        >
            <h1 class="text-center">Create new auction</h1>
            <label class="text-lg flex flex-col gap-1" for="fullName">
                Title
                <input
                    class="text-lg px-1"
                    type="text"
                    name="title"
                    placeholder="My auction room"
                    required
                />
            </label>
            <label class="text-lg flex flex-col gap-1" for="email">
                Start time
                <input
                    class="text-lg px-1"
                    type="datetime-local"
                    name="startTime"
                    required
                />
            </label>
            <button class="mt-4 text-lg p-1">Create auction room</button>
        </form>
    );
}
