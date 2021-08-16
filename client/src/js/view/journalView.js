// Journal View
class JournalView {

    // Elements
    form = document.querySelector('.form');
    zipInput = document.querySelector('.form__input--zip');
    feelingsInput = document.querySelector('.form__input--feelings');
    formButton = document.querySelector('.button--form');
    journalEntry = document.querySelector('.journal-entry');


    // Reset the form inputs
    _resetFormInputs() {
        // Reset form fields
        this.zipInput.value = '';
        this.feelingsInput.value = '';
    }

    _updateEntry(entry) {
        // Get the date of the entry
        const date = new Date(entry.date);
        // Get the temp
        const temp = Math.trunc(Number(entry.temp));

        // Generate the html string for each entry
        const entryString = `
            <div class="entry">
                <span class="entry__label">Date:</span>
                <p class="entry__content entry__content--date">${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</p>
                <span class="entry__label">Zip code:</span>
                <p class="entry__content entry__content--zip">${entry.zip}</p>
                <p class="entry__content entry__content--temp">${temp}℉</p>
                <p class="entry__content entry__content--feelings">${entry.feelings}</p>
            </div>
            `;

        // Reset jounral entry
        this.journalEntry.innerHTML = '';
        // Update journal entries with document fragment
        this.journalEntry.insertAdjacentHTML('afterbegin', entryString);
    }

    // Update UI
    updateUI(entries) {
        this._resetFormInputs();
        this._updateEntry(entries)
    }


    // Show spinner on view
    presentSpinner() {
        // generate mark up
        const markup = `
        <div class="spinner">
          <svg class="spinner__logo">
            <use href="./assets/sprite/fa-regular.svg#circle-notch"></use>
          </svg>
        </div>
        `;

        // The Element property innerHTML gets or sets the HTML or XML markup contained within the element.
        // We set it to an empty string to clear it
        this.journalEntry.innerHTML = '';

        /*
        The insertAdjacentHTML() method of the Element interface parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.
        On the parent html element we use the insertAdjacentHTML() element to insert the html in the position afterbegin which adds it as the first child element.
         */
        this.journalEntry.insertAdjacentHTML('afterbegin', markup);
    }

    // Present an alert
    presentAlert(message) {
        // Clear the journal entries
        this.journalEntry.innerHTML = '';
        // Show the error
        const markup = `
            <div class="error">
                <h3 class="heading heading--3 heading--secondary"> Error </h3>
                <p class="error__message"> ${message} </p>
            </div>
            `;

        /*
        The insertAdjacentHTML() method of the Element interface parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.
        On the parent html element we use the insertAdjacentHTML() element to insert the html in the position afterbegin which adds it as the first child element.
        */
        this.journalEntry.insertAdjacentHTML('afterbegin', markup);
    }

    // Listen for form submit event
    formPublisher(handler) {
        this.form.addEventListener('submit', (event) => {
            // Prevent default action
            event.preventDefault();

            // Get the form data
            const formData = new FormData(this.form);
            // Add the current date to the form data
            formData.append('date', new Date());
            // Pass the form data to the handler
            handler(formData);
        });
    }
}

export default new JournalView();