// Imports
import { getWeather } from '../service/weatherService.js';
import * as journalService from '../service/journalService.js';
import journal from '../model/journal.js';
import journalView from '../view/journalView.js';

// Add event listener for form submit
const formHandler = async function (formData) {
    // Present spinner
    journalView.presentSpinner();

    try {
        // Get the weather based on the form data
        const weatherData = await getWeather(formData.get('zip'));
        // Add the temperature to the formData
        formData.append('temp', weatherData.main.temp);
        // Create an object from the form data
        const journalEntry = Object.fromEntries(formData.entries());
        // Add the entry to journal via api
        await journalService.addEntry(journalEntry);
        // Get the entry via journal api
        const entry = await journalService.getEntry();
        // Update the entry in the model
        journal.setEntry(entry);
        // Update the view
        journalView.updateUI(journal.getEntry());
    } catch (error) {
        console.log(error.message);
        // Present alert
        journalView.presentAlert(error.message);
    }
};

// Add event listeners
journalView.formPublisher(formHandler);
