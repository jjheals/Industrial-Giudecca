

// Array of the column names for non-relational tables (i.e. just entity tables for Factories)
export const nonRelationalColumns = {
    en: [
        'Factory_ID',
        'English_Name',
        'Italian_Name', 
        'Opening_Year', 
        'Closing_Year',
        'Min_Employment',
        'Max_Employment', 
        'Current_Purpose',
        'Latitude',
        'Longitude'
    ],
    it: [
        'ID di Fabbrica',
        'Nome Inglese',
        'Nome Italiano', 
        'Inizio Anno',
        'Anno Fermato',
        'Occupazione Minima',
        'Massima Occupazione',
        'Scopo Attuale',
        'Latitudine',
        'Longitudine'
    ]
}

export const productRelationColumns = {
    en: [
        'Factory ID',
        'English name',
        'Italian Name',
        'Min Employment',
        'Max Employment',
        'Year Started',
        'Year Stopped', 
        'Product',
        'Latitude',
        'Longitude'
    ],
    it: [
        'ID di Fabbrica',
        'Nome Inglese',
        'Nome Italiano',
        'Occupazione Minima',
        'Massima Occupazione',
        'Inizio Anno',
        'Anno Fermato', 
        'Prodotto',
        'Latitudine',
        'Longitudine'
    ]
}