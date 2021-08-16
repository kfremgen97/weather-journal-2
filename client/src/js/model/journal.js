// Journal model
class Journal {
    // Private entries field
    #entry = {};

    setEntry(entry) {
        // Replace the entries
        this.#entry = entry;
    }

    getEntry() {
        // Return the entry
       return this.#entry;
    }
}

// Export a single instance
export default new Journal();