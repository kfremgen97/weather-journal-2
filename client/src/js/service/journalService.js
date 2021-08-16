// Imports
import * as resourceConstants from './resourceConstants.js';

// Add jounral entry
export const addEntry = function (entry) {
    return fetch(`${resourceConstants.JOUNRAL_API}/entry`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
    })
        .then((response) => {
            if (!response.ok) throw new Error('Unable to add journal entry');
            return response.json();
        }).then((data) => {
            console.log(data);
            return data;
        }).catch((error) => {
            console.error(error);
            throw error;
        });
};

// Get entry
export const getEntry = function() {
    return fetch(`${resourceConstants.JOUNRAL_API}/entry`)
        .then((response) => {
            if (!response.ok) throw new Error('Unable to get journal entry');
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};
